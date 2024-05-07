import { Col, Form, FormInstance, Modal } from 'antd'
import type { ReactElement } from 'react'
import { Fragment, useState } from 'react'
import type { Item } from 'src/components/ProTable/Search'

interface Props {
  title?: string
  data?: Record<string, any>
  children: ReactElement
  formItems: Item[] | ((form: FormInstance, params?: Record<string, any>) => Promise<Item[] | undefined>)
  onRefresh?: () => void
  onAdd?: (params: Record<string, any>) => void
  onEdit?: (params: Record<string, any>) => void
}

function AddAndEditModal(props: Props) {
  const { title, children, data, formItems, onRefresh, onAdd, onEdit } = props

  const [form] = Form.useForm()

  const [visible, setVisible] = useState(false)
  const [formList, setFormList] = useState<Item[]>([])

  const handleModalOpen = async () => {
    await getListData()
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
        ...data,
        ...values,
      })
      : onAdd?.(values)
    onRefresh?.()
  }

  const getListData = async () => {
    let formList = [] as Item[]

    if (formItems instanceof Function) {
      formList = await formItems(form, data) || []
    } else {
      formList = formItems
    }
    setFormList(formList)
  }

  return (
    <Fragment>
      <children.type {...children.props} onClick={handleModalOpen}></children.type>
      <Modal open={visible} title={data ? `修改${title}` : `新增${title}`} onCancel={handleModalClose} onOk={handleConfirmClick} destroyOnClose>
        <Form form={form}>
          {
            formList.map((item: any) => {
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
                        {item.render(form, data)}
                      </Form.Item>
                    )}
                </Col>
              )
            })
          }
        </Form>
      </Modal>
    </Fragment>
  )
}

export default AddAndEditModal
