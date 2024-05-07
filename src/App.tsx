import { CssBaseline, ThemeProvider } from '@mui/material'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { useEffect } from 'react'
import { useRoutes } from 'react-router-dom'
import '../src/api/index'

import { getRoutes } from './routes/Router'
import { useUserStore } from './store/user'
import { baselightTheme } from './theme/DefaultColors'

function App() {
  const theme = baselightTheme

  const userStore = useUserStore()

  const routing = useRoutes(getRoutes(userStore.userInfo.permissions?.map((item: { code: any }) => item.code)))

  useEffect(() => {
    userStore.getUserInfo()
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <ConfigProvider locale={zhCN}>
        <CssBaseline />
        {routing}
      </ConfigProvider>
    </ThemeProvider>
  )
}

export default App
