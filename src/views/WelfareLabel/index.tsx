import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Input, Modal, Select, message } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useRef } from 'react'
import AddAndEditModal from 'src/components/AddAndEditModal'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'

function WelfareLabel() {
  const actionRef = useRef<ActionType>(null)

  const onAdd = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/boss/bonus/create',
    })
    actionRef.current?.reload?.()
  }

  const onEdit = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/boss/bonus/update',
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
      label: '福利名称',
      name: 'bonusName',
      render: () => <Input allowClear placeholder="请输入福利名称" />,
    },
    {
      label: '福利描述',
      name: 'bonusDescription',
      render: () => <Input allowClear placeholder="请输入福利描述" />,
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
      label: '福利名称',
      name: 'bonusName',
      rules: [
        { required: true, message: '请输入福利名称' },
      ],
      render: () => <Input allowClear placeholder="请输入福利名称" />,
    },
    {
      label: '福利描述',
      name: 'bonusDescription',
      render: () => <Input allowClear placeholder="请输入福利描述" />,
    },
  ]

  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '福利名称',
      dataIndex: 'bonusName',
      key: 'bonusName',
    },
    {
      title: '福利描述',
      dataIndex: 'bonusDescription',
      width: 100,
      key: 'bonusDescription',
      render: (value: string) => {
        return value || '-'
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
            <AddAndEditModal
              title="福利标签"
              formItems={formItems}
              onEdit={onEdit}
              data={record}
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
                      url: '/boss/bonus/update',
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
                  content: '确定删除当前数据?',
                  onOk: async () => {
                    await $.post({
                      id: record.id,
                      isDelete: true,
                    }, {
                      url: '/boss/bonus/update',
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
          url: '/boss/bonus/all',
        })
      }}
      searchAddButton={(
        <AddAndEditModal
          title="福利标签"
          formItems={formItems}
          onAdd={onAdd}
          onEdit={onEdit}
        >
          <Button type="primary">新增</Button>
        </AddAndEditModal>
      )}
    />
  )
}

export default WelfareLabel
