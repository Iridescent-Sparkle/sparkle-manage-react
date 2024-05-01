import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import '../src/api/index'
import zhCN from 'antd/locale/zh_CN';
import 'dayjs/locale/zh-cn'
import { ConfigProvider } from 'antd'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <Suspense>
    <BrowserRouter>
      <ConfigProvider locale={zhCN}>
        <App />
      </ConfigProvider>
    </BrowserRouter>
  </Suspense>,
)
