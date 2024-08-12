import { Box, CssBaseline, ThemeProvider } from '@mui/material'
import { theme } from 'theme'
import { Footer, Header, Router } from './components'
import ProductHunt from './components/ProductHunt'

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductHunt />
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header />
        <Box sx={{ overflowY: 'auto', flexGrow: 1 }}>
          <Router />
        </Box>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
