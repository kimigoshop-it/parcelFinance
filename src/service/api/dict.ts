import { request } from '../request';

export const querySystemDictionaryDetailList = (data: any) => {
  return request<SystemDictionaryDetail[]>({
    url: '/api/SystemDictionary/QuerySystemDictionaryDetailList',
    method: 'POST',
    data: data
  }).then((res) => res.data);
};
