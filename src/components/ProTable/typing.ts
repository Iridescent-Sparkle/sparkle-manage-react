import type { FormInstance, SpinProps } from 'antd'

export type PageInfo = {
  pageSize: number
  total: number
  current: number
}

export type ActionType<T = {}> = {
  pageInfo?: PageInfo
  setPageInfo?: (page: Partial<PageInfo>) => void
  /** @name 刷新 */
  reload: (resetPageIndex?: boolean) => Promise<void>
  /** @name 刷新并清空，只清空页面，不包括表单 */
  reloadAndRest?: () => Promise<void>
  /** @name 重置任何输入项，包括表单 */
  reset?: (current: number) => void
  /** @name 清空选择 */
  clearSelected?: () => void
  formRef: FormInstance
} & T

export type UseFetchDataAction<T = any> = {
  dataSource: T[]
  setDataSource: (dataSource: T[]) => void
  loading: boolean | SpinProps | undefined
  pageInfo: PageInfo
  reload: (current?: number) => Promise<void>
  reset: (current: number) => void
  setPageInfo: (pageInfo: Partial<PageInfo>) => void
}

/**
 * 用于定义 useFetch 的参数类型
 * @typedef {Object} UseFetchProps
 * @property {any} [dataSource] - 数据源，可选参数
 * @property {UseFetchDataAction['loading']} loading - 数据加载状态，必须参数
 * @property {(loading: UseFetchDataAction['loading']) => void} [onLoadingChange] - 加载状态改变时的回调函数，可选参数
 * @property {(dataSource: any[], extra: any) => void} [onLoad] - 数据加载完成时的回调函数，可选参数
 * @property {(dataSource?: any) => void} [onDataSourceChange] - 数据源改变时的回调函数，可选参数
 * @property {any} postData - 发送到后端的数据，必须参数
 * @property {{current?: number; pageSize?: number; defaultCurrent?: number; defaultPageSize?: number;} | false} pageInfo - 分页信息，可选参数，false 表示不启用分页
 * @property {(pageInfo: PageInfo) => void} [onPageInfoChange] - 分页信息改变时的回调函数，可选参数
 * @property {any[]} [effects] - 依赖的其它 Hook 或其它变量，可选参数
 * @property {(e: Error) => void} [onRequestError] - 请求出错时的回调函数，可选参数
 * @property {number} [debounceTime] - 延迟时间，可选参数，单位为毫秒
 * @property {number | ((dataSource: any[]) => number)} [polling] - 轮询时间，可选参数，单位为毫秒或一个返回时间的函数
 * @property {boolean} [revalidateOnFocus] - 是否在焦点回到页面时重新验证数据，可选参数
 */

export type UseFetchProps = {
  /**
   * 是否处于加载状态
   * @type {UseFetchDataAction['loading']}
   */
  loading: UseFetchDataAction['loading']

  /**
   * 加载状态改变时的回调函数
   * @type {(loading: UseFetchDataAction['loading']) => void}
   */
  onLoadingChange?: (loading: UseFetchDataAction['loading']) => void

  hasInitFormValue?: boolean
  /**
   * 数据加载完成后的回调函数
   * @type {(dataSource: any[], extra: any) => void}
   */
  onLoad?: (dataSource: any[], extra: any) => void

  /**
   * 数据源变化时的回调函数
   * @type {(dataSource?: any) => void}
   */
  onDataSourceChange?: (dataSource?: any) => void

  /**
   * 请求时附带的数据
   * @type {any}
   */
  postData: (dataSource: any[]) => any[]

  /** 表单初始值 */
  initFormValues?: Record<string, any>

  /**
   * 分页信息
   * @type {{
   *   current?: number;
   *   pageSize?: number;
   *   defaultCurrent?: number;
   *   defaultPageSize?: number;
   * } | false}
   */
  pageInfo:
    | {
        current?: number
        pageSize?: number
        defaultCurrent?: number
        defaultPageSize?: number
      }
    | false

  /**
   * 分页信息变化时的回调函数
   * @type {(pageInfo: PageInfo) => void}
   */
  onPageInfoChange?: (pageInfo: PageInfo) => void

  /**
   * 请求相关的副作用
   * @type {any[]}
   */
  effects?: any[]

  /**
   * 请求出错时的回调函数
   * @type {(e: Error) => void}
   */
  onRequestError?: (e: Error) => void
  // 是否手动请求
  manualRequest?: boolean
}
