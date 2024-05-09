import { message } from 'antd'
import { Router } from 'src/routes/Router'
import { create } from 'zustand'

interface State {
  accessToken: string
}

interface Action {
  getUserInfo: () => Promise<void>
  setData: (params: Partial<State>) => void
  register: (params: { username: string, captcha: string, password: string }) => void
  login: (params: { username: string, password: string }) => void
  logout: () => void
  userInfo: any
}

export const useUserStore = create<State & Action>(set => ({
  accessToken: '',
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

    localStorage.setItem('accessToken', loginRes.data.accessToken || '')
    localStorage.setItem('refreshToken', loginRes.data.refreshToken || '')

    return set((state) => {
      return {
        ...state,
        accessToken: loginRes.data.accessToken,
      }
    })
  },
  logout: () => {
    localStorage.setItem('accessToken', '')
    localStorage.setItem('refreshToken', '')

    Router.replace('/auth/login')

    window.location.reload()
    set(state => ({
      ...state,
      accessToken: '',
    }))
  },

  getUserInfo: async () => {
    const accessToken = localStorage.getItem('accessToken') || ''

    if (accessToken) {
      const userInfo = await $.get({}, {
        url: 'admin/user/info',
      })

      localStorage.setItem('userInfo', JSON.stringify(userInfo.data))

      return set(state => ({
        ...state,
        accessToken,
        userInfo: userInfo.data,
      }))
    }
    else if (Router.location.pathname !== '/auth/login' && Router.location.pathname !== '/auth/register') {
      message.error('登录失效，请重新登录')

      Router.replace('/auth/login')

      window.location.reload()
    }
  },
}))
