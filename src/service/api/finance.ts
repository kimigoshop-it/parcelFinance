import { request } from '@/service/request';

export const queryFinancialStatement = (data: any) => {
  return request<FinancialStatement[]>({
    url: '/api/FinancialStatement/QueryFinancialStatement',
    method: 'POST',
    data: data
  });
};
