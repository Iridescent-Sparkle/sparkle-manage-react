import { Typography } from '@mui/material';
import { TableColumnsType } from 'antd';
import useTableConfig from './config';
import ProTable from 'src/components/ProTable/index.tsx';
import dayjs from 'dayjs'
function WelfarePage() {
  const { search} = useTableConfig()
  /* 构建表单结构 */
  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: 'id',
      dataIndex: 'id',
      key: 'operate',
    },
    {
      title: '名称',
      dataIndex: 'bonusName',
      key: 'operate',
    },
    {
      title: '描述',
      dataIndex: 'bonusDescription',
      key: 'operate',
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'operate',
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'operate',
      render: (value: number) => {
        return value ? dayjs(value * 1000).format('YYYY-MM-DD HH:mm:ss') : '-'
      },
    },
    {
      title: '操作',
      dataIndex: 'operate_zh',
      key: 'operate',
    },
  ];
  return (
    <>
      <ProTable
        columns={columns}
        search={search}
        scroll={{ x: 'max-content' }}
        rowKey="id"
        pagination={{
          pageSize: 15,
          current:1
        }}
        sticky={{
          offsetHeader: 0,
          offsetScroll: 0,
        }}
        request={async (params) => {
          const a=await $.post(params, {
            url: '/boss/bonus/all',
          })
          return a
        }}
      />
    </>
  );
}

export default WelfarePage;
