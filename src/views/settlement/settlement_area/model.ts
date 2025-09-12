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

  /** 可选省州 */
  private availableProvinces: Province[] = [];

  public constructor(partition: IPartition) {
    this.id = partition.id;
    this.partitionName = partition.partitionName;
    this.countryConfigId = partition.countryConfigId;
    this.countryCode = partition.countryCode;
    this.partitionTypeName = partition.partitionTypeName;
  }

  private editProvince(idx: number, province: Province) {
    this.partitionProvinces.splice(this.partitionProvinces.length - 1, 1, province);
    console.log(this.partitionProvinces);
  }

  private editCity(idx: number, province: Province, city: City) {
    const foundProvince = this.partitionProvinces.find((p) => p.provinceId === province.provinceId);
    if (foundProvince) {
      foundProvince.partitionCities.push(city);
    } else {
      this.editProvince(idx, {
        provinceId: province.provinceId,
        provinceName: province.provinceName,
        partitionCities: [city]
      });
    }
  }

  public refreshAvailableProvinces(provinces: Province[]) {
    this.availableProvinces = provinces;
  }

  public getAvailableProvinces() {
    return this.availableProvinces.filter((p) => {
      return !this.partitionProvinces.find((pp) => pp.provinceId === p.provinceId);
    });
  }

  public choosePartitionType(type: PartitionType) {
    this.partitionType = type;
    this.partitionProvinces.splice(0, this.partitionProvinces.length);
    this.partitionProvinces.push({
      provinceId: null,
      provinceName: null,
      partitionCities: []
    });
  }

  public editArea(idx: number, area: { province: Province; city: City | null }) {
    if (this.partitionType === PartitionType.PROVINCE) {
      this.editProvince(idx, area.province);
      return;
    }

    if (this.partitionType === PartitionType.CITY) {
      this.editCity(idx, area.province, area.city!);
      return;
    }

    throw new Error('分区纬度不正确');
  }
}
