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
    version: '1.1.3',
    date: '10.16.26',
    title: 'Scroll and layout polish',
    notes: [
      {
        type: 'fix',
        text: 'Mouse wheel scrolling feels normal again — the left rail no longer traps the scroll, and the duplicate scrollbar is gone.',
      },
      {
        type: 'fix',
        text: 'Closed the empty gap between the left identity rail and the chapter text so content sits flush beside the rail.',
      },
      {
        type: 'improvement',
        text: 'Added a real footer on desktop and mobile, shortened the cover, and kept chapter titles from getting clipped at the top.',
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
