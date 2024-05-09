import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Image, Input, Modal, Select, message } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useRef } from 'react'
import AddAndEditModal from 'src/components/AddAndEditModal'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'
import PageContainer from 'src/components/Container/PageContainer'

function CompanyAuth() {
  const actionRef = useRef<ActionType>(null)

  const onEdit = async (params: Record<string, any>) => {
    await $.post(params, {
      url: '/boss/company/update',
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
      label: '公司名称',
      name: 'companyName',
      render: () => <Input allowClear placeholder="请输入公司名称" />,
    },
    {
      label: '公司描述',
      name: 'companyDesc',
      render: () => <Input allowClear placeholder="请输入公司描述" />,
    },
    {
      label: '审核状态',
      name: 'status',
      render: () => (
        <Select
          allowClear
          placeholder="请选择审核状态"
          options={[
            { value: 1, label: '审核通过' },
            { value: 0, label: '待审核' },
            { value: -1, label: '审核失败' },
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
      label: 'ID',
      name: 'id',
      render: () => <Input disabled allowClear placeholder="请输入ID" />,
    },
    {
      label: '公司名称',
      name: 'companyName',
      render: () => <Input disabled allowClear placeholder="请输入公司名称" />,
    },
    {
      label: '公司描述',
      name: 'companyDesc',
      render: () => <Input disabled allowClear placeholder="请输入公司描述" />,
    },
    {
      label: '审核状态',
      name: 'status',
      rules: [
        {
          required: true,
          message: '请选择审核状态',
        },
      ],
      render: () => (
        <Select
          allowClear
          placeholder="请选择审核状态"
          options={[
            { value: 1, label: '审核通过' },
            { value: -1, label: '审核失败' },
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
      title: '公司名称',
      dataIndex: 'companyName',
      key: 'companyName',
    },
    {
      title: '公司头像',
      dataIndex: 'companyAvatar',
      key: 'companyAvatar',
      render: (value: string) => {
        return <Image width={100} src={value} />
      },
    },
    {
      title: '营业执照',
      dataIndex: 'companyLicense',
      key: 'companyLicense',
      render: (value: string) => {
        return <Image width={100} src={value} />
      },
    },
    {
      title: '公司描述',
      dataIndex: 'companyDesc',
      key: 'companyDesc',
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
      title: '审核状态',
      dataIndex: 'status',
      key: 'status',
      render: (value) => {
        const STATUS_MAP = {
          '0': '待审核',
          '1': '审核通过',
          '-1': '审核失败',
        } as Record<any, string>

        return STATUS_MAP[value]
      },
    },
    {
      title: '操作',
      render: (_, record: any) => {
        return (
          <Fragment>
            <AddAndEditModal
              title="用户"
              formItems={formItems}
              onEdit={onEdit}
              data={record}
            >
              <Button
                type="link"
              >
                审核
              </Button>
            </AddAndEditModal>
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
                      url: '/boss/company/update',
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
    <PageContainer title="企业认证" description="企业认证页面">
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
            url: '/boss/company/all',
          })
        }}
      />
    </PageContainer>

  )
}

export default CompanyAuth
