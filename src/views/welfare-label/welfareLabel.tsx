import { Typography } from '@mui/material';
import { TableColumnsType } from 'antd';
import ProTable from 'src/components/ProTable';

function WelfarePage() {
  const data = {
    code: 200,
    message: 'success',
    data: [
      {
        id: 1,
        bonusName: '餐饮及下午茶',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.213Z',
        updateTime: '2024-03-30T09:16:20.213Z',
      },
      {
        id: 2,
        bonusName: '就近租房补贴',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.229Z',
        updateTime: '2024-03-30T09:16:20.229Z',
      },
      {
        id: 3,
        bonusName: '节日礼品',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.243Z',
        updateTime: '2024-03-30T09:16:20.243Z',
      },
      {
        id: 4,
        bonusName: '年度体检',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.251Z',
        updateTime: '2024-03-30T09:16:20.251Z',
      },
      {
        id: 5,
        bonusName: '免费健身设施',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.255Z',
        updateTime: '2024-03-30T09:16:20.255Z',
      },
      {
        id: 6,
        bonusName: '家庭关爱假',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.259Z',
        updateTime: '2024-03-30T09:16:20.259Z',
      },
      {
        id: 7,
        bonusName: '家庭自选保险',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.264Z',
        updateTime: '2024-03-30T09:16:20.264Z',
      },
      {
        id: 8,
        bonusName: '住房补贴',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.267Z',
        updateTime: '2024-03-30T09:16:20.267Z',
      },
      {
        id: 9,
        bonusName: '团建聚餐',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.271Z',
        updateTime: '2024-03-30T09:16:20.271Z',
      },
      {
        id: 10,
        bonusName: '零食下午茶',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.275Z',
        updateTime: '2024-03-30T09:16:20.275Z',
      },
      {
        id: 11,
        bonusName: '餐补',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.278Z',
        updateTime: '2024-03-30T09:16:20.278Z',
      },
      {
        id: 12,
        bonusName: '带薪年假',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.282Z',
        updateTime: '2024-03-30T09:16:20.282Z',
      },
      {
        id: 13,
        bonusName: '夜班补助',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.285Z',
        updateTime: '2024-03-30T09:16:20.285Z',
      },
      {
        id: 14,
        bonusName: '股票期权',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.289Z',
        updateTime: '2024-03-30T09:16:20.289Z',
      },
      {
        id: 15,
        bonusName: '绩效奖金',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.293Z',
        updateTime: '2024-03-30T09:16:20.293Z',
      },
      {
        id: 16,
        bonusName: '年终奖',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.297Z',
        updateTime: '2024-03-30T09:16:20.297Z',
      },
      {
        id: 17,
        bonusName: '定期体检',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.300Z',
        updateTime: '2024-03-30T09:16:20.300Z',
      },
      {
        id: 18,
        bonusName: '意外险',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.305Z',
        updateTime: '2024-03-30T09:16:20.305Z',
      },
      {
        id: 19,
        bonusName: '补充医疗保险',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.308Z',
        updateTime: '2024-03-30T09:16:20.308Z',
      },
      {
        id: 20,
        bonusName: '五险一金',
        bonusDescription: '',
        isDelete: false,
        createTime: '2024-03-30T09:16:20.310Z',
        updateTime: '2024-03-30T09:16:20.310Z',
      },
    ],
  };
  /* 构建表单结构 */
  const columns: TableColumnsType<Record<string, any>> = [
    {
      title: 'id',
      dataIndex: 'operate_zh',
      key: 'operate',
    },
    {
      title: '名称',
      dataIndex: 'operate_zh',
      key: 'operate',
    },
    {
      title: '描述',
      dataIndex: 'operate_zh',
      key: 'operate',
    },
    {
      title: '创建时间',
      dataIndex: 'operate_zh',
      key: 'operate',
    },
    {
      title: '更新时间',
      dataIndex: 'operate_zh',
      key: 'operate',
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
        scroll={{ x: 'max-content' }}
        rowKey="id"
        pagination={{
          pageSize: 15,
        }}
        sticky={{
          offsetHeader: 0,
          offsetScroll: 0,
        }}
        request={async (data) => {
          //@ts-ignore
          return await data
        }}
      />
    </>
  );
}

export default WelfarePage;
