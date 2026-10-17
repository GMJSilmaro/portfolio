export type ReleaseType = 'feature' | 'improvement' | 'fix'

export interface ReleaseNote {
  type: ReleaseType
  text: string
}

export interface Release {
  version: string
  date: string
  title: string
  notes: ReleaseNote[]
}

/**
 * Portfolio release log for end users.
 * Same calendar day consolidates into one entry.
 * Core / module launches get their own version bump.
 */
export const releases: Release[] = [
  {
    version: '1.3.0',
    date: '10.17.26',
    title: 'Private URL location tool',
    notes: [
      {
        type: 'feature',
        text: 'An unlisted /private/url-location page lets you paste a link and review URL-embedded coordinates plus approximate host IP location for cybersecurity review — without changing the public CV Studio chapters.',
      },
      {
        type: 'improvement',
        text: 'The helper ships with the same GitHub Pages deploy, stays out of public navigation, and is marked noindex. Analysis runs in the browser; pastes are not logged by this site.',
      },
      {
        type: 'fix',
        text: 'URL location text and controls are readable again on phones — the page no longer applied the faint grain overlay opacity to the whole screen.',
      },
      {
        type: 'improvement',
        text: 'Host analysis now shows network reputation signals (VPN/proxy, CDN/anycast, hosting) from ASN/org heuristics plus ipwho.is flags when available — still cannot reveal a true location behind a VPN.',
      },
      {
        type: 'feature',
        text: 'Security assessment adds a risk score, explicit VPN geo limitation, URL-vs-IP mismatch checks, and compensating investigation steps when true location cannot be recovered.',
      },
    ],
  },
  {
    version: '1.2.0',
    date: '10.16.26',
    title: 'Editorial living dossier',
    notes: [
      {
        type: 'feature',
        text: 'The living dossier now reads as one editorial CV — cover, profile, career, selected work, project detail, and tools — with the same chapters and your real projects.',
      },
      {
        type: 'improvement',
        text: 'Your portrait, chapter navigation, and each section sit in a calmer layout that stays readable on phone, tablet, and desktop.',
      },
      {
        type: 'improvement',
        text: 'Selected work opens as balanced previews, and each project keeps its screenshots, description, and gallery.',
      },
      {
        type: 'improvement',
        text: 'Tools on the bench use compact tiles you can filter and favourite without the page stretching sideways.',
      },
      {
        type: 'fix',
        text: 'Moving between chapters no longer interrupts normal scrolling, and project details stay easy to close on a small screen.',
      },
    ],
  },
  {
    version: '1.1.1',
    date: '09.16.26',
    title: 'CV Studio',
    notes: [
      {
        type: 'feature',
        text: 'Your portfolio is now a CV Studio — enter from a cinematic cover, then move through Profile, Career, Work, and Stack like chapters of a living résumé.',
      },
      {
        type: 'feature',
        text: 'Desktop identity rail keeps your portrait, contacts, and resume download in view while you browse each chapter.',
      },
      {
        type: 'feature',
        text: 'Work opens as a case viewer with exhibits; Stack is an interactive icon wall with favourites and category filters.',
      },
      {
        type: 'improvement',
        text: 'Headlines use a cleaner modern typeface instead of the heavy bold serif.',
      },
      {
        type: 'improvement',
        text: 'Download now serves a new public personal resume — the old company CV file was removed.',
      },
      {
        type: 'fix',
        text: 'Replaced the earlier look-alike section layout so the experience finally matches a full portfolio revamp.',
      },
    ],
  },
]
