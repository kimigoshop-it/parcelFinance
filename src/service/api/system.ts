import { mockRequest } from '../request';

/**
 * 查询城市配置表
 */
export function QueryCityConfigList(data: any) {
  return mockRequest({
    url: "/api/CountryConfig/QueryCityConfigList",
    method: "post",
    data
  });
}

//查询导出记录
export function QuerySystemExportList(data: any) {
  return mockRequest({
    url: '/api/SystemExport/QuerySystemExportList',
    method: 'post',
    data
  });
}
