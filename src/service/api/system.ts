import { mockRequest } from '../request';

//查询导出记录
export function QuerySystemExportList(data: any) {
  return mockRequest({
    url: '/api/SystemExport/QuerySystemExportList',
    method: 'post',
    data
  });
}
