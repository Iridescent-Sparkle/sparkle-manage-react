import { Col, Form, Modal } from 'antd'
import type { ReactElement } from 'react'
import { Fragment, useMemo, useState } from 'react'
import type { Item } from 'src/components/ProTable/Search'

interface Props {
  title?: string
  data?: Record<string, any>
  children: ReactElement
  formItems: Item[]
  onRefresh?: () => void
  onAdd?: (params: Record<string, any>) => void
  onEdit?: (params: Record<string, any>) => void
}

function AddAndEditModal(props: Props) {
  const { title, children, data, formItems, onRefresh, onAdd, onEdit } = props

  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)

  const handleModalOpen = () => {
    form.setFieldsValue(data)
    setVisible(true)
  }

  const handleModalClose = () => {
    setVisible(false)
    form.resetFields()
  }

  const handleConfirmClick = async () => {
    const values = await form.validateFields()
    handleModalClose()
    data
      ? onEdit?.({
        id: data.id,
        ...values,
      })
      : onAdd?.(values)
    onRefresh?.()
  }

  const list = useMemo(() => {
    const list = formItems.map((item) => {
      const shouldUpdate = item.shouldUpdate || false
      return (
        <Col key={item.name}>
          {shouldUpdate
            ? (
              <Form.Item shouldUpdate={true} noStyle>
                {item.render}
              </Form.Item>
              )
            : (
              <Form.Item label={item.label} labelCol={{ span: 4 }} name={item.name} initialValue={item.initialValue} rules={item.rules}>
                {item.render(form)}
              </Form.Item>
              )}
        </Col>
      )
    })
    return list
  }, [formItems])

  return (
    <Fragment>
      <children.type {...children.props} onClick={handleModalOpen}></children.type>
      <Modal open={visible} title={data ? `修改${title}` : `新增${title}`} onCancel={handleModalClose} onOk={handleConfirmClick} destroyOnClose>
        <Form form={form}>
          {list}
        </Form>
      </Modal>
    </Fragment>
  )
}

export default AddAndEditModal
