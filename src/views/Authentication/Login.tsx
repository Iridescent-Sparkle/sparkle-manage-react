import { Box, Card, Grid, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import PageContainer from 'src/components/container/PageContainer'
import AuthLogin from './components/AuthLogin'

function Login2() {
  return (
    <PageContainer title="Login" description="this is Login page">
      <Box
        sx={{
          'position': 'relative',
          '&:before': {
            content: '""',
            background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
            backgroundSize: '400% 400%',
            animation: 'gradient 15s ease infinite',
            position: 'absolute',
            height: '100%',
            width: '100%',
            opacity: '0.3',
          },
        }}
      >
        <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
          <Grid
            item
            xs={12}
            sm={12}
            lg={4}
            xl={3}
            display="flex"
            justifyContent="center"
            alignItems="center"
          >
            <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '500px' }}>
              <Box display="flex" alignItems="center" justifyContent="center">
                {/* <Logo /> */}
              </Box>
              <AuthLogin
                subtext={(
                  <Typography variant="subtitle1" textAlign="center" color="textSecondary" mb={1}>
                    {/* 您的社交活动 */}
                  </Typography>
                )}
                subtitle={(
                  <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                    <Typography color="textSecondary" variant="h6" fontWeight="500">
                      {/* 现代化的新手? */}
                    </Typography>
                    <Typography
                      component={Link}
                      to="/auth/register"
                      fontWeight="500"
                      sx={{
                        textDecoration: 'none',
                        color: 'primary.main',
                      }}
                    >
                      创建帐户
                    </Typography>
                  </Stack>
                )}
              />
            </Card>
          </Grid>
        </Grid>
      </Box>
    </PageContainer>
  )
}

export default Login2