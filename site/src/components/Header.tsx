import { Link } from '@mui/material'
import { useLocation } from 'react-router'

const Header = () => {
  const location = useLocation()

  return (
    <div css={{ justifyContent: 'center', padding: '16px', display: 'flex' }}>
      <div>
        <Link
          css={{ marginRight: '16px', fontSize: 32 }}
          target='_blank'
          href='https://apps.apple.com/us/app/ideas-down-quickly/id6529524065?platform=iphone'
        >
          App Store
        </Link>
        <Link
          css={{ marginRight: '16px', fontSize: 32 }}
          target='_blank'
          href='https://docs.google.com/forms/d/e/1FAIpQLSftglI15-9coi2P1Tx_QaZitHYrSMvVilQKn6_BB1t_3V3nvg/viewform?usp=sf_link'
        >
          Play Store Internal Testing
        </Link>
      </div>
    </div >
  )
}

export default Header
