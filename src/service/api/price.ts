import { request, requestRaw } from '../request';

export const queryPriceList = (data: any) => {
  return request<Price[]>({
    url: '/api/Price/QueryPriceList',
    method: 'POST',
    data
  });
};

export const queryPriceDetail = (id: number) => {
  return requestRaw<Price>({
    url: '/api/Price/QueryPriceDetail',
    method: 'GET',
    params: { id }
  });
};

export const addPrice = (data: Price) => {
  return request<void>({
    url: '/api/Price/AddAndUpdatePrice',
    method: 'POST',
    data: data,
    showMsg: true
  });
};

export const queryPartitionListByCustomerId = (customerId: number | string) => {
  return requestRaw<IPartition[]>({
    url: '/api/Price/QueryPartitionListByCustomerId',
    method: 'GET',
    params: {
      customerId
    }
  });
};
