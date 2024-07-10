import { Box, Container, Typography } from '@mui/material'
import { pageWrapperCSS } from 'theme'
import { Title } from '../components'
// import AddCategory from '../static/add-category.png'
// import AddIdea from '../static/add-idea.png'
import Ideate from '../static/ideate.png'
import Reflect from '../static/reflect.png'
import Settings from '../static/settings.png'

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

const LandingPage = () => {
  return (
    <Container css={pageWrapperCSS}>
      <TitleSection>
        <Title />
        <Typography variant="h2" css={{ textAlign: 'center' }}>Capture Ideas Quickly & Easily</Typography>
      </TitleSection>

      <Section>
        <Text>
          <Typography variant="h5" css={titleCSS}>Simple and Efficient</Typography>
          <Typography>Minimal Workflow: Create a new category or choose from an existing one, and start recording right away.</Typography>
        </Text>
        <div><Image src={Ideate} alt="Ideate" /></div>
      </Section>

      <Section>
        <Text>
          <Typography variant="h5" css={titleCSS}>Simple and Efficient</Typography>
          <Typography>Browse Effortlessly: Easily browse through your thoughts.</Typography>
        </Text>
        <div><Image src={Reflect} alt="Reflect" /></div>
      </Section>

      <Section>
        <Text>
          <Typography variant="h5" css={titleCSS}>Privacy & Security First</Typography>
          <ul css={listStyleCSS}>
            <li>Offline Functionality: No internet connection required to use. </li>
            <li>Secure Storage: Your ideas are safe and private, stored securely on your device. They are not sent anywhere for any reason.</li>
            <li>Data Management: Perform backups and restores of your data from within the app.</li>
            <li>Open Source: The entire project is fully open source, allowing you to see exactly what's going on.</li>
          </ul>
        </Text>
        <div><Image src={Settings} alt="Settings" /></div>
      </Section>

    </Container >
  )
}

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
