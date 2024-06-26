import 'dayjs/locale/zh-cn'
import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import '../src/api/index'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root')!)

root.render(
  <Suspense>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Suspense>,
)
