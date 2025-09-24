import { request, requestRaw } from '@/service/request';

/**
 * 查询账单
 * @param data 查询参数
 * @returns 账单列表
 */
export const queryFinancialStatement = (data: any) => {
  return request<FinancialStatement[]>({
    url: '/api/FinancialStatement/QueryFinancialStatement',
    method: 'POST',
    data: data
  });
};

/**
 * 查询账单详情
 * @param id 账单ID
 * @returns 账单详情
 */
export const queryFinancialStatementDetails = (id: number, filters: BaseQueryParams) => {
  return requestRaw<FinancialStatementView>({
    url: '/api/FinancialStatement/QueryFinancialStatementDetails',
    method: 'POST',
    data: {
      id,
      ...filters
    }
  });
};

/**
 * 新增应收账单详情
 * @param data 账单数据
 * @returns 账单
 */
export const addReceivableFinancialStatementDetail = (data: any) => {
  return request({
    url: '/api/FinancialStatement/AddReceivableFinancialStatementDetail',
    method: 'POST',
    data: data,
    showMsg: true
  });
};

/**
 * 新增应付账单详情
 * @param data 账单数据
 * @returns
 */
export const addPayFinancialStatementDetail = (data: any) => {
  return request({
    url: '/api/FinancialStatement/AddPayFinancialStatementDetail',
    method: 'POST',
    data: data,
    showMsg: true
  });
};
