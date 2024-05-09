import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Image, Input, Modal, Select, message } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useRef } from 'react'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'
import PageContainer from 'src/components/Container/PageContainer'

function UserList() {
  const actionRef = useRef<ActionType>(null)

  const search = [
    {
      label: 'ID',
      name: 'id',
      render: () => <Input allowClear placeholder="请输入ID" />,
    },
    {
      label: '手机号',
      name: 'username',
      render: () => <Input allowClear placeholder="请输入手机号" />,
    },
    {
      label: '昵称',
      name: 'nickname',
      render: () => <Input allowClear placeholder="请输入昵称" />,
    },
    {
      label: '状态',
      name: 'isFrozen',
      render: () => (
        <Select
          allowClear
          placeholder="请输入"
          options={[
            { value: false, label: '启用中' },
            { value: true, label: '禁用中' },
          ]}
        />
      ),
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

  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '手机号',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickname',
      key: 'nickname',
    },
    {
      title: '头像',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (value: string) => {
        return <Image width={100} src={value} />
      },
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
      title: '状态',
      dataIndex: 'isFrozen',
      key: 'isFrozen',
      render: (value: number) => {
        return value ? '禁用中' : '启用中'
      },
    },
    {
      title: '操作',
      render: (_, record: any) => {
        return (
          <Fragment>
            <Button
              type="link"
              onClick={() => {
                Modal.confirm({
                  title: '提示',
                  content: '确定修改用户状态?',
                  onOk: async () => {
                    await $.post({
                      isFrozen: !record.isFrozen,
                      id: record.id,
                    }, {
                      url: '/admin/custom-user/update',
                    })
                    message.success('操作成功')
                    actionRef.current?.reload?.()
                  },
                })
              }}
            >
              {record.isFrozen ? '启用' : '禁用'}
            </Button>
          </Fragment>
        )
      },
    },
  ]

  return (
    <PageContainer title="用户列表" description="C端用户列表页面">
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
            url: '/admin/custom-user/all',
          })
        }}
      />
    </PageContainer>

  )
}

export default UserList
