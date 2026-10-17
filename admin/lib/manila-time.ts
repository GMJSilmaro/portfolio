const MANILA = 'Asia/Manila'

/** Format a UTC Date for display in Asia/Manila. */
export function formatManila(date: Date): string {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: MANILA,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
    timeZoneName: 'short',
  }).format(date)
}

export function formatManilaShort(date: Date): string {
  return new Intl.DateTimeFormat('en-PH', {
    timeZone: MANILA,
    year: 'numeric',
    month: 'short',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  }).format(date)
}
