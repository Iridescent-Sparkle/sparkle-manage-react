import { message } from 'antd'
import type { AxiosInstance, AxiosRequestConfig, CreateAxiosDefaults } from 'axios'
import axios from 'axios'
import nprogress from 'nprogress'
import 'nprogress/nprogress.css'
import type { CustomConfig } from './type.d'

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
    }, (error) => {
      nprogress.done()
      return Promise.reject(error)
    })
  }

  private request<T extends Record<string, any>>(requestConfig: AxiosRequestConfig, customConfig: CustomConfig = { showMsg: false }) {
    const token = localStorage.getItem('token')

    return new Promise<T>((resolve, reject) => {
      this.axios<T>({
        ...requestConfig,
        headers: {
          Authorization: `Bearer ${token}`,
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
  baseURL: 'http://localhost:5173/api',
})

window.$ = {
  post: request.post.bind(request),
  get: request.get.bind(request),
}
