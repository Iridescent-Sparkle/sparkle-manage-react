import type { TableColumnsType } from 'antd'
import { Button, Input, Select } from 'antd'
import { useRef } from 'react'
import RoleAddAndEditModal from 'src/components/AddAndEditModal/index.tsx'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'
import PageContainer from 'src/components/Container/PageContainer'

function UserList() {
  const actionRef = useRef<ActionType>(null)

  const onEdit = async (params: any) => {
    await $.post(params, {
      url: '/admin/trade-control/update',
    })
    actionRef.current?.reload?.()
  }

  const formItems = [{
    label: 'Id',
    name: 'id',
    render: () => <Input disabled placeholder="请输入Id" />,
  }, {
    label: '端',
    name: 'channel',
    render: () => <Input disabled placeholder="请输入端" />,
  }, {
    label: '是否限制',
    name: 'isLimit',
    rules: [
      { required: true, message: '请选择是否限制' },
    ],
    render: () => (
      <Select
        allowClear
        placeholder="请选择是否限制"
        options={[
          { value: false, label: '否' },
          { value: true, label: '是' },
        ]}
      />
    ),
  }, {
    label: '起始版本',
    name: 'startVersion',
    rules: [
      { required: true, message: '请输入起始版本' },
      { pattern: /^(\d+)\.(\d+)\.(\d+)$/, message: '请输入正确的版本号' },
    ],
    render: () => <Input placeholder="请输入起始版本" />,
  }, {
    label: '终止版本',
    name: 'endVersion',
    rules: [
      { required: true, message: '请输入终止版本' },
      { pattern: /^(\d+)\.(\d+)\.(\d+)$/, message: '请输入正确的版本号' },
    ],
    render: () => <Input placeholder="请输入终止版本" />,
  }]

  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: '端',
      dataIndex: 'channel',
      key: 'channel',
    },
    {
      title: '是否限制',
      dataIndex: 'isLimit',
      key: 'isLimit',
      render: (_, record) => {
        return record.isLimit ? '是' : '否'
      },
    },
    {
      title: '起止版本',
      dataIndex: 'version',
      key: 'version',
      render: (_, record) => {
        return `${record.startVersion}-${record.endVersion}`
      },
    },
    {
      title: '操作',
      render: (_: any, record: any) => {
        return (
          <RoleAddAndEditModal
            title="权限"
            formItems={formItems}
            onEdit={onEdit}
            data={record}
          >
            <Button type="link">
              修改
            </Button>
          </RoleAddAndEditModal>
        )
      },
    },
  ]

  return (
    <PageContainer title="交易控制" description="交易控制页面">
      <ProTable
        actionRef={actionRef}
        columns={columns}
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
            url: '/admin/trade-control/all',
          })
        }}
      />
    </PageContainer>

  )
}

export default UserList
