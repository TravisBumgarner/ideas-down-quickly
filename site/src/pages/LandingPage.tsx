import { Box, Container, Typography } from '@mui/material'
import React from 'react'
import { pageWrapperCSS } from 'theme'
import { Title } from '../components'
import successes from '../static/successes.png'
import theme_1 from '../static/theme_1.png'
import theme_2 from '../static/theme_2.png'
import theme_3 from '../static/theme_3.png'
import theme_4 from '../static/theme_4.png'

import { styled } from '@mui/material/styles'

const TitleSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '40vh'
}))

const Section = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(4),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center'
  },
  '&:nth-of-type(odd)': {
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const ThemeSection = styled(Section)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center'
  }
}))

const Text = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: '200px',
  width: '100%',
  paddingTop: '80px'

}))

const Image = styled('img')(({ theme }) => ({
  flex: 1,
  maxWidth: '80%',
  height: 'auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  }
}))

const LandingPage = () => {
  const [currentTheme, setCurrentTheme] = React.useState(0)
  const themes = [theme_1, theme_2, theme_3, theme_4]

  const handleNext = () => {
    setCurrentTheme((prev) => (prev + 1) % themes.length)
  }

  const handlePrev = () => {
    setCurrentTheme((prev) => (prev - 1 + themes.length) % themes.length)
  }

  return (
    <Container css={pageWrapperCSS}>
      <TitleSection>
        <Title />
        <Typography variant="h2" css={{ textAlign: 'center' }}>Capture Ideas Quickly & Easily</Typography>
      </TitleSection>

      <Section>
        <Text>
          <Typography variant="h5">Simple and Efficient</Typography>
          <ul css={listStyleCSS}>
            <li>Minimal Workflow: Create a new category or choose from an existing one, and start recording right away.</li>
            <li>Easy Organization: Quickly categorize and organize your ideas with intuitive ease.</li>
            <li>Browse Effortlessly: Easily browse through your thoughts.</li>
          </ul>
        </Text>
        <div><Image src={successes} alt="Successes" /></div>
      </Section>

      <Section>
        <Text>
          <Typography variant="h5">    Privacy & Security First</Typography>
          <ul css={listStyleCSS}>
            <li>Offline Functionality: No internet connection required to use. </li>
            <li>Secure Storage: Your ideas are safe and private, stored securely on your device. They are not sent anywhere for any reason.</li>
            <li>Data Management: Perform backups and restores of your data from within the app.</li>
            <li>Open Source: The entire project is fully open source, allowing you to see exactly what's going on.</li>
          </ul>
        </Text>
        <div><Image src={successes} alt="Successes" /></div>
      </Section>

    </Container >
  )
}

const listStyleCSS = {
  marginLeft: 0,
  listStyleType: 'square',
  "> li": {
    listStyleType: 'square',
    padding: '16px 0 0 0',
  },
}

export default LandingPage
