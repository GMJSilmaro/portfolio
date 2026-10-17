export type PublicLoginActivity = {
  id: string
  createdAt: string
  clientIp: string
  ipCity: string | null
  ipRegion: string | null
  ipCountry: string | null
  ipLocationSource: string
  ipLocationUnavailable: boolean
  browser: string | null
  os: string | null
  deviceLatitude: number | null
  deviceLongitude: number | null
  deviceAccuracyM: number | null
  deviceCapturedAt: string | null
  deviceLocationSource: string
}
