/**
 * Educational notes on how platforms infer VPN / proxy use.
 * For awareness only — this site does not run these techniques against visitors.
 */

export type VpnDetectionNote = {
  id: string
  title: string
  body: string
}

export const VPN_DETECTION_NOTES: VpnDetectionNote[] = [
  {
    id: 'accept-language',
    title: 'Accept-Language vs IP',
    body: 'Browsers send language preferences (e.g. en-CA). If the language region is Canada but the IP geolocates to Albania, many sites treat that mismatch as a VPN hint.',
  },
  {
    id: 'vpn-ip-db',
    title: 'VPN / proxy IP databases',
    body: 'Commercial lists flag known VPN, proxy, Tor, and cloud ranges. Even an AWS EC2, GCP, or Azure exit can be denied as “VPN” or datacenter traffic.',
  },
  {
    id: 'email-unsubscribe',
    title: 'Email “unsubscribe” bait',
    body: 'Some actors send random mail and hope you click unsubscribe or open a tracked link while off-VPN, tying that click IP to an account.',
  },
  {
    id: 'cookie-id',
    title: 'Cookie / device ID correlation',
    body: 'A unique cookie (or similar ID) set while on VPN can be read later off-VPN. Matching IDs across sessions links the two IPs — if cookies are kept.',
  },
  {
    id: 'third-party',
    title: 'Third-party / analytics beacons',
    body: 'A single page can call many unrelated analytics or ad domains. Those parties see their own cookies and your IP across sites, independent of the first-party host.',
  },
]

/** Short disclaimer for UI and copy-summary. */
export const VPN_DETECTION_DISCLAIMER =
  'This page does not set tracking cookies, send probe emails, or phone home analytics. Notes above are for awareness when reviewing a pasted host.'
