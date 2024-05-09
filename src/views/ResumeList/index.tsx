import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Input, Modal, message } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useRef } from 'react'
import PageContainer from 'src/components/Container/PageContainer'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'

function ResumeList() {
  const actionRef = useRef<ActionType>(null)

  const search = [
    {
      label: 'ID',
      name: 'id',
      render: () => <Input allowClear placeholder="请输入ID" />,
    },
    {
      label: '职业',
      name: 'occupation',
      render: () => <Input allowClear placeholder="请输入职业" />,
    },
    {
      label: '地址',
      name: 'address',
      render: () => <Input allowClear placeholder="请输入地址" />,
    },
    {
      label: '联系电话',
      name: 'phone',
      render: () => <Input allowClear placeholder="请输入联系电话" />,
    },
    {
      label: '邮箱',
      name: 'email',
      render: () => <Input allowClear placeholder="请输入邮箱" />,
    },
    {
      label: '个人总结',
      name: 'summary',
      render: () => <Input allowClear placeholder="请输入个人总结" />,
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
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '职业',
      dataIndex: 'occupation',
      key: 'occupation',
      render: (value: string) => {
        return value || '-'
      },
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
      render: (value: string) => {
        return value || '-'
      },
    },
    {
      title: '联系电话',
      dataIndex: 'phone',
      key: 'phone',
      render: (value: string) => {
        return value || '-'
      },
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
      render: (value: string) => {
        return value || '-'
      },
    },
    {
      title: '最低薪资',
      width: 80,
      dataIndex: 'minSalary',
      key: 'minSalary',
      render: (value: string) => {
        return value || '-'
      },
    },
    {
      title: '最高薪资',
      dataIndex: 'maxSalary',
      key: 'maxSalary',
      render: (value: string) => {
        return value || '-'
      },
    },
    {
      title: '个人总结',
      dataIndex: 'summary',
      key: 'summary',
      render: (value: string) => {
        return value || '-'
      },
    },
    {
      title: '简历pdf',
      dataIndex: 'resume',
      key: 'resume',
      render: (value) => {
        return value
          ? (
            <a href={value.accessUrl}>下载</a>
            )
          : '-'
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
        return value ? '已关闭' : '已开启'
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
                  content: '确定修改数据状态?',
                  onOk: async () => {
                    await $.post({
                      isFrozen: !record.isFrozen,
                      id: record.id,
                    }, {
                      url: '/genius/profile/update',
                    })
                    message.success('操作成功')
                    actionRef.current?.reload?.()
                  },
                })
              }}
            >
              {record.isFrozen ? '开启' : '关闭'}
            </Button>
          </Fragment>
        )
      },
    },
  ]

  return (
    <PageContainer title="简历列表" description="简历列表页面">
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
            url: '/genius/profile/all',
          })
        }}
      />
    </PageContainer>

  )
}

export default ResumeList
