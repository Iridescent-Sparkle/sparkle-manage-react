import { message } from 'antd'
import { Router } from 'src/routes/Router'
import { create } from 'zustand'

interface State {
  token: string
}

interface Action {
  getUserInfo: () => Promise<void>
  setData: (params: Partial<State>) => void
  register: (params: { username: string, captcha: string, password: string }) => void
  login: (params: { username: string, password: string }) => void
  logout: () => Promise<void>
  userInfo: any
}

export const useUserStore = create<State & Action>(set => ({
  token: '',
  userInfo: {
    id: 0,
    username: '',
    password: '',
    nickname: '',
    avatar: '',
    isFrozen: false,
    createTime: '',
    updateTime: '',
  },
  setData: (params) => {
    set(state => ({
      ...state,
      ...params,
    }))
  },
  register: async (params) => {
    await $.post(params, {
      url: 'admin/user/register',
    })
  },
  login: async (params) => {
    const loginRes = await $.post(params, {
      url: 'admin/user/login',
    })

    localStorage.setItem('token', loginRes.data.accessToken || '')

    return set((state) => {
      return {
        ...state,
        token: loginRes.data.accessToken,
      }
    })
  },
  logout: async () => {
    await localStorage.setItem('token', '')

    message.success('登录成功')
    set(state => ({
      ...state,
      token: '',
    }))
  },
  getUserInfo: async () => {
    const token = localStorage.getItem('token') || ''

    if (token) {
      const userInfo = await $.get({}, {
        url: 'admin/user/info',
      })

      localStorage.setItem('userInfo', JSON.stringify(userInfo.data))

      return set(state => ({
        ...state,
        token,
        userInfo: userInfo.data,
      }))
    } else if (Router.location.pathname !== '/auth/login' && Router.location.pathname !== '/auth/register') {
      message.error('登录失效，请重新登录')

      Router.replace('/auth/login')

      window.location.reload()
    }
  },
}))
