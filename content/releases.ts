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
    version: '1.1.4',
    date: '10.16.26',
    title: 'Layout, hero, and gallery fixes',
    notes: [
      {
        type: 'fix',
        text: 'Hero portrait framing shows your face properly — no more over-zoomed crop — while the intro and buttons stay readable.',
      },
      {
        type: 'fix',
        text: 'Chapter gutters are consistent, so the empty band between the left rail and content is gone across Profile, Career, Work, and Stack.',
      },
      {
        type: 'fix',
        text: 'Exhibit gallery opens centered over the full screen through a portal, with a locked background, Escape, and focus restore.',
      },
      {
        type: 'improvement',
        text: 'Gallery thumbnails keep screenshot proportions in a 1 / 2 / 3 column grid, and the sidebar only scrolls when it needs to.',
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
