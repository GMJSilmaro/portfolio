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
    version: '1.0.0',
    date: '09.16.26',
    title: 'Living Dossier',
    notes: [
      {
        type: 'feature',
        text: 'A brand-new Living Dossier experience — your portfolio now reads like an interactive professional CV, not a generic website.',
      },
      {
        type: 'feature',
        text: 'Sticky chapter rail and clear sections for Cover, Subject, Cases, Stack, and Clearance so visitors can navigate your story instantly.',
      },
      {
        type: 'feature',
        text: 'Project case files with exhibit galleries, plus the full tech stack with icons and favourites filter.',
      },
      {
        type: 'improvement',
        text: 'Fresh paper-and-ink look with expressive typography, smoother motion, and a calmer reading flow on phone and desktop.',
      },
      {
        type: 'improvement',
        text: 'Contact clearance opens your email client with the message ready to send.',
      },
    ],
  },
]
