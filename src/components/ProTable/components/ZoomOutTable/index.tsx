import { Table, TableProps } from 'antd'
import { ColumnsType } from 'antd/es/table'
import concat from 'lodash-es/concat'
import { useMemo } from 'react'
import styles from './index.module.less'
import classNames from 'classnames'

interface Props extends TableProps<Record<string, any>> {
  zoomOutConfig?: {
    top?: ColumnsType<Record<string, any>>[0]
    bottom?: ColumnsType<Record<string, any>>[0]
  }
}

const Index = (props: Props) => {
  const { zoomOutConfig, dataSource: data, rowKey, columns: initColumns, rowSelection, ...rest } = props
  const dataSource = useMemo(() => {
    const objectKey = typeof rowKey === 'string' ? rowKey : 'id'
    const { top, bottom } = zoomOutConfig || {}
    return data.reduce(
      (pre, cur) =>
        pre.concat(
          [
            top ? { ...cur, key: `${cur[objectKey]}-top` } : null,
            { ...cur, key: cur[objectKey] },
            bottom ? { ...cur, key: `${cur[objectKey]}-bottom` } : null,
          ].filter((val) => !!val),
        ),
      [],
    )
  }, [data])
  /**
   * @description: cell处理函数 判断当前项是否展示
   * @param {number} index 所在为第几行
   * @param {number} reset 余数 余数为0 展示头部项 余数为1展示列表项 余数为2展示底部栏
   */
  const showOnCell = (index: number, reset: number, colIndex?: number) => {
    const objectLength = Object.keys(zoomOutConfig || {}).length
    if (colIndex === 0) {
      if (index % (Object.keys(zoomOutConfig || {}).length + 1) === 0) {
        return {
          rowSpan: 0,
        }
      }
      if (objectLength === 2 && index % (Object.keys(zoomOutConfig || {}).length + 1) === 2) {
        return {
          rowSpan: 0,
        }
      }
      return {}
    }
    if (index % (Object.keys(zoomOutConfig || {}).length + 1) === 0 && reset === 0) {
      return {
        colSpan: initColumns.length,
        rowSpan: 1,
      }
    }
    if (objectLength === 2 && index % (Object.keys(zoomOutConfig || {}).length + 1) === 2 && reset === 2) {
      return {
        colSpan: initColumns.length,
        rowSpan: 1,
      }
    }
    if (index % (Object.keys(zoomOutConfig || {}).length + 1) === reset) {
      return {}
    }

    return { colSpan: 0, rowSpan: 1 }
  }

  const isHasPadding = (index: number) => {
    const objectLength = Object.keys(zoomOutConfig || {}).length
    if (objectLength === 2) {
      return index % 3 !== 1
    }
    if (zoomOutConfig?.top) {
      return index % 2 !== 1
    }
    return index % 2 !== 0
  }

  const isShowWhite = (index: number) => {
    const objectLength = Object.keys(zoomOutConfig || {}).length
    return index % ((objectLength + 1) * 2) <= objectLength
  }

  const columns = useMemo(() => {
    const { top, bottom } = zoomOutConfig || {}
    return concat(
      initColumns.map((item, colIndex) => ({
        ...item,
        render:
          colIndex === initColumns.length - 1 ? (...rest: Parameters<typeof item.render>) => ({ children: item.render(...rest), colSpan: 2 }) : item.render,
        onCell: (_: any, index: number) => showOnCell(index, 1, colIndex),
      })),
      top ? [{ ...top, colSpan: 0, render: top.render, onCell: (_: any, index: number) => showOnCell(index, 0) }] : [],
      bottom ? [{ ...bottom, colSpan: 0, render: bottom.render, onCell: (_: any, index: number) => showOnCell(index, 2) }] : [],
    ) as ColumnsType<Record<string, any>>
  }, [initColumns, zoomOutConfig])

  return (
    <Table
      columns={columns}
      rowClassName={(record, index) =>
        classNames(styles.table, isShowWhite(index) ? styles['table-row-white'] : styles['table-row-gray'], {
          [styles['sub-table-row']]: isHasPadding(index),
          [styles.selected]: !!rowSelection?.selectedRowKeys?.find((item) => item === record[typeof rowKey === 'string' ? rowKey : 'id']),
        })
      }
      dataSource={dataSource}
      {...rest}
      rowKey={'key'}
      pagination={false}
      rowSelection={
        rowSelection
          ? {
              ...rowSelection,
              getCheckboxProps: (record) => {
                return {
                  disabled: record.key.indexOf('bottom') !== -1 || record.key.indexOf('top') !== -1, // 只启用前两行的复选框
                }
              },
              renderCell: (value, record, index, origin) => (record.key.indexOf('bottom') !== -1 || record.key.indexOf('top') !== -1 ? null : origin),
            }
          : null
      }
    />
  )
}

export default Index
