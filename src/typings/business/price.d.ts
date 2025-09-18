/**
 * 价格Dto
 */
interface Price {
  /**
   * 价格Id
   */
  id: number;

  /**
   * 客户Id
   */
  customerId: number;

  /**
   * 业务模式（0：专线，1：拆段）
   */
  businessType: number | null;

  /**
   * 业务节点(0:头程，1：清关，2：尾程，3：逆向，4:专线，5：清派一体)
   */
  businessNode: number | null;

  /**
   * 货物类型（1：普货，2：HV，3：快递，4：NonH7）
   */
  goodType?: number | null;

  /**
   * 尾程服务（0：店配，1：宅配）
   */
  lastMileService?: number | null;

  /**
   * 计费方式（0：一口价，1：重量区间固定价，2：重量区间单价*重量，3：区域区间固定价，4：区域区间单价*重量，5：区域重量区间固定价）
   */
  billingMethod: number | null;

  /**
   * 币种Id（币种Id）
   */
  currencyId: number | null;

  /**
   * 价格类型（0：应付，1：应收）
   */
  priceType: number | null;

  /**
   * 创建人
   */
  createName?: string | null;

  /**
   * 修改人
   */
  updateName?: string | null;

  /**
   * 价格关联分区(提交表单用)
   */
  priceRelatePartitionDtoModels: PriceRelatePartition[];

  /**
   * 价格关联分区(query detail 返回)
   */
  priceRelatePartitionList: PriceRelatePartition[];

  /**
   * 创建日期
   */
  createTime;
}

/**
 * 价格关联分区
 */
interface PriceRelatePartition {
  /**
   * 分区Id
   */
  partitionId: number;

  /**
   * 开始重量
   */
  beginWeight: number;

  /**
   * 结束重量
   */
  endWeight: number;

  /**
   * 首重价格（元）
   */
  firstWeightPrice: number;

  /**
   * 超过首重之后，每克的价格（元）
   */
  secondWeightPrice: number;
}
