import type { TableColumnsType } from 'antd'
import { Button, DatePicker, Input, InputNumber, message } from 'antd'
import type { FormInstance } from 'antd/lib'
import dayjs from 'dayjs'
import { useRef } from 'react'
import AddAndEditModal from 'src/components/AddAndEditModal'
import ProTable from 'src/components/ProTable/index.tsx'
import type { ActionType } from 'src/components/ProTable/typing'
import Visible from 'src/components/Visible'
import PageContainer from 'src/components/Container/PageContainer'

function OrderList() {
  const actionRef = useRef<ActionType>(null)

  const onEdit = async (params: Record<string, any>) => {
    const passback_params = JSON.parse(params.passback_params)
    const refundIntergal = Math.floor(params.refund_amount / params.receipt_amount * passback_params.integral)

    await Promise.all([
      $.post({
        refund_amount: params.refund_amount,
        trade_no: params.trade_no,
        refund_reason: params.refund_reason,
      }, {
        url: '/boss/order/refund',
      }),
      $.post({
        userId: passback_params.user_id,
        integral: refundIntergal,
      }, {
        url: '/boss/integral/consume',
      }),
      $.post({
        userId: passback_params.user_id,
        integral: refundIntergal,
        type: 'refund',
        isConsume: false,
      }, {
        url: '/boss/consume/create',
      }),
    ])

    actionRef.current?.reload?.()
  }

  const search = [
    {
      label: 'ID',
      name: 'id',
      render: () => <Input allowClear placeholder="请输入ID" />,
    },
    {
      label: '订单标题',
      name: 'subject',
      render: () => <Input allowClear placeholder="请输入订单标题" />,
    },
    {
      label: '商品描述',
      name: 'body',
      render: () => <Input allowClear placeholder="请输入商品描述" />,
    },
    {
      label: '通知时间',
      name: 'notify_time',
      render: () => (
        <DatePicker.RangePicker
          showTime
        />
      ),
    },
    {
      label: '交易创建时间',
      name: 'gmt_create',
      render: () => (
        <DatePicker.RangePicker
          showTime
        />
      ),
    },
  ]

  const formItems = async (form: FormInstance, params: any) => {
    const passback_params = JSON.parse(params.passback_params)

    const { data } = await $.post({
      userId: passback_params.user_id,
    }, {
      url: '/user/info',
    })

    const userIntegral = Number.parseInt(data.integral, 10)

    const diffIntegral = userIntegral - passback_params.integral

    if (diffIntegral < 0) {
      message.error('当前用户剩余积分不足，不支持退款')
      return Promise.reject()
    }

    form.setFieldValue('refund_amount', passback_params.price)

    return [
      {
        label: '订单标题',
        name: 'subject',
        render: () => <Input disabled placeholder="请输入订单标题" />,
      },
      {
        label: '商品描述',
        name: 'body',
        render: () => <Input disabled placeholder="请输入商品描述" />,
      },
      {
        label: '订单号',
        name: 'trade_no',
        render: () => <Input disabled placeholder="请输入退款金额" />,
      },
      {
        label: '实收金额',
        name: 'receipt_amount',
        render: () => <Input disabled placeholder="请输入商品描述" />,
      },
      {
        label: '退款金额',
        name: 'refund_amount',
        rules: [
          {
            required: true,
            message: '请输入退款金额',
          },
        ],
        render: (_: any, data: any) => <InputNumber precision={2} max={Number.parseInt(data.receipt_amount, 10)} placeholder="请输入退款金额" />,
      },
      {
        label: '退款原因',
        name: 'refund_reason',
        rules: [
          {
            required: true,
            message: '请输入退款原因',
          },
        ],
        render: () => <Input.TextArea maxLength={200} allowClear placeholder="请输入退款原因" />,
      },
    ]
  }

  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width: 100,
      fixed: 'left',
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
      render: value => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '通知类型',
      dataIndex: 'notify_type',
      key: 'notify_type',
    },
    {
      title: '业务信息',
      dataIndex: 'passback_params',
      key: 'passback_params',
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
      title: '交易状态',
      dataIndex: 'trade_status',
      key: 'trade_status',
    },
    {
      title: '订单金额',
      dataIndex: 'total_amount',
      key: 'total_amount',
      width: 100,
      render: value => value ? `${value}元` : '-',
    },
    {
      title: '实收金额',
      dataIndex: 'receipt_amount',
      key: 'receipt_amount',
      width: 100,
      render: value => value ? `${value}元` : '-',
    },
    {
      title: '付款金额',
      dataIndex: 'buyer_pay_amount',
      key: 'buyer_pay_amount',
      width: 100,
      render: value => value ? `${value}元` : '-',
    },
    {
      title: '总退款金额',
      dataIndex: 'refund_fee',
      key: 'refund_fee',
      width: 120,
      render: value => value ? `${value}元` : '-',
    },
    {
      title: '实际退款金额',
      dataIndex: 'send_back_fee',
      key: 'send_back_fee',
      width: 120,
      render: value => value ? `${value}元` : '-',
    },
    {
      title: '交易创建时间',
      dataIndex: 'gmt_create',
      key: 'gmt_create',
      width: 120,
      render: value => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '交易付款时间',
      dataIndex: 'gmt_payment',
      key: 'gmt_payment',
      render: value => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '交易退款时间',
      dataIndex: 'gmt_refund',
      key: 'gmt_refund',
      width: 120,
      render: value => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '交易结束时间',
      dataIndex: 'gmt_close',
      key: 'gmt_close',
      width: 120,
      render: value => value ? dayjs(value).format('YYYY-MM-DD HH:mm:ss') : '-',
    },
    {
      title: '支付金额信息',
      dataIndex: 'fund_bill_list',
      key: 'fund_bill_list',
    },
    {
      title: '操作',
      fixed: 'right',
      width: 100,
      render: (_, record: any) => {
        return (
          <Visible visible={record.trade_status === 'TRADE_SUCCESS'}>
            <AddAndEditModal
              title="订单信息"
              formItems={formItems}
              onEdit={onEdit}
              data={record}
            >
              <Button
                type="link"
              >
                退款
              </Button>
            </AddAndEditModal>
          </Visible>
        )
      },
    },
  ]

  return (
    <PageContainer title="订单列表" description="订单列表页面">
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
    </PageContainer>

  )
}

export default OrderList
