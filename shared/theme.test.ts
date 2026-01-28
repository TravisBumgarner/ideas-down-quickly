import {
  COLORS,
  SPACING,
  BORDER_RADIUS,
  BORDER_WIDTH,
  DARK_THEME,
  LIGHT_THEME,
  type SemanticColors,
} from './theme'

const SEMANTIC_KEYS: (keyof SemanticColors)[] = [
  'background',
  'surface',
  'surfaceVariant',
  'textPrimary',
  'textSecondary',
  'textDisabled',
  'border',
  'tabBar',
  'tabBarLabel',
  'tabBarActive',
  'switchActive',
  'primary',
  'secondary',
  'success',
  'warning',
  'error',
]

describe('DARK_THEME', () => {
  it('has all semantic color keys', () => {
    for (const key of SEMANTIC_KEYS) {
      expect(DARK_THEME).toHaveProperty(key)
      expect(typeof DARK_THEME[key]).toBe('string')
      expect(DARK_THEME[key].length).toBeGreaterThan(0)
    }
  })

  it('maps background to the existing dark page background', () => {
    expect(DARK_THEME.background).toBe(COLORS.NEUTRAL[800])
  })

  it('maps textPrimary to the existing light text color', () => {
    expect(DARK_THEME.textPrimary).toBe(COLORS.NEUTRAL[100])
  })

  it('maps surface to the existing dark card background', () => {
    expect(DARK_THEME.surface).toBe(COLORS.NEUTRAL[700])
  })
})

describe('LIGHT_THEME', () => {
  it('has all semantic color keys', () => {
    for (const key of SEMANTIC_KEYS) {
      expect(LIGHT_THEME).toHaveProperty(key)
      expect(typeof LIGHT_THEME[key]).toBe('string')
      expect(LIGHT_THEME[key].length).toBeGreaterThan(0)
    }
  })

  it('has a light background (different from dark)', () => {
    expect(LIGHT_THEME.background).not.toBe(DARK_THEME.background)
  })

  it('has dark text for primary text (different from dark theme)', () => {
    expect(LIGHT_THEME.textPrimary).not.toBe(DARK_THEME.textPrimary)
  })
})

describe('DARK_THEME and LIGHT_THEME structural consistency', () => {
  it('both themes have exactly the same keys', () => {
    expect(Object.keys(DARK_THEME).sort()).toEqual(Object.keys(LIGHT_THEME).sort())
  })
})

describe('existing exports are unchanged', () => {
  it('COLORS still exports NEUTRAL palette', () => {
    expect(COLORS.NEUTRAL[800]).toBe('#3A4D53')
    expect(COLORS.NEUTRAL[100]).toBe('#E3E7E8')
  })

  it('COLORS still exports LABELS palette', () => {
    expect(COLORS.LABELS[1]).toBe('#FF1A1A')
  })

  it('SPACING is unchanged', () => {
    expect(SPACING.MEDIUM).toBe(16)
    expect(SPACING.SMALL).toBe(12)
  })

  it('BORDER_RADIUS is unchanged', () => {
    expect(BORDER_RADIUS.MEDIUM).toBe(8)
  })

  it('BORDER_WIDTH is unchanged', () => {
    expect(BORDER_WIDTH.SMALL).toBe(2)
  })
})
