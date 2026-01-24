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

export const LAST_SEEN_CHANGELOG_VERSION_KEY = 'lastSeenChangelogVersion'

/**
 * Determines if the changelog modal should be shown based on the last seen version.
 * Returns true if:
 * - No version has been seen before (null/undefined)
 * - The last seen version is older than the current version
 */
export function shouldShowChangelog(lastSeenVersion: string | null): boolean {
  // Stub implementation - will be implemented in ralph-code phase
  return false
}
