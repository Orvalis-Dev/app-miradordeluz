/**
 * Rate Limiter para proteger endpoints contra abuso
 * Usado principalmente en formularios de contacto
 */

interface RateLimitRecord {
  ip: string;
  count: number;
  resetTime: number;
}

// Almacenar registros de rate limit en memoria
const requestStore = new Map<string, RateLimitRecord>();

export interface RateLimitResult {
  allowed: boolean;
  remaining: number;
  resetTime: number;
  retryAfter?: number;
}

/**
 * Verificar si una IP ha excedido el límite de solicitudes
 * @param ip - Dirección IP del cliente
 * @param maxRequests - Máximo de solicitudes permitidas (default: 5)
 * @param windowMs - Ventana de tiempo en milisegundos (default: 15 minutos)
 * @returns Resultado del chequeo de rate limit
 */
export function checkRateLimit(
  ip: string,
  maxRequests: number = 5,
  windowMs: number = 15 * 60 * 1000 // 15 minutos
): RateLimitResult {
  const now = Date.now();
  const record = requestStore.get(ip);

  // Si no existe registro o ha expirado, crear uno nuevo
  if (!record || record.resetTime < now) {
    const newRecord: RateLimitRecord = {
      ip,
      count: 1,
      resetTime: now + windowMs,
    };
    requestStore.set(ip, newRecord);

    return {
      allowed: true,
      remaining: maxRequests - 1,
      resetTime: newRecord.resetTime,
    };
  }

  // Si aún no ha alcanzado el límite, incrementar contador
  if (record.count < maxRequests) {
    record.count++;
    return {
      allowed: true,
      remaining: maxRequests - record.count,
      resetTime: record.resetTime,
    };
  }

  // Límite alcanzado
  const retryAfter = Math.ceil((record.resetTime - now) / 1000);
  return {
    allowed: false,
    remaining: 0,
    resetTime: record.resetTime,
    retryAfter,
  };
}

/**
 * Limpiar registros expirados (ejecutar periódicamente)
 * Se ejecuta automáticamente cada 10 minutos
 */
function cleanupExpiredRecords(): void {
  const now = Date.now();
  let cleaned = 0;

  for (const [key, value] of requestStore.entries()) {
    if (value.resetTime < now) {
      requestStore.delete(key);
      cleaned++;
    }
  }

  if (cleaned > 0) {
    console.log(`[Rate Limiter] Limpiados ${cleaned} registros expirados`);
  }
}

// Ejecutar limpieza cada 10 minutos
setInterval(cleanupExpiredRecords, 1000 * 60 * 10);

/**
 * Resetear todos los registros (uso administrativo)
 */
export function resetRateLimiter(): void {
  requestStore.clear();
  console.log("[Rate Limiter] Todos los registros han sido reseteados");
}

/**
 * Obtener información de rate limit de una IP (para debugging)
 */
export function getRateLimitInfo(ip: string): RateLimitRecord | undefined {
  return requestStore.get(ip);
}
