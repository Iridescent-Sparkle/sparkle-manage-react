import { useEffect, useRef } from 'react'
import { ActionType } from './typing'
import { FormInstance } from 'antd'

/**
 * 获取用户的 action 信息
 *
 * @param actionRef
 * @param counter
 * @param onCleanSelected
 */
export function useActionType(
  ref: React.MutableRefObject<ActionType | undefined>,
  action: any,
  props: {
    onCleanSelected: () => void
    resetAll: () => void
    formRef: FormInstance
  },
) {
  /** 这里生成action的映射，保证 action 总是使用的最新 只需要渲染一次即可 */
  const userAction: ActionType = {
    pageInfo: action.pageInfo,
    reload: async (resetPageIndex?: boolean) => {
      // 如果为 true，回到第一页
      if (resetPageIndex) {
        await action.setPageInfo({
          current: 1,
        })
      }
      await action?.reload()
    },
    reloadAndRest: async () => {
      // reload 之后大概率会切换数据，清空一下选择。
      props.onCleanSelected()
      await action.setPageInfo({
        current: 1,
      })
      await action?.reload()
    },
    reset: async () => {
      await props.resetAll()
      await action?.reset?.()
      await action?.reload()
    },
    // @ts-ignore
    dataSource: action?.dataSource,
    clearSelected: () => props.onCleanSelected(),
    setPageInfo: (rest) => action.setPageInfo(rest),
  }
  // eslint-disable-next-line no-param-reassign
  // ref.current = userAction
  ref.current = { ...userAction, formRef: props.formRef }
}

export const usePrevious = <T>(state: T): T | undefined => {
  const ref = useRef<T>()

  useEffect(() => {
    ref.current = state
  })

  return ref.current
}

export function parseUrlParams(queryString: string) {
  // 创建一个空对象来存储解析后的参数
  const params: Record<string, any> = {}

  // 使用URLSearchParams API解析查询字符串
  const searchParams: any = new URLSearchParams(queryString)

  // 遍历所有的键值对
  for (const [key, value] of searchParams) {
    // 检查键名是否以[]结尾，表示这是一个数组
    if (key.endsWith('[]')) {
      // 获取去掉[]后的键名
      const paramName = key.slice(0, -2)
      // 如果对象中还没有这个键，就创建一个数组
      if (!params[paramName]) {
        params[paramName] = []
      }
      // 向数组中添加值
      params[paramName].push(value)
    } else {
      // 如果不是数组，直接添加到对象中
      params[key] = value
    }
  }

  return params
}

/** 获取当前url ?符号后面的筛选参数的值 */
export const getQueryVariable = (path: string) => {
  let ret: Record<string, any> = {}
  let query = path.split('?')[1]
  if (query) {
    ret = parseUrlParams(query)
  }
  return ret
}

/**过滤对象中值为null、 undefined、 ""的键 */
export function cleanObject(obj: Record<string, any>): Record<string, any> {
  let newObj = {} as any
  for (let prop in obj) {
    if (obj[prop] !== null && obj[prop] !== undefined && obj[prop] !== '') {
      newObj[prop] = obj[prop]
    }
  }
  return newObj
}
