export const COLORS = {
  NEUTRAL: {
    '100': '#E3E7E8',
    '200': '#C7CFD1',
    '300': '#ABB7BA',
    '400': '#8F9EA3',
    '500': '#73868C',
    '600': '#5C6B70',
    '700': '#475E66',
    '800': '#3A4D53',
    '900': '#2C3B40',
    '1000': '#1F2A2D',
  },
  PRIMARY: {
    '100': '#CCF3FF',
    '200': '#66DAFF',
    '300': '#00C1FF',
    '400': '#007499',
    '500': '#002733',
  },
  SECONDARY: {
    '100': '#E9CFFC',
    '200': '#BC6EF7',
    '300': '#8F0DF2',
    '400': '#720AC2',
    '500': '#560891',
  },
  SUCCESS: {
    '100': '#CCFFDD',
    '200': '#66FF99',
    '300': '#00FF55',
    '400': '#00CC44',
    '500': '#009933',
  },
  WARNING: {
    '100': '#FFF1CC',
    '200': '#FFD466',
    '300': '#FFB800',
    '400': '#996E00',
    '500': '#332500',
  },
  ERROR: {
    '100': '#FFCCEB',
    '200': '#FF66C2',
    '300': '#FF0099',
    '400': '#CC007A',
    '500': '#99005C',
  },
  MISC: {
    TRANSPARENT: 'TRANSPARENT',
    BLACK: '#000',
    WHITE: '#FFF',
  },
  LABELS: {
    '1': '#FF1A1A',
    '2': '#FF5F1A',
    '3': '#FFB905',
    '4': '#EEFF26',
    '5': '#73FF31',
    '6': '#26FFD8',
    '7': '#33DAFF',
    '8': '#2DA7FF',
    '9': '#2562FF',
    '10': '#6B25FF',
    '11': '#C425FF',
    '12': '#FF25CF',
    '13': '#FF2567',
    '14': '#FFFFFF',
    '15': '#e0e0e0',
    '16': '#b3b3b3',
    '17': '#6d6d6d',
    '18': '#424242',
    '19': '#272727',
    '20': '#ffb3b3',
    '21': '#ffcab3',
    '22': '#ffecb3',
    '23': '#FFFFB3',
    '24': '#d1ffb3',
    '25': '#B3FFB3',
    '26': '#b3ffe8',
    '27': '#b3f0ff',
    '28': '#d6b3ff',
    '29': '#FFB3FF',
    '30': '#990000',
    '31': '#994D00',
    '32': '#999900',
    '33': '#4D9900',
    '34': '#009933',
    '35': '#009999',
    '36': '#004D99',
    '37': '#000099',
    '38': '#4D0099',
    '39': '#990099',
    '40': '#909090',
  },
} as const

export const LABEL_COLOR_ROWS: [string[], string[]] = [
  [
    // Vivid rainbow
    COLORS.LABELS['1'],
    COLORS.LABELS['2'],
    COLORS.LABELS['3'],
    COLORS.LABELS['4'],
    COLORS.LABELS['5'],
    COLORS.LABELS['6'],
    COLORS.LABELS['7'],
    COLORS.LABELS['8'],
    COLORS.LABELS['9'],
    COLORS.LABELS['10'],
    COLORS.LABELS['11'],
    COLORS.LABELS['12'],
    COLORS.LABELS['13'],
    // Grays
    COLORS.LABELS['14'],
    COLORS.LABELS['15'],
    COLORS.LABELS['16'],
    COLORS.LABELS['40'],
    COLORS.LABELS['17'],
    COLORS.LABELS['18'],
    COLORS.LABELS['19'],
  ],
  [
    // Pastels
    COLORS.LABELS['20'],
    COLORS.LABELS['21'],
    COLORS.LABELS['22'],
    COLORS.LABELS['23'],
    COLORS.LABELS['24'],
    COLORS.LABELS['25'],
    COLORS.LABELS['26'],
    COLORS.LABELS['27'],
    COLORS.LABELS['28'],
    COLORS.LABELS['29'],
    // Darks
    COLORS.LABELS['30'],
    COLORS.LABELS['31'],
    COLORS.LABELS['32'],
    COLORS.LABELS['33'],
    COLORS.LABELS['34'],
    COLORS.LABELS['35'],
    COLORS.LABELS['36'],
    COLORS.LABELS['37'],
    COLORS.LABELS['38'],
    COLORS.LABELS['39'],
  ],
]

export const BORDER_RADIUS = {
  NONE: 0,
  SMALL: 4,
  MEDIUM: 8,
  LARGE: 12,
} as const

export const SPACING = {
  XXSMALL: 4,
  XSMALL: 8,
  SMALL: 12,
  MEDIUM: 16,
  LARGE: 24,
  XLARGE: 32,
  XXLARGE: 48,
} as const

export const BORDER_WIDTH = {
  NONE: 0,
  XSMALL: 1,
  SMALL: 2,
  MEDIUM: 4,
  LARGE: 8,
} as const

export type SemanticColors = {
  background: string
  surface: string
  surfaceVariant: string
  textPrimary: string
  textSecondary: string
  textDisabled: string
  border: string
  tabBar: string
  tabBarLabel: string
  tabBarActive: string
  switchActive: string
  primary: string
  secondary: string
  success: string
  warning: string
  error: string
}

export const DARK_THEME: SemanticColors = {
  background: COLORS.NEUTRAL[800],
  surface: COLORS.NEUTRAL[700],
  surfaceVariant: COLORS.NEUTRAL[900],
  textPrimary: COLORS.NEUTRAL[100],
  textSecondary: COLORS.NEUTRAL[300],
  textDisabled: COLORS.NEUTRAL[400],
  border: COLORS.NEUTRAL[600],
  tabBar: COLORS.NEUTRAL[800],
  tabBarLabel: COLORS.NEUTRAL[300],
  tabBarActive: COLORS.PRIMARY[300],
  switchActive: COLORS.PRIMARY[300],
  primary: COLORS.PRIMARY[300],
  secondary: COLORS.SECONDARY[300],
  success: COLORS.SUCCESS[300],
  warning: COLORS.WARNING[300],
  error: COLORS.ERROR[300],
}

export const LIGHT_THEME: SemanticColors = {
  background: COLORS.NEUTRAL[100],
  surface: COLORS.NEUTRAL[200],
  surfaceVariant: COLORS.MISC.WHITE,
  textPrimary: COLORS.NEUTRAL[1000],
  textSecondary: COLORS.NEUTRAL[600],
  textDisabled: COLORS.NEUTRAL[500],
  border: COLORS.NEUTRAL[300],
  tabBar: COLORS.NEUTRAL[100],
  tabBarLabel: COLORS.NEUTRAL[600],
  tabBarActive: COLORS.PRIMARY[400],
  switchActive: COLORS.PRIMARY[400],
  primary: COLORS.PRIMARY[400],
  secondary: COLORS.SECONDARY[400],
  success: COLORS.SUCCESS[400],
  warning: COLORS.WARNING[400],
  error: COLORS.ERROR[400],
}
