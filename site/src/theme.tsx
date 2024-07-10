import {
  LinkProps,
  createTheme,
  css,
  type PaletteOptions
} from '@mui/material'
import { forwardRef } from 'react'
import {
  Link as RouterLink,
  type LinkProps as RouterLinkProps
} from 'react-router-dom'

const paletteBase: Partial<PaletteOptions> = {
  primary: {
    main: '#00C1FF'
  },
  secondary: {
    main: '#8F0DF2'
  },
  text: {
    primary: '#C7CFD1',
    secondary: '#C7CFD1',
  },
  action: {
    disabled: '#8F9EA3'
  },
  background: {
    paper: '#3A4D53',
    default: '#2C3B40'
  },
  warning: {
    main: '#FFB800'
  },
  error: {
    main: '#FF0099'
  },
}

const LinkBehavior = forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, 'to'> & { href: RouterLinkProps['to'] }
>((props, ref) => {
  const { href, ...other } = props
  return <RouterLink ref={ref} to={href} {...other} />
})
LinkBehavior.displayName = 'LinkBehavior'

export const theme = createTheme({
  palette: paletteBase,
  typography: {
    h2: {
      fontSize: '1.8rem',
      fontWeight: 700
    },
    h3: {
      fontSize: '1.5rem',
      fontWeight: 700
    },
    h4: {
      fontSize: '1.25rem',
    },
  },
  components: {
    MuiLink: {
      defaultProps: {
        component: LinkBehavior
      } as LinkProps
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior
      }
    }
  }
})

export const pageWrapperCSS = css`
  box-sizing: border-box;
  overflow-y: auto;
  max-width: 800px !important;
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 2rem;
  margin-bottom: 2rem;
`
