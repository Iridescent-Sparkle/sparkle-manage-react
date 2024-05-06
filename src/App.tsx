import { CssBaseline, ThemeProvider } from '@mui/material'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { Suspense, useEffect } from 'react'
import { RouterProvider, } from 'react-router-dom'
import '../src/api/index'
import Router from './routes/Router'
import { baselightTheme } from './theme/DefaultColors'
import { useUserStore } from './store/user'

function App() {
  const theme = baselightTheme
  const userStore = useUserStore()

  useEffect(() => {
    userStore.getUserInfo()
  }, [])


  return (
    <Suspense>
      <ThemeProvider theme={theme}>
        <ConfigProvider locale={zhCN}>
          <RouterProvider router={Router} >
            <CssBaseline />
          </RouterProvider>
        </ConfigProvider>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
