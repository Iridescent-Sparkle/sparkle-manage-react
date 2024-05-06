import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Input, Modal, Select, message,Image } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useEffect, useRef, useState } from 'react'
import AddAndEditModal from 'src/components/AddAndEditModal'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'

function AdminUserList() {
  const actionRef = useRef<ActionType>(null)

  const [roleOptions, setRoleOptions] = useState([])

  const getInitData = async () => {
    const { data } = await $.post({
      pageSize: 9999,
    }, {
      url: '/admin/role/all',
    })

    setRoleOptions(data.data.map((item: any) => {
      return {
        label: item.name,
        value: item.id,
      }
    }))
  }
  
  useEffect(() => {
    getInitData()
  }, [])

  const onEdit = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/admin/user/update',
    })
    actionRef.current?.reload?.()
  }

  const search = [
    {
      label: 'ID',
      name: 'id',
      render: () => <Input allowClear placeholder="请输入ID" />,
    },
    {
      label: '手机号',
      name: 'username',
      render: () => <Input allowClear placeholder="请输入名称" />,
    },
    {
      label: '昵称',
      name: 'nickname',
      render: () => <Input allowClear placeholder="请输入描述" />,
    },
    {
      label: '角色权限',
      name: 'roles',
      render: () => (
        <Select
          mode="multiple"
          allowClear
          options={roleOptions}
          placeholder="请选择角色权限"
        />
      ),
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

  const formItems = [
    {
      label: '角色',
      name: 'roles',
      rules: [
        { required: true, message: '请选择角色' },
      ],
      render: () => (
        <Select
          mode="multiple"
          allowClear
          options={roleOptions}
          placeholder="请选择角色"
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
      title: '角色权限',
      dataIndex: 'roles',
      key: 'roles',
      render: (value) => {
        return value?.map((item: any) => {
          return <div key={item}>{item.name}</div>
        })
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
        const formatRecord = {
          ...record,
          roles: record.roles.map((item: any) => item.id),
        }
        return (
          <Fragment>
            <AddAndEditModal
              title="用户"
              formItems={formItems}
              onEdit={onEdit}
              data={formatRecord}
            >
              <Button
                type="link"
              >
                修改
              </Button>
            </AddAndEditModal>
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
                      url: '/admin/user/update',
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
          url: '/admin/user/all',
        })
      }}
    />
  )
}

export default AdminUserList
