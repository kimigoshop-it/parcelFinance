import { getServiceEnvConfig } from '~/.env-config';
import { createRequest } from './request';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

const { url, urlPattern, secondUrl, secondUrlPattern } = getServiceEnvConfig(import.meta.env);

export const mockRequest = createRequest({ baseURL: url });

export const request = <T>(config: AxiosRequestConfig & { showMsg?: boolean }): Promise<Response<T>> => {
  return mockRequest({
    ...config
  })
    .then((res: AxiosResponse<Response<T>>) => {
      if (config.showMsg) {
        // 200认为是业务成功
        if (res.data.code === 200) {
          window.$message.success(res.data.message ?? '操作成功');
        }
        // status失败 success为true 认为是请求成功但业务失败
        else if (res.data.success && !res.data.status) {
          return Promise.reject(res.data);
        } else {
          return Promise.reject(res.data);
        }
      }
      return res.data;
    })
    .catch((err) => {
      window.$message.error(err.message ?? '操作失败');
      return Promise.reject(err);
    });
};

export const requestRaw = <T>(config: AxiosRequestConfig & { showMsg?: boolean }): Promise<T> => {
  return mockRequest({
    ...config
  })
    .then((res: AxiosResponse<T>) => {
      return res.data;
    })
    .catch((err) => {
      window.$message.error(err.message ?? '操作失败');
      return Promise.reject(err);
    });
};
