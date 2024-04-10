import { Button } from 'antd';
import useTableConfig from './config';
import ProTable from 'src/components/ProTable/index.tsx';
import Detail from './Detail';
import AuthButton from 'src/components/AuthButton';
function WelfarePage() {
  const { search,actionRef,columns} = useTableConfig()
  
  return (
    <>
    <Detail reload={actionRef}  ><Button type='primary'>添加</Button></Detail>
      <ProTable
        actionRef={actionRef}
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
          return await $.post(params, {
            url: '/boss/bonus/all',
          })
        }}
      />
    </>
  );
}

export default WelfarePage;
