import { request, requestRaw } from '../request';
import { Partition } from '@/views/settlement/settlement_area/model';

/**
 * 查询省州配置列表
 * @param countryId 国家id
 * @returns 省州配置列表
 */
export const queryProvinceConfigList = (countryId: number) => {
  return request<ProvinceConfig[]>({
    url: '/api/CountryConfig/QueryProvinceConfigList',
    method: 'POST',
    data: {
      countryId
    }
  });
};

/**
 * 查询国家配置列表
 * @param params
 * @returns
 */
export const queryCountryConfigList = (params: PartitionFilter) => {
  return request<ICountryConfig[]>({
    url: '/api/CountryConfig/QueryCountryConfigList',
    method: 'POST',
    data: params
  });
};

/**
 * 查询分区列表
 * @param params
 * @returns
 */
export const queryPartitionList = (params: PartitionFilter) => {
  return request<IPartition[]>({
    url: '/api/Partition/QueryPartitionList',
    method: 'POST',
    data: params
  });
};

/**
 * 查询分区详情
 * @param id 分区id
 * @returns 分区
 */
export const queryPartitionDetailById = (id: number) => {
  return requestRaw<IPartition>({
    url: '/api/Partition/QueryPartitionDetailById',
    method: 'GET',
    params: { id }
  });
};

/**
 * 新增分区
 * @param params
 * @returns
 */
export const addPartition = (params: PartitionDto) => {
  return request<void>({
    url: '/api/Partition/AddPartition',
    method: 'POST',
    data: params,
    showMsg: true
  });
};

/**
 * 当区划纬度选择省州的时候，选择未被选择的省州
 * @param countryId 国家id
 * @returns 区划列表
 */
export const queryPartitionNoProvince = (countryConfigId: number) => {
  return requestRaw<Province[]>({
    url: '/api/Partition/QueryPartitionNoProvince',
    method: 'GET',
    params: {
      countryConfigId
    }
  });
};

/**
 * 当区划纬度选择城市的时候，选择未被选择的城市
 * @param countryId 国家id
 * @returns 区划列表
 */
export const queryPartitionNoCity = (countryConfigId: number) => {
  return request<IPartition[]>({
    url: '/api/Partition/QueryPartitionNoCity',
    method: 'GET',
    params: {
      countryConfigId
    }
  });
};
