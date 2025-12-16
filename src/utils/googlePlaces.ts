import fs from 'fs';
import path from 'path';

export type GoogleReview = {
  id: string;
  name: string;
  subtitle?: string;
  text: string;
  rating: number;
  avatarUrl?: string;
  time?: number | null;
};

export type PlaceDetails = {
  placeId: string;
  name: string;
  rating: number;
  totalReviews: number;
  reviews: GoogleReview[];
};

const CACHE_DIR = path.resolve('./.cache');
const CACHE_PATH = path.join(CACHE_DIR, 'google-reviews.json');
const PLACE_ID_CACHE_PATH = path.join(CACHE_DIR, 'google-place-id.json');
const TTL_MS = 1000 * 60 * 60 * 24; // 24 horas para el caché

function safeParseJson<T>(input: string | undefined): T | null {
  if (!input) return null;
  try {
    return JSON.parse(input) as T;
  } catch {
    return null;
  }
}

/**
 * Busca el Place ID usando el nombre del lugar y las coordenadas
 * Usa la API de Find Place from Text
 */
export async function findPlaceId(
  apiKey: string,
  placeName: string,
  lat?: number,
  lng?: number
): Promise<string | null> {
  if (!apiKey || !placeName) {
    console.warn('[Google Places] API key y nombre del lugar son requeridos');
    return null;
  }

  // Verificar caché
  try {
    if (fs.existsSync(PLACE_ID_CACHE_PATH)) {
      const raw = fs.readFileSync(PLACE_ID_CACHE_PATH, 'utf-8');
      const parsed = safeParseJson<{ fetchedAt: number; placeId: string; placeName: string }>(raw);
      if (parsed && parsed.placeName === placeName && Date.now() - parsed.fetchedAt < TTL_MS) {
        console.log(`[Google Places] Place ID encontrado en caché: ${parsed.placeId}`);
        return parsed.placeId;
      }
    }
  } catch {
    // Ignorar errores de caché
  }

  // Construir query con ubicación si está disponible
  const query = encodeURIComponent(placeName);
  let url = `https://maps.googleapis.com/maps/api/place/findplacefromtext/json?input=${query}&inputtype=textquery&fields=place_id,name,formatted_address&key=${apiKey}`;

  // Agregar location bias si tenemos coordenadas
  if (lat && lng) {
    url += `&locationbias=circle:5000@${lat},${lng}`;
  }

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.error(`[Google Places] Error en Find Place API: ${res.status}`);
      return null;
    }

    const json = await res.json();

    if (json.status !== 'OK' || !json.candidates || json.candidates.length === 0) {
      console.warn(`[Google Places] No se encontró el lugar: ${placeName}. Status: ${json.status}`);
      return null;
    }

    const placeId = json.candidates[0].place_id;
    console.log(`[Google Places] Place ID encontrado: ${placeId} para "${json.candidates[0].name}"`);

    // Guardar en caché
    try {
      fs.mkdirSync(CACHE_DIR, { recursive: true });
      fs.writeFileSync(PLACE_ID_CACHE_PATH, JSON.stringify({
        fetchedAt: Date.now(),
        placeId,
        placeName
      }, null, 2), 'utf-8');
    } catch {
      // Ignorar errores de caché
    }

    return placeId;
  } catch (error) {
    console.error('[Google Places] Error buscando Place ID:', error);
    return null;
  }
}

/**
 * Obtiene las reseñas de Google Places usando el Place ID
 * NOTA: La API de Google Places solo devuelve un máximo de 5 reseñas
 */
export async function fetchGoogleReviews(apiKey: string, placeId: string, maxReviews = 5): Promise<GoogleReview[]> {
  if (!apiKey || !placeId) {
    throw new Error('API key and Place ID are required');
  }

  // Leer cache si existe y no expiró
  try {
    if (fs.existsSync(CACHE_PATH)) {
      const raw = fs.readFileSync(CACHE_PATH, 'utf-8');
      const parsed = safeParseJson<{ fetchedAt: number; placeId: string; reviews: GoogleReview[] }>(raw);
      if (parsed && parsed.placeId === placeId && Date.now() - parsed.fetchedAt < TTL_MS) {
        console.log(`[Google Places] ${parsed.reviews.length} reseñas cargadas desde caché`);
        return parsed.reviews.slice(0, maxReviews);
      }
    }
  } catch (err) {
    console.warn('[Google Places] Error leyendo caché de reseñas:', err);
  }

  const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=name,rating,user_ratings_total,reviews&reviews_sort=newest&key=${apiKey}`;

  console.log(`[Google Places] Obteniendo reseñas para Place ID: ${placeId}`);

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Google Places API error ${res.status}`);
  }

  const json = await res.json();

  if (json.status !== 'OK') {
    console.error(`[Google Places] Error en API: ${json.status} - ${json.error_message || ''}`);
    throw new Error(`Google Places API status: ${json.status}`);
  }

  const rawReviews: unknown[] = Array.isArray(json?.result?.reviews) ? json.result.reviews : [];

  console.log(`[Google Places] Se obtuvieron ${rawReviews.length} reseñas de la API`);
  console.log(`[Google Places] Rating general: ${json.result?.rating} (${json.result?.user_ratings_total} reseñas totales)`);

  const reviews: GoogleReview[] = rawReviews.slice(0, maxReviews).map((r: unknown, i) => {
    const review = r as Record<string, unknown>;

    // profile_photo_url may be present
    let avatar: string | undefined = undefined;
    if (typeof review.profile_photo_url === 'string') {
      avatar = review.profile_photo_url;
    }

    return {
      id: String(i + 1),
      name: typeof review.author_name === 'string' ? review.author_name : 'Anónimo',
      subtitle: typeof review.relative_time_description === 'string' ? review.relative_time_description : '',
      text: typeof review.text === 'string' ? review.text : '',
      rating: typeof review.rating === 'number' ? review.rating : 5,
      avatarUrl: avatar,
      time: typeof review.time === 'number' ? review.time : null,
    };
  });

  // Escribir cache
  try {
    fs.mkdirSync(CACHE_DIR, { recursive: true });
    fs.writeFileSync(CACHE_PATH, JSON.stringify({
      fetchedAt: Date.now(),
      placeId,
      reviews
    }, null, 2), 'utf-8');
    console.log(`[Google Places] Reseñas guardadas en caché`);
  } catch (err) {
    console.warn('[Google Places] Error guardando caché de reseñas:', err);
  }

  return reviews;
}

/**
 * Función combinada que busca el Place ID y obtiene las reseñas
 * Útil cuando no tienes el Place ID configurado
 */
export async function fetchReviewsByPlaceName(
  apiKey: string,
  placeName: string,
  lat?: number,
  lng?: number,
  maxReviews = 5
): Promise<PlaceDetails | null> {
  // Primero buscar el Place ID
  const placeId = await findPlaceId(apiKey, placeName, lat, lng);

  if (!placeId) {
    console.error(`[Google Places] No se pudo encontrar el Place ID para: ${placeName}`);
    return null;
  }

  try {
    const reviews = await fetchGoogleReviews(apiKey, placeId, maxReviews);

    return {
      placeId,
      name: placeName,
      rating: reviews.length > 0
        ? reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length
        : 5,
      totalReviews: reviews.length,
      reviews,
    };
  } catch (error) {
    console.error('[Google Places] Error obteniendo reseñas:', error);
    return null;
  }
}




