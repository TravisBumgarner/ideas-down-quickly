import { Box, Button, Container, Link, Typography } from '@mui/material'
import { pageWrapperCSS, SPACING } from 'theme'
import { Title } from '../components'
// import AddCategory from '../static/add-category.png'
// import AddIdea from '../static/add-idea.png'
import Ideate from '../static/ideate.png'
import Reflect from '../static/reflect.png'
import Settings from '../static/settings.png'

import { css, styled } from '@mui/material/styles'

const TitleSection = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '50vh',
}))

const LandingPage = () => {
  return (
    <Container css={pageWrapperCSS}>
      <TitleSection>
        <Title />
        <Typography variant="h2" css={{ textAlign: 'center', marginTop: '24px', marginBottom: '24px' }}>Clear your mind and make room for your next big idea.</Typography>
        <Typography css={{maxWidth: '600px'}} variant='body1'>Do you find it hard to keep track of your creative ideas? Do they slip away or consume your focus? Ideas Down lets you capture them instantly—no logins, no complicated setup, and no internet needed. Data stays on your device and the app is fully open source. </Typography>
      </TitleSection>

      <Section>
        <Text>
          <Typography variant="h5" css={titleCSS}>Ideate</Typography>
          <Typography>Create a new category or choose from an existing one, and start ideating.</Typography>
        </Text>
        <div><Image src={Ideate} alt="Ideate" /></div>
      </Section>

      <Section>
        <Text>
          <Typography variant="h5" css={titleCSS}>Reflect</Typography>
          <Typography>Keep all your ideas in one place, organized by date and category. Use filters to focus on specific categories.</Typography>
        </Text>
        <div><Image src={Reflect} alt="Reflect" /></div>
      </Section>

      <Section>
        <Text>
          <Typography variant="h5" css={titleCSS}>Privacy & Security First</Typography>
          <ul css={listStyleCSS}>
            <li>No internet connection required</li>
            <li>No login needed</li>
            <li>Ideas remain on your device</li>
            <li>Fully Open Source (<Link target="_blank" href="https://github.com/TravisBumgarner/ideas-down-quickly">GitHub</Link>)</li>
            <li>Perform your own backups</li>
          </ul>
        </Text>
        <div><Image src={Settings} alt="Settings" /></div>
      </Section>

      <div css={downloadSectionCSS}>
        <Typography css={{marginBottom: '16px', fontSize: '32px'}} variant="h2">Clear your mind and make room for your next big idea.
        </Typography>
        <Button variant='contained' target='_blank' href="https://apps.apple.com/us/app/ideas-down-quickly/id6529524065?platform=iphone" css={ctaButtonCSS}>App Store</Button>
        <Button variant='contained' target='_blank' href='https://docs.google.com/forms/d/e/1FAIpQLSftglI15-9coi2P1Tx_QaZitHYrSMvVilQKn6_BB1t_3V3nvg/viewform?usp=sf_link' css={ctaButtonCSS}>Play Store Internal Testing</Button>
      </div>

    </Container >
  )
}

const Section = styled(Box)(({ theme }) => ({
  display: 'flex',

  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'flex-start',
  marginBottom: theme.spacing(12),
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center'
  },
  '&:nth-of-type(odd)': {
    flexDirection: 'row-reverse',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column'
    }
  }
}))

const downloadSectionCSS = css`
  flex-direction: row;
  margin: ${SPACING.MEDIUM}px;
  height: 80vh;
  text-align: center;
  align-content: center;
`


const Text = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: '200px',
  width: '100%',
  paddingTop: '80px',
  margin: '24px',
}))

const Image = styled('img')(({ theme }) => ({
  flex: 1,
  maxHeight: '80vh',
  height: 'auto',
  [theme.breakpoints.down('sm')]: {
    maxWidth: '100%'
  },
  borderRadius: '24px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5), 0 6px 20px rgba(0, 0, 0, 0.2)'
}))

const ctaButtonCSS = css`
  font-size: 16px;
  margin: 16px;
`

const listStyleCSS = {
  marginLeft: 0,
  listStyleType: 'square',
  margin: '0 0 0 16px',
  "> li": {
    listStyleType: 'square',
    padding: '0 0 16px 0',
  },
}

const titleCSS = {
  marginBottom: '16px',
}

export default LandingPage
