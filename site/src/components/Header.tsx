import { Link } from '@mui/material'
import { useLocation } from 'react-router'

const Header = () => {
  const location = useLocation()

  return (
    <div css={{ justifyContent: 'space-between', padding: '16px', display: 'flex' }}>
      <div>
        {location.pathname !== '/' && <Link href='/'>Home</Link>}
      </div>
      <div>
        <Link
          css={{ marginRight: '16px' }}
          href=''
          download
        >
          App Store
        </Link>
        <Link href=''
          download>
          Play Store
        </Link>
      </div>
    </div >
  )
}

export default Header
