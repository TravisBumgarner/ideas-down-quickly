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
          target='_blank'
          href='https://apps.apple.com/us/app/ideas-down-quickly/id6529524065?platform=iphone'
        >
          App Store
        </Link>
      </div>
    </div >
  )
}

export default Header
