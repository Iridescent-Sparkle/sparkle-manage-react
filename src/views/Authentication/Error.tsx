import { Box, Button, Container, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import ErrorImg from 'src/assets/images/404-error-idea.gif'

function Error() {
  return (
    <Box
      display="flex"
      flexDirection="column"
      height="100vh"
      textAlign="center"
      justifyContent="center"
    >
      <Container maxWidth="md">
        <img src={ErrorImg} alt="404" style={{ width: '100%', maxWidth: '500px' }} />
        <Typography align="center" variant="h1" mb={4}>
          噢!!!
        </Typography>
        <Typography align="center" variant="h4" mb={4}>
          找不到您正在寻找的页面。
        </Typography>
        <Button color="primary" variant="contained" component={Link} to="/" disableElevation>
          返回首页
        </Button>
      </Container>
    </Box>
  )
}

export default Error
