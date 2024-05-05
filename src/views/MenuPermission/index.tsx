import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Input, Modal, message } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useRef } from 'react'
import AddAndEditModal from 'src/components/AddAndEditModal'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'

function MenuPermissions() {
  const actionRef = useRef<ActionType>(null)

  const search = [
    {
      label: 'ID',
      name: 'id',
      render: () => <Input allowClear placeholder="请输入ID" />,
    },
    {
      label: '权限代码',
      name: 'code',
      render: () => <Input allowClear placeholder="请输入名称" />,
    },
    {
      label: '权限描述',
      name: 'description',
      render: () => <Input allowClear placeholder="请输入描述" />,
    },
    {
      label: '创建时间',
      name: 'createTime',
      render: () => (
        <DatePicker.RangePicker
          showTime
        />
      ),
    },
    {
      label: '更新时间',
      name: 'updateTime',
      render: () => (
        <DatePicker.RangePicker
          showTime
        />
      ),
    },
  ]

  const formItems = [
    {
      label: '名称',
      name: 'code',
      rules: [
        {
          required: true,
          message: '请输入名称',
        },
      ],
      render: () => <Input allowClear placeholder="请输入名称" />,
    },
    {
      label: '描述',
      name: 'description',
      rules: [
        {
          required: true,
          message: '请输入描述',
        },
      ],
      render: () => <Input allowClear placeholder="请输入描述" />,
    },
  ]

  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '权限代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '权限描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      render: (value: number) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      render: (value: number) => {
        return dayjs(value).format('YYYY-MM-DD HH:mm:ss')
      },
    },
    {
      title: '操作',
      width: 300,
      render: (value: number, record: any) => {
        return (
          <Fragment>
            <Button
              type="link"
              onClick={() => {
                Modal.confirm({
                  title: '提示',
                  content: '确定修改数据状态?',
                  onOk: async () => {
                    await $.post({
                      isFrozen: !record.isFrozen,
                      id: record.id,
                    }, {
                      url: '/admin/permission/update',
                    })
                    message.success('操作成功')
                    actionRef.current?.reload?.()
                  },
                })
              }}
            >
              修改
            </Button>
            <Button
              type="link"
              onClick={() => {
                Modal.confirm({
                  title: '提示',
                  content: '确定删除当前数据?',
                  onOk: async () => {
                    await $.post({
                      id: record.id,
                    }, {
                      url: '/admin/permission/delete',
                    })
                    message.success('操作成功')
                    actionRef.current?.reload?.()
                  },
                })
              }}
            >
              删除
            </Button>
          </Fragment>
        )
      },
    },
  ]

  const onAdd = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/admin/permission/create',
    })
    actionRef.current?.reload?.()
  }

  const onEdit = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/admin/permission/update',
    })
    actionRef.current?.reload?.()
  }

  return (
    <ProTable
      actionRef={actionRef}
      columns={columns}
      search={search}
      scroll={{ x: 'max-content' }}
      rowKey="id"
      pagination={{
        pageSize: 15,
        current: 1,
      }}
      sticky={{
        offsetHeader: 0,
        offsetScroll: 0,
      }}
      request={async (params) => {
        return await $.post(params, {
          url: '/admin/permission/all',
        })
      }}
      searchAddButton={(
        <AddAndEditModal
          title="权限"
          formItems={formItems}
          onAdd={onAdd}
          onEdit={onEdit}
        >
          <Button type="primary" style={{ marginLeft: 24 }}>新增</Button>
        </AddAndEditModal>
      )}
    />
  )
}

export default MenuPermissions
