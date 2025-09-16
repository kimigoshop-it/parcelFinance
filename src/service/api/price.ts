import { request } from '../request';

export const queryPartitionListByCustomerId = (customerId: number|string) => {
  return request<IPartition[]>({
    url: '/api/Price/QueryPartitionListByCustomerId',
    method: 'GET',
    params: {
      customerId
    }
  });
};
