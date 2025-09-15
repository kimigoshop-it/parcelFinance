interface PartitionFilter {
  countryName?: string;
  PartitionName?: string;
  CountryCode?: string;
}

declare type PartitionType = number

interface ICountryConfig {
  id: number;
  countryName: string;
  countryCode: string;
  delFlag: 0 | 1;
}

interface IPartition {
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
  partitionType?: number;

  /** 创建时间 */
  createTime: Date;

  /** 省州 */
  partitionProvinces: Province[];
}

interface PartitionDto {
  id?: number;
  partitionName?: string;
  countryConfigId?: number;
  countryCode?: string;
  partitionTypeName?: string;
}

interface Province {
  /**
   * id
   */
  provinceId: number | null;

  /**
   * 名称
   */
  provinceName: string | null;

  partitionCities: City[];
}

interface ProvinceConfig {
  /** id */
  id: number;
  /** 国家Id */
  countryId?: number | null;

  /** 国家名称 */
  countryName?: string | null;

  /** 州编码 */
  provinceCode?: string | null;

  /** 州中文名称 */
  provinceName?: string | null;

  /** 州英文名称 */
  cityEnglishName?: string | null;

  /** 州哈方名称 */
  cityKazakhstanName?: string | null;

  /** 州俄方名称 */
  cityRussiaName?: string | null;

  /** 州蒙语名称 */
  provinceMongoliaName?: string | null;

  /** KimigoCode */
  kimiGoCode?: string | null;

  /** KIMIGO英文名称 */
  kimiGoEnglishName?: string | null;

  /** KIMIGO中文名称 */
  kimiGoChineseName?: string | null;

  /** IsoCode2 */
  isoCode2?: string | null;

  /** 时区Id */
  timeZoneId?: number | null;

  /** 时区Code */
  timeZoneCode?: string | null;

  /** 时区名称 */
  timeZoneName?: string | null;

  /** 蒙古派件区域Code */
  bundleCode?: string | null;

  /** 省州本地语言 */
  provinceLocalName?: string | null;
}


interface City {
  /** 省州Id */
  provinceId: number | null;

  /** 省州名称 */
  provinceName: string | null;

  /**
   * id
   */
  cityId: number | null;

  /**
   * 名称
   */
  cityName: string | null;
}
