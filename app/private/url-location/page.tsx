import type { Metadata } from 'next'
import { UrlLocationTool } from './url-location-tool'

export const metadata: Metadata = {
  title: 'URL location — GMJ. private',
  description: 'Unlisted cybersecurity URL location helper',
  robots: { index: false, follow: false },
}

export default function UrlLocationPage() {
  return <UrlLocationTool />
}
