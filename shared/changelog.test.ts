import {
  shouldShowChangelog,
  CURRENT_VERSION,
  LAST_SEEN_CHANGELOG_VERSION_KEY,
} from './changelog'

describe('shouldShowChangelog', () => {
  describe('when no version has been seen before', () => {
    it('returns true for null', () => {
      expect(shouldShowChangelog(null)).toBe(true)
    })
  })

  describe('when last seen version is older than current', () => {
    it('returns true for older major version', () => {
      expect(shouldShowChangelog('0.1.0')).toBe(true)
    })

    it('returns true for older minor version', () => {
      expect(shouldShowChangelog('1.3.0')).toBe(true)
    })

    it('returns true for older patch version', () => {
      // Assuming current version is 1.4.0, 1.3.9 is older
      expect(shouldShowChangelog('1.3.9')).toBe(true)
    })
  })

  describe('when last seen version equals current version', () => {
    it('returns false', () => {
      expect(shouldShowChangelog(CURRENT_VERSION)).toBe(false)
    })
  })

  describe('when last seen version is newer than current', () => {
    it('returns false for newer version', () => {
      // Edge case: shouldn't normally happen, but handles downgrade scenario
      expect(shouldShowChangelog('99.0.0')).toBe(false)
    })
  })
})

describe('LAST_SEEN_CHANGELOG_VERSION_KEY', () => {
  it('exports the expected storage key', () => {
    expect(LAST_SEEN_CHANGELOG_VERSION_KEY).toBe('lastSeenChangelogVersion')
  })
})
