export type ChangelogEntry = {
  version: string
  date: string
  changes: string[]
}

export const CURRENT_VERSION = '1.4.0'

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.4.0',
    date: '2026-01-24',
    changes: [
      'Added ability to archive labels',
      'Added changelog modal for new version notifications',
    ],
  },
  {
    version: '1.3.0',
    date: '2024-12-01',
    changes: ['Initial release'],
  },
]
