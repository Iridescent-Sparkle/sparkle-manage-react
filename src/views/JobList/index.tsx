import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Input, Modal, Select, message } from 'antd'
import dayjs from 'dayjs'
import { Fragment, useRef } from 'react'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'

function JobList() {
  const actionRef = useRef<ActionType>(null)

  const search = [
    {
      label: 'ID',
      name: 'id',
      render: () => <Input allowClear placeholder="请输入ID" />,
    },
    {
      label: '职位名称',
      name: 'jobName',
      render: () => <Input allowClear placeholder="请输入职位名称" />,
    },
    {
      label: '工作地址',
      name: 'address',
      render: () => <Input allowClear placeholder="请输入工作地址" />,
    },
    {
      label: '空缺',
      name: 'headCount',
      render: () => <Input allowClear placeholder="请输入空缺" />,
    },
    {
      label: '工作描述',
      name: 'jobDescription',
      render: () => <Input allowClear placeholder="请输入工作描述" />,
    },
    {
      label: '工作要求',
      name: 'jobRequirements',
      render: () => <Input allowClear placeholder="请输入工作要求" />,
    },
    {
      label: '是否全职',
      name: 'isFullTime',
      render: () => (
        <Select
          allowClear
          placeholder="请选择是否全职"
          options={[
            { value: false, label: '否' },
            { value: true, label: '是' },
          ]}
        />
      ),
    },
    {
      label: '是否线上工作',
      name: 'isOnsite',
      render: () => (
        <Select
          allowClear
          placeholder="请选择是否线上工作"
          options={[
            { value: false, label: '否' },
            { value: true, label: '是' },
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
      title: 'Id',
      dataIndex: 'id',
      key: 'id',

    },
    {
      title: '职位名称',

      dataIndex: 'jobName',
      key: 'jobName',
    },
    {
      title: '工作地址',

      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '最低薪资',
      width: 80,
      dataIndex: 'minSalary',
      key: 'minSalary',
    },
    {
      title: '最高薪资',

      dataIndex: 'maxSalary',
      key: 'maxSalary',
    },
    {
      title: '工作描述',

      dataIndex: 'jobDescription',
      key: 'jobDescription',
    },
    {
      title: '工作要求',

      dataIndex: 'jobRequirements',
      key: 'jobRequirements',
    },
    {
      title: '空缺',
      dataIndex: 'headCount',
      key: 'headCount',
    },
    {
      title: '网站',
      dataIndex: 'website',
      key: 'website',
    },
    {
      title: '关于',
      dataIndex: 'companyDescription',
      key: 'companyDescription',
    },
    {
      title: '全职',
      dataIndex: 'isFullTime',
      key: 'isFullTime',

      render: (value) => {
        return value ? '是' : '否'
      },
    },
    {
      title: '线上工作',
      dataIndex: 'isOnsite',
      width: 80,
      key: 'isOnsite',
      render: (value) => {
        return value ? '是' : '否'
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
      key: 'operation',
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
                      url: '/boss/job/update',
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
          url: '/boss/job/all',
        })
      }}
    />
  )
}

export default JobList
