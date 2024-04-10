import React, { Fragment, ReactNode, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { Table, Form, Pagination, TableProps } from 'antd'
import ClassNames from 'classnames'
import Search, { Item } from './Search'
import { ActionType } from './typing'
import { useActionType } from './utils'
import useFetchData from './useFetchData'
import styles from './index.module.less'
import { ColumnsType } from 'antd/es/table'
import ZoomOutTable from './components/ZoomOutTable'
import { omitNullObj } from '../utils'

const isMobile = () => {
  const mobileWidth = 768 // 移动端设备的宽度
  return window.innerWidth <= mobileWidth
}
interface Props extends TableProps<Record<string, any>> {
  request?: (val: { [key: string]: any; pageSize: number; current: number }, search?: Record<string, any>) => Promise<any>
  manualRequest?: boolean
  params?: Record<string, any>
  toolBarRender?: () => React.ReactNode[]
  ExtraTopModule?: React.ReactNode
  search?: Item[]
  hasInitFormValue?: boolean
  isExpandSearch?: boolean
  clearInitialValue?: boolean
  postData?: any
  actionRef?: React.Ref<ActionType>
  searchFormCol?: [number, number]
  hasMarginPadding?: boolean
  zoomOutConfig?: {
    top?: ColumnsType<Record<string, any>>[0]
    bottom?: ColumnsType<Record<string, any>>[0]
  }
}

const ProTable = (props: Props) => {
  const {
    actionRef: propsActionRef,
    dataSource,
    params,
    request,
    postData,
    toolBarRender,
    isExpandSearch,
    ExtraTopModule,
    clearInitialValue,
    zoomOutConfig,
    searchFormCol,
    hasInitFormValue, //search 组件是否有默认值
    manualRequest, //手动触发，当该值为true时，进行首次请求
    search, //是否显示搜索表单，传入数组时为搜索表单的配置
    hasMarginPadding, // 工具栏是否有外边距和内边距
    pagination: propsPagination,
    className: propsClassName,
    columns: tableColumns,
    ...rest
  } = props

  const [form] = Form.useForm()

  const [formSearch, setFormSearch] = useState<Record<string, any>>({})

  /** 通用的来操作子节点的工具类 */
  const actionRef = useRef<ActionType>()

  useImperativeHandle(propsActionRef, () => actionRef.current)

  /** 需要初始化 不然默认可能报错 这里取了 defaultCurrent 和 current 为了保证不会重复刷新 */
  const fetchPagination = typeof propsPagination === 'object' ? propsPagination : { defaultCurrent: 1, defaultPageSize: 20, pageSize: 20, current: 1 }
  const fetchData = useMemo(() => {
    if (!request) return undefined
    return async (pageParams?: Record<string, any>) => {
      const { searchTimes, ...formSearchParams } = formSearch
      const actionParams = {
        ...(pageParams || {}),
        ...formSearch,
        ...params,
      }
      delete (actionParams as any)._timestamp
      const omitFormSearchParams = omitNullObj(formSearchParams)
      const response = await request(actionParams as { [key: string]: any; pageSize: number; current: number }, omitFormSearchParams)
      return response as any
    }
  }, [formSearch, params, request])
  const action = useFetchData(fetchData, [], {
    pageInfo: propsPagination ? fetchPagination : false,
    loading: props?.loading,
    postData,
    manualRequest,
    hasInitFormValue,
    initFormValues: { ...form.getFieldsValue() },
    effects: [params, formSearch, manualRequest],
    onPageInfoChange: (pageInfo) => {
      if (!propsPagination || !fetchData) return
      propsPagination?.onChange?.(pageInfo.current, pageInfo.pageSize)
      propsPagination?.onShowSizeChange?.(pageInfo.current, pageInfo.pageSize)
    },
  })
  console.log(action,'121');
  
  const onPageChange = (current: number, pageSize: number) => {
    action.setPageInfo({
      current: current,
      pageSize: pageSize,
    })
    propsPagination && propsPagination?.onChange?.(current, pageSize)
  }

  const onTableChange = (pagination: any, filters: any, sorter: any, extra: any) => {
    console.log(sorter, 'sorter')
    // action.setPageInfo({
    //   current: pagination.current,
    //   pageSize: pagination.pageSize,
    // })
    // propsPagination && propsPagination?.onChange?.(pagination.current, pagination.pageSize)
  }

  const onCleanSelected = () => {
    //todo 后续进行拓展
  }

  const setProFilter = (value: any) => {
    //todo 后续进行拓展
    console.log(value, 'filter')
  }
  const setProSort = (value: any) => {
    //todo 后续进行拓展
    console.log(value, 'sort')
  }

  /** 绑定 action */
  useActionType(actionRef, action, {
    onCleanSelected: () => {
      // 清空选中行
      onCleanSelected()
    },
    resetAll: () => {
      // 清空选中行
      onCleanSelected()
      // 清空筛选
      setProFilter({})
      // 清空排序
      setProSort({})
      // 重置页码
      action.setPageInfo({
        current: 1,
      })
      // 重置表单
      form?.resetFields()
      setFormSearch({})
    },
    formRef: form,
  })
  
  return (
    <div className={ClassNames(styles.proTable, propsClassName)}>
      {!!search && (
        <div className={ClassNames(styles.searchWrap, { [styles.mobile]: isMobile() })}>
          <Search formCol={searchFormCol} search={search} form={form} formValueChange={(v) => setFormSearch(v)} isExpand={isExpandSearch} clearInitialValue />
        </div>
      )}
      {ExtraTopModule}
      <div className={ClassNames(hasMarginPadding === false ? styles.tableNoMarginPadding : styles.tableWrap, { [styles.mobile]: isMobile() })}>
        <div className={styles.toolBar}>
          {toolBarRender?.()?.map((toolItem: ReactNode, index: React.Key) => {
            if (!React.isValidElement(toolItem)) {
              return <Fragment key={index}>{toolItem}</Fragment>
            }
            return React.cloneElement(toolItem, {
              key: index,
              className: styles.btnItem,
              ...(toolItem?.props || {}),
            })
          })}
        </div>
        {(zoomOutConfig?.top || zoomOutConfig?.bottom) && (
          <ZoomOutTable
            columns={tableColumns}
            dataSource={action?.dataSource?.length ? action?.dataSource : dataSource || []}
            loading={action.loading}
            zoomOutConfig={zoomOutConfig}
            {...rest}
          />
        )}
        {!zoomOutConfig?.top && !zoomOutConfig?.bottom && (
          <Table
            columns={tableColumns}
            dataSource={action?.dataSource?.length ? action?.dataSource : dataSource || []}
            pagination={false}
            loading={action.loading}
            onChange={onTableChange}
            {...rest}
          />
        )}

        {propsPagination !== false && (
          <div className={styles.paginationWrap}>
            <>
              <div className={styles.total}>总共 {action.pageInfo.total} 条数据</div>
              <Pagination
                size={rest?.size == 'small' ? 'small' : 'default'}
                current={action.pageInfo.current}
                pageSizeOptions={[10, 15, 20, 50, 100]}
                pageSize={action.pageInfo.pageSize}
                total={action.pageInfo.total}
                onChange={onPageChange}
                showQuickJumper
              />
            </>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProTable
