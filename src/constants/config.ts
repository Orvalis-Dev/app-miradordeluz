export const SITE_CONFIG = {
  name: 'Mirador de Luz',
  description: 'Cabañas en Villa Carlos Paz con vista al lago San Roque',
  url: 'https://miradordeluz.com',
  ogImage: '/images/og-image.jpg',
  links: {
    facebook: 'https://facebook.com/miradordeluz',
    instagram: 'https://instagram.com/miradordeluz',
    whatsapp: 'https://wa.me/5493512345678',
  },
  contact: {
    email: 'contacto@miradordeluz.com',
    phone: '+54 9 351 234-5678',
    address: 'Villa Carlos Paz, Córdoba, Argentina',
  },
  googleMaps: {
    // Identificadores de Google Maps para "Mirador de Luz"
    // URL original: https://www.google.com/maps/place/Mirador+de+Luz/@-31.3730543,-64.5250168,17z
    // CID (Customer ID): 0x942d65f0c8772fbd:0x4d7f1d8348462d0a
    // Feature ID: /g/11y59brg9t
    
    // Place ID - Se obtiene automáticamente usando Find Place API si no está configurado
    placeId: '', // Se llenará automáticamente con findPlaceId()
    
    // Coordenadas del establecimiento (extraídas de la URL)
    coordinates: {
      lat: -31.3730589,
      lng: -64.5224419,
    },
    
    // Nombre del lugar para búsqueda
    placeName: 'Mirador de Luz',
    placeAddress: 'Villa Carlos Paz, Córdoba, Argentina',
    
    // URL para dejar una reseña en Google Maps
    // Usar Feature ID que funciona directamente
    reviewUrl: 'https://www.google.com/maps/place/Mirador+de+Luz/@-31.3730543,-64.5250168,17z/data=!4m16!1m7!3m6!1s0x942d65f0c8772fbd:0x4d7f1d8348462d0a!2sMirador+de+Luz!8m2!3d-31.3730589!4d-64.5224419!16s%2Fg%2F11y59brg9t!3m7!1s0x942d65f0c8772fbd:0x4d7f1d8348462d0a!8m2!3d-31.3730589!4d-64.5224419!9m1!1b1!16s%2Fg%2F11y59brg9t?entry=ttu&g_ep=EgoyMDI1MTIwOS4wIKXMDSoKLDEwMDc5MjA2OUgBUAM%3D',
    
    // URL directa al perfil de Google Maps con las reseñas
    mapsUrl: 'https://www.google.com/maps/place/Mirador+de+Luz/@-31.3730543,-64.5250168,17z/data=!4m16!1m7!3m6!1s0x942d65f0c8772fbd:0x4d7f1d8348462d0a!2sMirador+de+Luz!8m2!3d-31.3730589!4d-64.5224419!16s%2Fg%2F11y59brg9t!3m7!1s0x942d65f0c8772fbd:0x4d7f1d8348462d0a!8m2!3d-31.3730589!4d-64.5224419!9m1!1b1!16s%2Fg%2F11y59brg9t',
  },
};

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const;

