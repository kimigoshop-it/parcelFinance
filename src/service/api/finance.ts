import { request, requestRaw } from '@/service/request';
import { GoodType } from '~/src/typings/business/shared';

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

/**
 * 删除账单详情
 * @param data 账单数据
 * @returns
 */
export const delFinancialStatementDetail = (data: {
  financialStatementId: number;
  financialStatementDetailId: number;
  delType: 1 | 2;
  goodType: GoodType;
  businessNumber: string;
}) => {
  return request({
    url: '/api/FinancialStatement/DelFinancialStatementDetail',
    method: 'POST',
    data: data,
    showMsg: true
  });
};

/**
 * 查询提单纬度下，详情列表
 */
export const queryLadingDetails = (
  data: {
    financialStatementDetailId: number;
    orderNumber?: string;
  } & BaseQueryParams
) => {
  return requestRaw<LadingDetailsView>({
    url: '/api/FinancialStatement/QueryFinancialProductPlanTemuDetailByProductPlanTemuNumber',
    method: 'POST',
    data: data,
    showMsg: true
  });
};

/**
 * 新增应收应付账单详情
 * @param data 账单数据
 * @returns
 */
export const addPayAndReceivableProductPlanTemuDetail = (data: {
  financialStatementDetailId: number;
  businessNumberList: [number];
  goodType: GoodType;
  weight?: number;
  amount?: number;
}) => {
  return request({
    url: '/api/FinancialStatement/AddPayAndReceivableProductPlanTemuDetail',
    method: 'POST',
    data: data,
    showMsg: true
  });
};

/**
 * 提单纬度下无需对账/转入下期账单
 * @param data 账单数据
 * @returns
 */
export const delProductPlanFinancialStatementDetail = (data: {
  financialStatementDetailId: number;
  financialStatementProductPlanDetailId: number;
  delType: 1 | 2;
}) => {
  return request({
    url: '/api/FinancialStatement/DelProductPlanFinancialStatementDetail',
    method: 'POST',
    data: data,
    showMsg: true
  });
};

/**
 * 修改账单状态
 * @param data 账单数据 {
 *   id: 账单ID
 *   billStatus: 账单状态 0: 待对账 1: 已对账 2: 已确认
 * }
 * @returns
 */
export const updateFinancialStatementStatus = (data: { id: number; billStatus: 0 | 1 | 2 }) => {
  return request({
    url: '/api/FinancialStatement/UpdateFinancialStatementStatus',
    method: 'POST',
    data: data,
    showMsg: true
  });
};
