import { Typography, styled } from '@mui/material'
import { Link } from 'react-router-dom'

const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}))

function Logo() {
  return (
    <LinkStyled to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
      <img src="https://sparkle-cdn.oss-cn-chengdu.aliyuncs.com/sparkle-mobile/stars.png" alt="logo" height={55} style={{ position: 'relative', right: '-20px' }} />
      <Typography variant="h4" sx={{ ml: 3, fontWeight: 700 }} color="#6C63FF">
        Sparkle
      </Typography>
    </LinkStyled>
  )
}

export default Logo
