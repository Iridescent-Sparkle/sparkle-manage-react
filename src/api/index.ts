import { message } from 'antd'
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import { Router } from 'src/routes/Router'
import type { CustomConfig } from './type.d'

interface PendingTask {
  config: AxiosRequestConfig
  resolve: Function
}

let refreshing = false

const queue: PendingTask[] = []

async function refreshToken() {
  const { data } = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/admin/user/refresh`, {
    params: {
      refreshToken: localStorage.getItem('refreshToken'),
    },
  })

  localStorage.setItem('accessToken', data.data.accessToken || '')
  localStorage.setItem('refreshToken', data.data.refreshToken || '')
  return data
}

export class Request {
  private readonly axios: AxiosInstance

  constructor(params: CreateAxiosDefaults) {
    this.axios = axios.create(params)

    this.axios.interceptors.request.use((config) => {
      nprogress.start()
      return config
    }, (error) => {
      nprogress.done()
      return Promise.reject(error)
    })

    this.axios.interceptors.response.use((response) => {
      nprogress.done()
      return response
    }, async (error) => {
      nprogress.done()

      const { data, config } = error.response

      if (refreshing) {
        return new Promise((resolve) => {
          queue.push({
            config,
            resolve,
          })
        })
      }

      if (data.code === 401 && !config.url.includes('/admin/user/refresh')) {
        refreshing = true

        const data = await refreshToken()

        refreshing = false

        if (data.code === 200) {
          queue.forEach(({ config, resolve }: any) => {
            config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
            resolve(axios(config))
          })
          queue.length = 0
          config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`
          return axios(config)
        }
        else {
          message.error('登录过期，请重新登录')

          Router.replace('/auth/login')

          window.location.reload()

          return Promise.reject(data)
        }
      }
      else {
        return error.response
      }
    })
  }

  private request<T extends Record<string, any>>(requestConfig: AxiosRequestConfig, customConfig: CustomConfig = { showMsg: false }) {
    const accessToken = localStorage.getItem('accessToken')

    return new Promise<T>((resolve, reject) => {
      this.axios<T>({
        ...requestConfig,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }).then((res) => {
        if (!String(res.data.code).startsWith('20')) {
          customConfig.showMsg && message.error(res.data.message)
          reject(res.data)
        }
        else {
          resolve(res.data)
        }
      }).catch((error) => {
        customConfig.showMsg && message.error(error.message)
        reject(error)
      })
    })
  }

  public post<T extends Record<string, any>, K extends Record<string, any>>(data: K, requestConfig: Omit<AxiosRequestConfig, 'method' | 'data'>, customConfig?: CustomConfig) {
    return this.request<T>({
      method: 'POST',
      data,
      ...requestConfig,
    }, customConfig)
  }

  public get<T extends Record<string, any>, K extends Record<string, any>>(data: K, requestConfig: Omit<AxiosRequestConfig, 'method' | 'params'>, customConfig?: CustomConfig) {
    return this.request<T>({
      method: 'GET',
      params: data,
      ...requestConfig,
    }, customConfig)
  }
}

export const request = new Request({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

window.$ = {
  post: request.post.bind(request),
  get: request.get.bind(request),
}
