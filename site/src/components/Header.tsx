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
          href='https://github.com/TravisBumgarner/Todo-Today-Releases/releases/download/v1.2.11/Todo-Today_1.2.11.exe'
          download
        >
          Windows Download
        </Link>
        <Link href='https://github.com/TravisBumgarner/Todo-Today-Releases/releases/download/v1.2.11/Todo-Today_1.2.11.dmg'
          download>
          Mac Download
        </Link>
      </div>
    </div >
  )
}

export default Header
