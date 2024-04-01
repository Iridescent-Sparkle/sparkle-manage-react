/*
 * @Date: 2022-05-30 09:43:44
 * @Description: 搜索组件
 */
import React, { useMemo, useState, cloneElement, useEffect } from 'react'
import { DownOutlined, UpOutlined } from '@ant-design/icons'
import { Form, Row, Col, FormInstance } from 'antd'
import ButtonLoading from '../../components/ButtonLoading'
import Visible from '../../components/Visible'
import { cleanObject, getQueryVariable } from './utils'

export type Item = {
  label: string
  name: string
  render: (form?: FormInstance) => React.ReactElement
  /** 初始化的值 */
  initialValue?: any
  rules?: any
  shouldUpdate?: boolean
  transform?: (value: any) => any
}

type Props = {
  search: Item[]
  clearInitialValue?: boolean
  /** 是否使用展开功能 */
  isExpand?: boolean
  /** 是否展示查询按钮 */
  showButton?: boolean
  /** 搜索框文字 */
  searchText?: string
  form?: FormInstance
  formCol?: [number, number]
  formValueChange?: (v: any) => void
}

function getButtonSpan(len: number) {
  if (len % 3 === 0) {
    return 24
  }
  if (len % 3 === 1) {
    return 16
  }
  if (len % 3 === 2) {
    return 8
  }
  return 24
}

const Index = (props: Props) => {
  const { formCol, search, clearInitialValue = false, isExpand = false, showButton = true, searchText = '搜索', form, formValueChange } = props
  const [searchTimes, setSearchTimes] = useState<number>(0)
  const [expand, setExpand] = useState(false)

  const list = useMemo(() => {
    const list = search.map((item) => {
      const shouldUpdate = item.shouldUpdate || false
      return (
        <Col key={item.name} span={8}>
          {shouldUpdate ? (
            <Form.Item shouldUpdate={true} noStyle>
              {item.render}
            </Form.Item>
          ) : (
            <Form.Item label={item.label} name={item.name} initialValue={item.initialValue} rules={item.rules}>
              {item.render(form)}
            </Form.Item>
          )}
        </Col>
      )
    })
    // 处理是否展开逻辑
    if (isExpand) {
      return list.map((item, i) => {
        // eslint-disable-next-line no-nested-ternary
        const display = expand ? 'block' : i < 2 ? 'block' : 'none'
        return cloneElement(item, { style: { display } })
      })
    }
    return list
  }, [search, isExpand, expand])

  const onRefresh = () => {
    setSearchTimes((v) => ++v)
    const formValue = { ...form.getFieldsValue() }
    search.forEach((item) => {
      if (item?.transform && formValue[item.name]) {
        formValue[item.name] = item.transform(formValue[item.name])
      }
    })
    formValueChange({ ...formValue, searchTimes })
  }

  const onReset = () => {
    return new Promise((resolve) => {
      if (clearInitialValue) {
        const values = search.reduce((obj, item) => ({ ...obj, [item.name]: undefined }), {})
        form.setFieldsValue(values)
      } else {
        form.resetFields()
      }
      setTimeout(async () => {
        try {
          formValueChange({})
        } finally {
          resolve(null)
        }
      })
    })
  }

  // 处理展开逻辑的按钮宽度问题
  // eslint-disable-next-line no-nested-ternary
  const btnSpan = isExpand ? (expand ? getButtonSpan(list.length) : getButtonSpan(2)) : getButtonSpan(list.length)

  useEffect(() => {
    const queryVars = getQueryVariable(location.href)
    // 表单initalValue
    const formValue = { ...form.getFieldsValue() }
    search.forEach((item) => {
      if (item?.transform) {
        formValue[item.name] = item?.transform(formValue[item.name])
      }
    })
    const cleanedFormValue = cleanObject(formValue)
    const isEmpty = Object.keys(cleanedFormValue || {}).length === 0
    // 过滤表单上不存在的筛选参数
    const validSearchVars = Object.keys(queryVars)
      .filter((key) => search.find((it) => it.name == key))
      .reduce((obj: Record<string, any>, key) => {
        obj[key] = queryVars[key]
        return obj
      }, {})
    search.forEach((item) => {
      if (item?.transform && validSearchVars[item.name]) {
        validSearchVars[item.name] = item?.transform(validSearchVars[item.name])
      }
    })
    /**url是否有参数 */
    const isUrlParmas = Object.keys(validSearchVars)?.length
    // url有参数并且表单有默认值
    if (isUrlParmas && !isEmpty) {
      form.setFieldsValue({ ...validSearchVars, ...cleanedFormValue })
      formValueChange({ ...validSearchVars, ...cleanedFormValue })
    }
    // url有参数并且表单没有默认值
    else if (isUrlParmas && isEmpty) {
      form.setFieldsValue(validSearchVars)
      formValueChange(validSearchVars)
    }
    //url没有参数并且表单有默认值
    else if (!isUrlParmas && !isEmpty) {
      formValueChange(cleanedFormValue)
    }
  }, [form])

  return (
    <div>
      <Form
        form={form}
        labelAlign="left"
        // layout="inline"
        labelCol={{ span: formCol?.[0] || 8 }}
        wrapperCol={{ span: formCol?.[1] || 16 }}
        onFinish={onRefresh}
      >
        <Row gutter={24}>
          {list}
          {showButton ? (
            <Col span={btnSpan}>
              <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                <ButtonLoading style={{ marginLeft: 24 }} onClick={onReset}>
                  重置
                </ButtonLoading>
                <ButtonLoading style={{ marginLeft: 24 }} onClick={onRefresh} type="primary">
                  {searchText}
                </ButtonLoading>
                <Visible visible={isExpand}>
                  <Visible visible={expand}>
                    <a style={{ lineHeight: '32px', marginLeft: 12 }} onClick={() => setExpand(!expand)}>
                      收起
                      <UpOutlined />
                    </a>
                  </Visible>
                  <Visible visible={!expand}>
                    <a style={{ lineHeight: '32px', marginLeft: 12 }} onClick={() => setExpand(!expand)}>
                      展开
                      <DownOutlined />
                    </a>
                  </Visible>
                </Visible>
              </div>
            </Col>
          ) : null}
        </Row>
        {/* 有助于可以回车搜索 */}
        <button type="submit" style={{ display: 'none' }}></button>
      </Form>
    </div>
  )
}

export default Index
