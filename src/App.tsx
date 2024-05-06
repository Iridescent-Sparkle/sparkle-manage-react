import { CssBaseline, ThemeProvider } from '@mui/material'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/locale/zh_CN'
import 'dayjs/locale/zh-cn'
import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import '../src/api/index'
import Router from './routes/Router'
import { baselightTheme } from './theme/DefaultColors'

function App() {
  const theme = baselightTheme
  return (
    <Suspense>
      <ThemeProvider theme={theme}>
        <RouterProvider router={Router}>
          <ConfigProvider locale={zhCN}>
            <CssBaseline />
          </ConfigProvider>
        </RouterProvider>
      </ThemeProvider>
    </Suspense>
  )
}

export default App
