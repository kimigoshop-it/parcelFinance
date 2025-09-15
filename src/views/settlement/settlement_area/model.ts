import { queryPartitionNoCity, queryPartitionNoProvince } from '@/service/api/partition';
import _ from 'lodash';

export const PartitionType = {
  PROVINCE: 0,
  CITY: 1
};

export class CountryConfig implements ICountryConfig {
  id: number;
  countryName: string;
  countryCode: string;
  delFlag: 0 | 1;

  public provinces: Map<number, Province> = new Map<number, Province>();
  public partitions: Map<number, Partition> = new Map<number, Partition>();

  public constructor(countryConfig: ICountryConfig) {
    this.id = countryConfig.id;
    this.countryName = countryConfig.countryName;
    this.countryCode = countryConfig.countryCode;
  }

  public addProvince(province: Province) {
    if (province.provinceId) {
      this.provinces.set(province.provinceId, province);
    }
  }

  public getProvince(provinceId: number) {
    return this.provinces.get(provinceId);
  }

  public getCity(provinceId: number, cityId: number) {
    return this.getProvince(provinceId)?.partitionCities.find((c) => c.cityId === cityId);
  }

  public addPartition(partition: Partition) {
    this.partitions.set(partition.id, partition);
  }

  public getPartition(partitionId: number) {
    return this.partitions.get(partitionId);
  }
}

export class Partition implements IPartition {
  /** 分区Id */
  id: number;

  /** 分区名称 */
  partitionName: string;

  /** 国家Id */
  countryConfigId?: number;

  /** 国家编码 */
  countryCode?: string;

  /** 分区纬度 */
  partitionTypeName?: string;

  /** 区划维度 （0：省州，1：城市） */
  partitionType?: PartitionType;

  /** 创建时间 */
  createTime: Date;

  /** 省州 */
  partitionProvinces: Province[] = [
    {
      provinceId: null,
      provinceName: null,
      partitionCities: []
    }
  ];

  /** 城市 */
  partitionCities: City[] = [
    {
      provinceId: null,
      provinceName: null,
      cityId: null,
      cityName: null
    }
  ];

  /**
   * 后端返回的省州
   */
  partitionProvincesBackend: Province[] = [];

  /**
   * 后端返回的城市
   */
  partitionCitiesBackend: City[] = [];

  /** 已选州的缓存 */
  private selectedProvinceIds = new Set<number>();

  /** 已选城市的缓存 */
  private selectedCityIds = new Set<number>();

  /** 可选省州 */
  private availableProvinces: Province[] = [];

  /** 可选城市 */
  private availableCities: Province[] = [];

  /** 是否全部 */
  private selectAll: boolean = false;

  public constructor(partition: IPartition) {
    this.id = partition.id;
    this.partitionName = partition.partitionName;
    this.countryConfigId = partition.countryConfigId;
    this.countryCode = partition.countryCode;
    this.partitionTypeName = partition.partitionTypeName;
    this.partitionProvinces = [
      {
        provinceId: null,
        provinceName: null,
        partitionCities: []
      }
    ];
    this.partitionCities = [
      {
        provinceId: null,
        provinceName: null,
        cityId: null,
        cityName: null
      }
    ];
  }

  private editProvince(idx: number, province: Province | null) {
    if (province === null) {
      console.log('错误, 没找到province: ' + idx);
      return;
    }

    const previousProvince = this.partitionProvinces[idx];
    this.selectedProvinceIds.delete(previousProvince.provinceId!);
    this.partitionProvinces.splice(idx, 1, province);
    this.selectedProvinceIds.add(province.provinceId!);
  }

  private editCity(idx: number, city: City | null) {
    if (city === null) {
      console.log('错误, 没找到city: ' + idx);
      return;
    }

    const previousCity = this.partitionCities[idx];
    this.selectedCityIds.delete(previousCity.cityId!);
    this.partitionCities.splice(idx, 1, city);
    this.selectedCityIds.add(city.cityId!);
  }

  public refreshAvailableProvinces(provinces: Province[]) {
    this.availableProvinces = provinces;
  }

  public refreshAvailableCities(cities: City[]) {
    const result: Province[] = [];
    for (const city of cities) {
      const province = result.find((p) => p.provinceId === city.provinceId);
      if (province) {
        province.partitionCities.push(city);
      } else {
        result.push({
          provinceId: city.provinceId,
          provinceName: city.provinceName,
          partitionCities: [city]
        });
      }
    }
    this.availableCities = result;
  }

  public getAvailableProvinces() {
    return this.availableProvinces;
  }

  public getAvailableCityProvinces() {
    return this.availableCities;
  }

  public getAvailableCities(provinceId: number) {
    return this.availableCities.find((p) => p.provinceId === provinceId)?.partitionCities ?? [];
  }

  public hasBeenSelected(provinceId: number, cityId?: number) {
    if (cityId === undefined) {
      return this.selectedProvinceIds.has(provinceId);
    } else {
      return this.selectedCityIds.has(cityId!);
    }
  }

  public choosePartitionType(type: PartitionType) {
    this.partitionType = type;

    if (type === PartitionType.PROVINCE) {
      queryPartitionNoProvince(this.countryConfigId!).then((res) => {
        const options = this.partitionProvincesBackend.map((p) => {
          return {
            provinceId: p.provinceId,
            provinceName: p.provinceName,
            partitionCities: []
          };
        });
        this.refreshAvailableProvinces([...options, ...res]);
        this.refreshArea();
      });
    }

    if (type === PartitionType.CITY) {
      queryPartitionNoCity(this.countryConfigId!).then((res) => {
        const options = this.partitionCitiesBackend.map((p) => {
          return {
            provinceId: p.provinceId,
            provinceName: p.provinceName,
            cityId: p.cityId,
            cityName: p.cityName
          };
        });

        const options2 = res
          .map((p) => {
            const cities = p.partitionCities;
            return cities.map((c) => {
              return {
                provinceId: p.provinceId,
                provinceName: p.provinceName,
                cityId: c.cityId,
                cityName: c.cityName
              };
            });
          })
          .flat();

        this.refreshAvailableCities([...options, ...options2]);
        this.refreshArea();
      });
    }
  }

  public refreshArea() {
    if (this.partitionType === PartitionType.PROVINCE) {
      this.partitionProvinces = _.cloneDeep(this.partitionProvincesBackend);
      this.selectedProvinceIds.clear();
      this.partitionProvinces.forEach((p) => {
        this.selectedProvinceIds.add(p.provinceId!);
      });
      if (this.partitionProvinces.length === 0) {
        this.partitionProvinces.push({
          provinceId: null,
          provinceName: null,
          partitionCities: []
        });
      }
    }

    if (this.partitionType === PartitionType.CITY) {
      this.partitionCities = _.cloneDeep(this.partitionCitiesBackend);
      this.selectedCityIds.clear();
      this.partitionCities.forEach((c) => {
        this.selectedCityIds.add(c.cityId!);
      });
      if (this.partitionCities.length === 0) {
        this.partitionCities.push({
          provinceId: null,
          provinceName: null,
          cityId: null,
          cityName: null
        });
      }
    }
  }

  public editArea(idx: number, area: { province: Province | null; city: City | null }) {
    if (this.partitionType === PartitionType.PROVINCE) {
      this.editProvince(idx, area.province);
      return;
    }

    if (this.partitionType === PartitionType.CITY) {
      console.log('++++++');
      this.editCity(idx, area.city);
      return;
    }

    throw new Error('分区纬度不正确');
  }

  public newArea() {
    if (this.partitionType === PartitionType.PROVINCE) {
      this.partitionProvinces.push({
        provinceId: null,
        provinceName: null,
        partitionCities: []
      });
    }

    if (this.partitionType === PartitionType.CITY) {
      this.partitionCities.push({
        provinceId: null,
        provinceName: null,
        cityId: null,
        cityName: null
      });
    }
  }

  public removeArea(idx: number) {
    if (this.partitionType === PartitionType.PROVINCE) {
      this.selectedProvinceIds.delete(this.partitionProvinces[idx].provinceId!);
      this.partitionProvinces.splice(idx, 1);
    }

    if (this.partitionType === PartitionType.CITY) {
      this.selectedCityIds.delete(this.partitionCities[idx].cityId!);
      this.partitionCities.splice(idx, 1);
    }
  }

  public handleSelectAll(selectAll: boolean) {
    if (this.partitionType === PartitionType.PROVINCE) {
      if (selectAll) {
        this.selectAll = true;
        const result = this.availableProvinces
          .map((province) => {
            this.selectedProvinceIds.add(province.provinceId!);
            return province;
          })
          .filter((province) => province !== undefined);
        this.partitionProvinces = result;
      } else {
        this.selectAll = false;
        this.refreshArea();
      }
    }

    if (this.partitionType === PartitionType.CITY) {
      if (selectAll) {
        this.selectAll = true;
        const result = this.availableCities
          .map((p) => p.partitionCities)
          .flat()
          .map((city) => {
            if (this.hasBeenSelected(city.provinceId!)) {
              return;
            }
            this.selectedCityIds.add(city.cityId!);
            return {
              provinceId: city.provinceId,
              provinceName: city.provinceName,
              cityId: city.cityId,
              cityName: city.cityName
            };
          })
          .filter((city) => city !== undefined);
        this.partitionCities = result;
      } else {
        this.selectAll = false;
        this.selectedCityIds.clear();
        this.refreshArea();
      }
    }
  }

  public toUpdatePartitionDtoModel(): UpdatePartitionDtoModel {
    let ids: number[] = [];

    if (this.partitionType === PartitionType.PROVINCE) {
      ids = this.partitionProvinces.map((p) => p.provinceId!);
    }
    if (this.partitionType === PartitionType.CITY) {
      ids = this.partitionCities.map((c) => c.cityId!);
    }

    return {
      id: this.id,
      partitionType: this.partitionType!,
      updatePartitionProviceIdList: ids
    };
  }
}

export type PartitionDetail = {
  id: number;
  countryConfigId: number;
  partitionType: PartitionType;
  provinceViewModelList: {
    provinceId: number;
    partitionCities: {
      cityId: number;
      cityName: string;
    }[];
  }[];
};

export type UpdatePartitionDtoModel = {
  /**
   * 分区id
   */
  id: number;

  /**
   * 分区纬度
   */
  partitionType: PartitionType;

  /**
   * 更新分区省州id列表
   */
  updatePartitionProviceIdList: number[];
};
