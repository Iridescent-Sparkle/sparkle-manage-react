/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useRef, useState } from 'react'
import { useDeepCompareEffect } from '../../hooks/useDeepCompareEffect'
import { isDef } from '../utils/is'
import type { PageInfo, UseFetchDataAction, UseFetchProps } from './typing'
import { getQueryVariable, usePrevious } from './utils'

/**
 * 组合用户的配置和默认值
 *
 * @param param0
 */
function mergeOptionAndPageInfo({ pageInfo }: UseFetchProps) {
  if (pageInfo) {
    const { current, defaultCurrent, pageSize, defaultPageSize } = pageInfo
    return {
      current: current || defaultCurrent || 1,
      total: 0,
      pageSize: pageSize || defaultPageSize || 20,
    }
  }
  return { current: 1, total: 0, pageSize: 20 }
}

/**
 * useFetchData hook 用来获取数据并控制数据的状态和分页
 * @template T
 * @param {(undefined | ((params?: { pageSize: number; current: number }) => Promise<any>))} isLoadData - 获取数据的函数，参数为分页参数，
 * 返回一个 Promise 类型的 T 类型的数据
 * @param {(undefined | any[])} defaultData - 默认的数据
 * @param {UseFetchProps} options - 配置项，包括了默认的分页参数、格式化数据的函数等
 * @returns {UseFetchDataAction} 返回一个对象，包含当前的数据列表、loading 状态、error、以及可控制的分页参数等
 */
function useFetchData(isLoadData: undefined | ((params?: { pageSize: number, current: number }) => Promise<any>), defaultData: any[] | undefined, options: UseFetchProps): UseFetchDataAction {
  const { onLoad, onRequestError, effects = [], manualRequest, initFormValues, hasInitFormValue } = options || {}

  const timesRef = useRef<number>(0)
  const [tableDataList, setTableDataList] = useState<any[] | undefined>(defaultData)
  const [pageInfo, setPageInfo] = useState<PageInfo>(mergeOptionAndPageInfo(options))
  /**
   * 表格的加载状态
   */
  const [tableLoading, setTableLoading] = useState<boolean>(false)
  /**
   * 上一页的页码
   * @type {number}
   */
  const prePage = usePrevious(pageInfo?.current)
  /**
   * 上一页的页面大小
   * @type {number}
   */
  const prePageSize = usePrevious(pageInfo?.pageSize)

  const fetchList = async (currentPage?: number): Promise<any> => {
    setTableLoading(true)
    let currentPageNum = pageInfo?.current
    if (currentPage) {
      currentPageNum = currentPage
      setPageInfo(v => ({ ...v, current: currentPage }))
    }
    const { pageSize } = pageInfo || {}
    try {
      const pageParams = options?.pageInfo ? { current: currentPageNum, pageSize } : undefined
      const { data = [], success, ...rest } = (await isLoadData?.(pageParams)) || {}
      console.log((await isLoadData?.(pageParams)) || {}, 'datra')

      if (data.data) {
        setTableDataList(data.data)
        if (pageInfo?.total !== data.total) {
          setPageInfo({
            ...pageInfo,
            total: data.total || data.data.length,
          })
        }
        return data.data
      }
      else {
        return []
      }
    }
    catch (e) {
      if (tableDataList === undefined)
        setTableDataList([])
      onRequestError?.(e as Error)
      throw new Error(e as string)
    }
    finally {
      setTableLoading(false)
    }
  }

  /** PageIndex 改变的时候自动刷新 */
  useEffect(() => {
    const { current, pageSize } = pageInfo || {}
    // 如果上次的页码为空或者两次页码等于是没必要查询的
    // 如果 pageSize 发生变化是需要查询的，所以又加了 prePageSize
    if ((!prePage || prePage === current) && (!prePageSize || prePageSize === pageSize))
      return

    if ((options.pageInfo && tableDataList && tableDataList?.length > pageSize) || 0)
      return

    // 如果 list 的长度大于 pageSize 的长度
    // 说明是一个假分页
    // (pageIndex - 1 || 1) 至少要第一页
    // 在第一页大于 10
    // 第二页也应该是大于 10
    if (current !== undefined && tableDataList && tableDataList.length <= pageSize)
      fetchList()
  }, [pageInfo?.current])

  // pageSize 修改后返回第一页
  useEffect(() => {
    if (!prePageSize)
      return

    fetchList(1)
  }, [pageInfo?.pageSize])

  useDeepCompareEffect(() => {
    timesRef.current = timesRef.current + 1
    if (hasInitFormValue) {
      // 有搜索表单默认值情况
      if (timesRef.current == 1 && !Object.keys(initFormValues || {})?.length)
        return

      fetchList(1)
      return
    }
    if (isDef(manualRequest)) {
      manualRequest && fetchList(1)
    }
    else {
      // 首次执行,假如有筛选参数取消首次请求
      if (timesRef.current == 1) {
        const queryVars = getQueryVariable(location.href)
        if (Object.keys(queryVars || {})?.length)
          return
      }
      fetchList(1)
    }
  }, [...effects])

  return {
    /**
     * 表格的数据列表。
     * @type {any[]}
     */
    dataSource: tableDataList! as any[],
    /**
     * 用于设置表格数据列表的 setter 函数。
     * @type {Function}
     * @param {DataSource[]} list - 更新后的表格数据列表。
     */
    setDataSource: setTableDataList,
    /**
     * 表示表格是否正在加载数据的标志。
     * @type {boolean}
     */
    loading: typeof options?.loading === 'object' ? { ...options?.loading, spinning: tableLoading } : tableLoading,
    /**
     * 重新加载表格数据的函数。
     * @type {Function}
     * @async
     * @returns {Promise<any>}
     */
    reload: async (current: number) => {
      return fetchList(current)
    },
    /**
     * 当前的分页信息。
     * @type {object}
     * @prop {number} current - 当前页码。
     * @prop {number} total - 总数据数量。
     * @prop {number} pageSize - 每页数据数量。
     */
    pageInfo,
    /**
     * 重置分页信息为其初始值的函数。
     * @type {Function}
     * @async
     * @returns {Promise<void>} - 重置完成后解决的 Promise。
     */
    reset: async () => {
      const { pageInfo: optionPageInfo } = options || {}
      const { defaultCurrent = 1, defaultPageSize = 20 } = optionPageInfo || {}
      const initialPageInfo = {
        current: defaultCurrent,
        total: 0,
        pageSize: defaultPageSize,
      }
      setPageInfo(initialPageInfo)
    },
    /**
     * 更新分页信息的函数。
     * @type {Function}
     * @async
     * @param {object} info - 新的分页信息。
     * @prop {number} [current] - 新的当前页码。
     * @prop {number} [total] - 新的总数据数量。
     * @prop {number} [pageSize] - 新的每页数据数量。
     * @returns {Promise<void>} - 更新完成后解决的 Promise。
     */
    setPageInfo: async (info) => {
      setPageInfo({
        ...pageInfo,
        ...info,
      })
    },
  }
}

export default useFetchData
