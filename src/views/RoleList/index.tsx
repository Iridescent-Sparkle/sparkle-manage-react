import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Input, Modal, Select, message } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useEffect, useRef, useState } from 'react'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'
import RoleAddAndEditModal from '../../components/AddAndEditModal/index.tsx'

function RoleList() {
  const actionRef = useRef<ActionType>(null)

  const [permissionsOptions, setPermissionsOptions] = useState([])

  const getInitData = async () => {
    const { data } = await $.post({
      pageSize: 9999,
    }, {
      url: '/admin/permission/all',
    })

    setPermissionsOptions(data.data.map((item: any) => {
      return {
        label: item.description,
        value: item.id,
      }
    }))
  }
  useEffect(() => {
    getInitData()
  }, [])
  const onAdd = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/admin/role/create',
    })
    actionRef.current?.reload?.()
  }

  const onEdit = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/admin/role/update',
    })
    actionRef.current?.reload?.()
  }

  const search = [
    {
      label: 'id',
      name: 'id',
      render: () => <Input allowClear placeholder="请输入id" />,
    },
    {
      label: '角色名称',
      name: 'name',
      render: () => <Input allowClear placeholder="请输入名称" />,
    },
    {
      label: '角色权限',
      name: 'permissions',
      render: () => (
        <Select
          mode="multiple"
          allowClear
          options={permissionsOptions}
          placeholder="请选择角色权限"
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
  ]

  const formItems = [
    {
      label: '角色名称',
      name: 'name',
      rules: [
        { required: true, message: '请输入角色名称' },
      ],
      render: () => <Input allowClear placeholder="请输入名称" />,
    },
    {
      label: '角色权限',
      name: 'permissions',
      rules: [
        { required: true, message: '请选择角色权限' },
      ],
      render: () => (
        <Select
          mode="multiple"
          allowClear
          options={permissionsOptions}
          placeholder="请选择角色权限"
        />
      ),
    },
  ]

  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '角色权限',
      dataIndex: 'permissions',
      key: 'permissions',
      render: (value) => {
        return value?.map((item: any) => {
          return <div key={item}>{item.description}</div>
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
          permissions: record.permissions.map((item: any) => item.id),
        }

        return (
          <Fragment>
            <RoleAddAndEditModal
              title="权限"
              formItems={formItems}
              onAdd={onAdd}
              onEdit={onEdit}
              data={formatRecord}
            >
              <Button
                type="link"
              >
                修改
              </Button>
            </RoleAddAndEditModal>
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
                      url: '/admin/role/update',
                    })
                    message.success('操作成功')
                    actionRef.current?.reload?.()
                  },
                })
              }}
            >
              {record.isFrozen ? '启用' : '禁用'}
            </Button>
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
                      url: '/admin/role/delete',
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
          url: '/admin/role/all',
        })
      }}
      searchAddButton={(
        <RoleAddAndEditModal
          title="权限"
          formItems={formItems}
          onAdd={onAdd}
          onEdit={onEdit}
        >
          <Button type="primary" >新增</Button>
        </RoleAddAndEditModal>
      )}
    />
  )
}

export default RoleList
