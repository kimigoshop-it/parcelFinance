import { request, requestRaw } from '@/service/request';

export const queryFinancialStatement = (data: any) => {
  return request<FinancialStatement[]>({
    url: '/api/FinancialStatement/QueryFinancialStatement',
    method: 'POST',
    data: data
  });
};

export const queryFinancialStatementDetails = (id: number) => {
  return requestRaw<FinancialStatementView>({
    url: '/api/FinancialStatement/QueryFinancialStatementDetails',
    method: 'POST',
    data: {
      id
    }
  });
};
