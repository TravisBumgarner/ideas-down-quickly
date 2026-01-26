export type ChangelogEntry = {
  version: string
  date: string
  changes: string[]
}

export const CURRENT_VERSION = '1.5.0'

export const CHANGELOG: ChangelogEntry[] = [
  {
    version: '1.5.0',
    date: '2026-01-26',
    changes: [
      'Added iCloud backup. Users are opted out by default; enable in Settings.',
    ],
  },
  {
    version: '1.4.4',
    date: '2026-01-24',
    changes: [
      'Added ability to archive categories',
      'Added changelog modal for new version notifications',
      'Improved Reflect page performance with virtual scrolling',
      'Fixed new categories without ideas always appearing first',
      'Limited idea input to 10 lines with scroll',
      'Save & Another button allows quick addition of multiple ideas',
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
 * Compares two semantic version strings.
 * Returns: -1 if a < b, 0 if a === b, 1 if a > b
 */
function compareVersions(a: string, b: string): number {
  const partsA = a.split('.').map(Number)
  const partsB = b.split('.').map(Number)

  for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
    const partA = partsA[i] || 0
    const partB = partsB[i] || 0

    if (partA < partB) return -1
    if (partA > partB) return 1
  }

  return 0
}

/**
 * Determines if the changelog modal should be shown based on the last seen version.
 * Returns true if:
 * - No version has been seen before (null/undefined)
 * - The last seen version is older than the current version
 */
export function shouldShowChangelog(lastSeenVersion: string | null): boolean {
  if (lastSeenVersion === null) {
    return true
  }

  return compareVersions(lastSeenVersion, CURRENT_VERSION) < 0
}
