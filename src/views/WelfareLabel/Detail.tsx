import { Button, Form, Input, Modal, message } from 'antd'
import React, { cloneElement, useEffect, useState } from 'react'

function Detail(props: { children: React.ReactElement, record?: any, reload: any }) {
  const { children, record, reload } = props
  const [visible, setVisible] = useState(false)
  const [form] = Form.useForm()
  const handleCancel = () => {
    setVisible(!visible)
  }
  useEffect(() => {
    if (visible && record) {
      form.setFieldsValue({
        ...record,
      })
    }
  }, [visible, record])
  const onOk = async () => {
    try {
      const values = await form.validateFields()
      if (record) {
        await $.post({
          id: record.id,
          ...values,
        }, {
          url: '/boss/bonus/update',
        })
      }
      else {
        await $.post({
          ...values,
        }, {
          url: '/boss/bonus/update',
        })
      }
      setVisible(false)
      reload?.()
    }
    catch {
      message.error('报错')
    }
  }
  return (
    <>
      {cloneElement(children, { onClick: () => setVisible(!visible) })}
      <Modal
        destroyOnClose
        width={800}
        title="详情"
        footer={[
          <Button key="back" onClick={handleCancel}>
            返回
          </Button>,
          <Button type="primary" onClick={onOk}>
            确认
          </Button>,
        ]}
        open={visible}
        onCancel={handleCancel}
      >
        <Form form={form}>
          <Form.Item label="名称" name="bonusName">
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="bonusDescription">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  )
}
export default Detail
