import { Box, Button, Container, Typography } from '@mui/material'
import React from 'react'
import { pageWrapperCSS } from 'theme'
import focus_mode from '../static/focus_mode.png'
import queue_mode from '../static/queue_mode.png'
import settings from '../static/settings.png'
import successes from '../static/successes.png'
import theme_1 from '../static/theme_1.png'
import theme_2 from '../static/theme_2.png'
import theme_3 from '../static/theme_3.png'
import theme_4 from '../static/theme_4.png'
import { Title } from '../components'

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
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    textAlign: 'center'
  },
  '&:nth-of-type(odd)': {
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column'
    }
  }
}))

const ThemeSection = styled(Section)(({ theme }) => ({
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  [theme.breakpoints.down('md')]: {
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
  [theme.breakpoints.down('md')]: {
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
        <Typography variant="h2" css={{ textAlign: 'center' }}>The todo List for the easily distracted</Typography>
      </TitleSection>
      {/* Queue Mode Section */}
      <Section>
        <Text>
          <Typography variant="h5">Plan Your Day</Typography>
          <Typography>Select tasks, order them, and add notes.</Typography>
        </Text>
        <div><Image src={queue_mode} alt="Queue Mode" /></div>
      </Section>
      {/* Focus Mode Section */}
      <Section>
        <Text>
          <Typography variant="h5">Stay Focused</Typography>
          <Typography>Set a timer, focus on the current task, and get working.</Typography>
        </Text>
        <div><Image src={focus_mode} alt="Focus Mode" /></div>
      </Section>
      {/* Successes Section */}
      <Section>
        <Text>
          <Typography variant="h5">Track the small wins</Typography>
          <Typography>For those that are easily distracted, it can feel like nothing is achieved in a day.</Typography>
        </Text>
        <div><Image src={successes} alt="Successes" /></div>
      </Section>
      <ThemeSection>
        <div css={{ display: 'flex', alignItems: 'center', flexDirection: 'column' }} >
          <Typography variant="h5">Do it in Style</Typography>
          <div css={{ flexDirection: 'row', display: 'flex' }}>
            <Button onClick={handlePrev}>&lt; Prev</Button>
            <Button onClick={handleNext}>Next &gt;</Button>
          </div>
        </div>
        <div><Image src={themes[currentTheme]} alt={`Theme ${currentTheme + 1}`} /></div>
      </ThemeSection>
      <Section>
        <Text>
          <Typography variant="h5">Settings</Typography>
          <Typography>Modify how many items can be worked on in focus mode, change the theme, create and schedule backups, restore your backup.</Typography>
        </Text>
        <div><Image src={settings} alt="Settings" /></div>
      </Section>
    </Container >
  )
}

export default LandingPage
