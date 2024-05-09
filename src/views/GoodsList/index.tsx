import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Input, Modal, Select, Switch, message } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useRef } from 'react'
import AddAndEditModal from 'src/components/AddAndEditModal'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'
import PageContainer from 'src/components/Container/PageContainer'

function GoodsList() {
  const actionRef = useRef<ActionType>(null)

  const onAdd = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/boss/integral/create',
    })
    actionRef.current?.reload?.()
  }

  const onEdit = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/boss/integral/update',
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
      label: '积分数量',
      name: 'integralNum',
      render: () => <Input allowClear placeholder="请输入积分数量" />,
    },
    {
      label: '充值金额',
      name: 'price',
      render: () => <Input allowClear placeholder="请输入充值金额" />,
    },
    {
      label: '默认展示',
      name: 'isDefault',
      render: () => (
        <Select
          allowClear
          placeholder="请选择是否默认展示"
          options={[
            { value: false, label: '否' },
            { value: true, label: '是' },
          ]}
        />
      ),
    },
    {
      label: '状态',
      name: 'isFrozen',
      render: () => (
        <Select
          allowClear
          placeholder="请选择状态"
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
      label: '积分数量',
      name: 'integralNum',
      rules: [
        { required: true, message: '请输入积分数量' },
      ],
      render: () => <Input allowClear placeholder="请输入积分数量" />,
    },
    {
      label: '充值金额',
      name: 'price',
      rules: [
        { required: true, message: '请输入充值金额' },
      ],
      render: () => <Input allowClear placeholder="请输入充值金额" />,
    },
    {
      label: '默认展示',
      name: 'isDefault',
      rules: [
        { required: true, message: '请选择是否默认展示' },
      ],
      render: () => (
        <Select
          allowClear
          placeholder="请选择是否默认展示"
          options={[
            { value: false, label: '否' },
            { value: true, label: '是' },
          ]}
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
      title: '积分数量',
      dataIndex: 'integralNum',
      key: 'integralNum',
    },
    {
      title: '充值金额',
      dataIndex: 'price',
      key: 'price',
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
      title: '默认展示',
      dataIndex: 'isDefault',
      key: 'isDefault',
      render: (value: boolean) => (
        <Switch
          value={value}
          checkedChildren="是"
          unCheckedChildren="否"
          onChange={async (value) => {
            await $.post({
              isDefault: value,
            }, {
              url: '/boss/integral/update',
            })
            actionRef.current?.reload?.()
          }}
        />
      ),
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
              title="商品"
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
                      url: '/boss/integral/update',
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
                      url: '/boss/integral/update',
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
    <PageContainer title="商品列表" description="商品列表页面">
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
            url: '/boss/integral/all',
          })
        }}
        searchAddButton={(
          <AddAndEditModal
            title="商品"
            formItems={formItems}
            onAdd={onAdd}
            onEdit={onEdit}
          >
            <Button type="primary">新增</Button>
          </AddAndEditModal>
        )}
      />
    </PageContainer>

  )
}

export default GoodsList
