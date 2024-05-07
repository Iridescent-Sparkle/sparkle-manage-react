import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Input, Select } from 'antd'
import { Fragment, useRef } from 'react'
import AddAndEditModal from 'src/components/AddAndEditModal'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'

function OrderList() {
  const actionRef = useRef<ActionType>(null)

  const onEdit = () => {

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

  const formItems = []
  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '订单标题',
      dataIndex: 'subject',
      key: 'subject',
    },
    {
      title: '商品描述',
      dataIndex: 'body',
      key: 'body',
    },
    {
      title: '通知时间',
      dataIndex: 'notify_time',
      key: 'notify_time',
    },
    {
      title: '通知类型',
      dataIndex: 'notify_type',
      key: 'notify_type',
    },
    {
      title: '通知校验ID',
      dataIndex: 'notify_id',
      key: 'notify_id',
    },
    {
      title: '签名类型',
      dataIndex: 'sign_type',
      key: 'sign_type',
    },
    {
      title: '签名',
      dataIndex: 'sign',
      key: 'sign',
    },
    {
      title: '支付宝交易号',
      dataIndex: 'trade_no',
      key: 'trade_no',
    },
    {
      title: '商户订单号',
      dataIndex: 'out_trade_no',
      key: 'out_trade_no',
    },
    {
      title: '商户业务号',
      dataIndex: 'out_biz_no',
      key: 'out_biz_no',
    },
    {
      title: '交易状态',
      dataIndex: 'trade_status',
      key: 'trade_status',
    },
    {
      title: '订单金额',
      dataIndex: 'total_amount',
      key: 'total_amount',
    },
    {
      title: '实收金额',
      dataIndex: 'receipt_amount',
      key: 'receipt_amount',
    },
    {
      title: '付款金额',
      dataIndex: 'buyer_pay_amount',
      key: 'buyer_pay_amount',
    },
    {
      title: '总退款金额',
      dataIndex: 'refund_fee',
      key: 'refund_fee',
    },
    {
      title: '实际退款金额',
      dataIndex: 'send_back_fee',
      key: 'send_back_fee',
    },
    {
      title: '交易创建时间',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
    },
    {
      title: '交易付款时间',
      dataIndex: 'gmt_payment',
      key: 'gmt_payment',
    },
    {
      title: '交易退款时间',
      dataIndex: 'gmt_refund',
      key: 'gmt_refund',
    },
    {
      title: '交易结束时间',
      dataIndex: 'gmt_close',
      key: 'gmt_close',
    },
    {
      title: '支付金额信息',
      dataIndex: 'fund_bill_list',
      key: 'fund_bill_list',
    },

    {
      title: '操作',
      render: (_, record: any) => {
        return (
          <Fragment>
            <AddAndEditModal
              title="权限"
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
          url: '/boss/order/all',
        })
      }}
    />
  )
}

export default OrderList
