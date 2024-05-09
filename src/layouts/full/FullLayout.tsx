import { Box, Container, styled } from '@mui/material'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header/Header'
import Sidebar from './sidebar'

const MainWrapper = styled('div')(() => ({
  display: 'flex',
  minHeight: '100vh',
  width: '100%',
}))

const PageWrapper = styled('div')(() => ({
  display: 'flex',
  flexGrow: 1,
  paddingBottom: '60px',
  flexDirection: 'column',
  zIndex: 1,
  backgroundColor: 'transparent',
  overflow: 'auto',
}))

function FullLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(true)
  const [isMobileSidebarOpen, setMobileSidebarOpen] = useState(false)

  return (
    <MainWrapper
      className="mainwrapper"
    >
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        isMobileSidebarOpen={isMobileSidebarOpen}
        onSidebarClose={() => setMobileSidebarOpen(false)}
      />
      <PageWrapper
        className="page-wrapper"
      >
        <Header toggleSidebar={() => setSidebarOpen(!isSidebarOpen)} toggleMobileSidebar={() => setMobileSidebarOpen(true)} />
        <Container sx={{
          paddingTop: '20px',
          maxWidth: '100%!important',
        }}
        >
          <Box sx={{ minHeight: 'calc(100vh - 170px)' }}>
            <Outlet />
          </Box>
        </Container>
      </PageWrapper>
    </MainWrapper>
  )
}

export default FullLayout
