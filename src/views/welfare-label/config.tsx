import { Cascader, DatePicker, Input, Select } from "antd"
import { useSetState } from "src/components/hooks"

const useTableConfig = () => {
  const [state, setState] = useSetState({
    classifyData: [],
  })
  const search = [
    {
      label: 'id',
      name: 'id',
      render: () => <Input allowClear placeholder="请输入id" />,
    },
    {
      label: '名称',
      name: 'categoryName',
      render: () => <Input allowClear placeholder="请输入名称" />,
    },
    {
      label: '描述',
      name: 'categoryDescription',
      render: () => <Input allowClear placeholder="请输入描述" />,
    },
    {
      label: '创建时间',
      name: 'createTime',
      render: () => (
        <DatePicker
        // defaultValue={defaultValue}
        showTime
        // locale={buddhistLocale}
        // onChange={onChange}
      />
      ),
    },
    {
      label: '更新时间',
      name: 'updateTime',
      render: () => (
        <DatePicker
        // defaultValue={defaultValue}
        showTime
        // locale={buddhistLocale}
        // onChange={onChange}
      />
      ),
    },
    {
      label: '状态',
      name: 'isDelete',
      render: () => (
        <Select
          allowClear
          placeholder="请输入"
          options={[
            { value: '1', label: '已下架' },
            { value: '2', label: '已上架' },
          ]}
        />
      ),
    },
  ]

  return {

    search,
  }
}


export default useTableConfig