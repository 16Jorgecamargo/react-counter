export function parseNumber(value) {
  if (typeof value !== 'string' || value.trim() === '') return null
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

export function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max)
}

export function roundPrecision(value) {
  return Number(value.toFixed(10))
}
