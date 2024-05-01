import { message } from 'antd'
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
}

export const useUserStore = create<State & Action>(set => ({
  token: '',
  userInfo: {
    id: 0,
    username: '',
    password: '',
    nickname: '',
    avatar: '',
    email: '',
    contactIdToB: '',
    contactIdToC: '',
    contactPassword: '',
    isFrozen: false,
    isAdmin: false,
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
    try {
      const loginRes = await $.post(params, {
        url: 'admin/user/login',
      })

      await localStorage.setItem('token', loginRes.data.accessToken || '')

      return set((state) => {
        state.getUserInfo()
        return {
          ...state,
          token: loginRes.data.accessToken,
        }
      })
    }
    catch (error) {
      message.error('登录失败')
      console.error(error)
    }
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
    const token = await localStorage.getItem('token') || ''

    if (token) {
      const userInfo = await $.get({}, {
        url: '/user/info',
      })
      await localStorage.setItem('userInfo', JSON.stringify(userInfo.data))

      return set(state => ({
        ...state,
        token,
        userInfo: userInfo.data,
      }))
    }
  },
}))
