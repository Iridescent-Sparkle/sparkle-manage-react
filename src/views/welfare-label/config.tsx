import { DatePicker, Input, Modal, Select, Space, TableColumnsType, message } from "antd"
import { useRef } from "react"
import { ActionType } from "src/components/ProTable/typing"
import dayjs from 'dayjs'
import Detail from "./Detail"
const useTableConfig = () => {
  const actionRef = useRef<ActionType>()

  const search = [
    {
      label: 'id',
      name: 'id',
      render: () => <Input allowClear placeholder="请输入id" />,
    },
    {
      label: '名称',
      name: 'categoryName',
      render: () => <Input allowClear placeholder="请输入名称" />,
    },
    {
      label: '描述',
      name: 'categoryDescription',
      render: () => <Input allowClear placeholder="请输入描述" />,
    },
    {
      label: '创建时间',
      name: 'createTime',
      render: () => (
        <DatePicker
        // defaultValue={defaultValue}
        showTime
        // locale={buddhistLocale}
        // onChange={onChange}
      />
      ),
    },
    {
      label: '更新时间',
      name: 'updateTime',
      render: () => (
        <DatePicker
        // defaultValue={defaultValue}
        showTime
        // locale={buddhistLocale}
        // onChange={onChange}
      />
      ),
    },
    {
      label: '状态',
      name: 'isDelete',
      render: () => (
        <Select
          allowClear
          placeholder="请输入"
          options={[
            { value: '1', label: '已下架' },
            { value: '2', label: '已上架' },
          ]}
        />
      ),
    },
  ]
/* 构建表单结构 */
const columns: TableColumnsType<Record<string, any>> = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '名称',
    dataIndex: 'bonusName',
    key: 'bonusName',
  },
  {
    title: '描述',
    dataIndex: 'bonusDescription',
    key: 'bonusDescription',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    key: 'updateTime',
    render: (value: number) => {
      return value ? dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
    },
  },
  {
    title: '状态',
    dataIndex: 'isFrozen',
    key: 'isFrozen',
    render: (value: number) => {
      return value?'已禁用':'启用中'
    },
  },
  {
    title: '操作',
    
    width:300,
    render: (value: number, record: any) => {
      const updata=()=>{
        actionRef.current?.reload?.()
      }
      return(   
      <Space size="middle" align="end">
        {(
          <a
            onClick={() => {
              Modal.confirm({
                title: '提示',
                content: '确定修改数据状态?',
                onOk: async () => {
                  await $.post({
                    isFrozen: !record.isFrozen,
                    id:record.id
                  }, {
                    url: '/boss/bonus/update',
                  })
                  message.success('操作成功')
                  actionRef.current?.reload?.()
                },
              })
            }}
          >
            {record.isFrozen?'启用':'禁用'}
          </a>
        )}
        <Detail reload={updata} record={record}>
            <a>修改</a>
          </Detail>
          {(
          <a
            onClick={() => {
              Modal.confirm({
                title: '提示',
                content: '确定删除当前数据?',
                onOk: async () => {
                  await $.post({
                    isDelete: true,
                    id:record.id
                  }, {
                    url: '/boss/bonus/update',
                  })
                  message.success('操作成功')
                  actionRef.current?.reload?.()
                },
              })
            }}
          >
            {'删除'}
          </a>
        )}
      </Space>
      )
    },
  },
];
  return {
    columns,
    search,
    actionRef
  }
}


export default useTableConfig