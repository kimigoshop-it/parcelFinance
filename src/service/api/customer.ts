import { requestRaw } from '../request';

export const queryCustomerBaseInfoList = (data: any) => {
  return requestRaw<
    {
      id: number;
      customerCode: string;
      customerName: string;
      payWay: number;
      languageCode: string;
      businessType: 0;
    }[]
  >({
    url: '/api/CustomerBasicInfo/QueryCustomerBaseInfoList',
    method: 'POST',
    data: data
  });
};
