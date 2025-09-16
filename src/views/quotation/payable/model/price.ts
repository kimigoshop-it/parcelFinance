export enum BusinessType {
  /** 专线 */
  SPEC_LINE = 0,
  /** 拆段 */
  SPLIT = 1
}

export enum BusinessNode {
  /** 头程 */
  HEAD = 0,
  /** 清关 */
  CUSTOMS_CLEARANCE = 1,
  /** 尾程 */
  LAST_MILE = 2,
  /** 逆向 */
  REVERSE = 3,
  /** 专线 */
  SPEC_LINE = 4,
  /** 清派一体 */
  CLEAN_DELIVERY = 5
}

export enum Currency {}

export enum GoodType {
  /** 普货 */
  NORMAL = 1,
  /** HV */
  HV = 2,
  /** 快递 */
  EXPRESS = 3,
  /** NonH7 */
  NON_H7 = 4
}

export enum LastMileService {
  /** 店配 */
  STORE_DELIVERY = 0,
  /** 宅配 */
  HOME_DELIVERY = 1
}

export enum BillingMethod {
  /** 一口价 */
  FIXED_PRICE = 0,
  /** 重量区间固定价 */
  WEIGHT_INTERVAL_FIXED_PRICE = 1,
  /** 重量区间单价*重量 */
  WEIGHT_INTERVAL_PRICE_WEIGHT = 2,
  /** 区域区间固定价 */
  AREA_INTERVAL_FIXED_PRICE = 3,
  /** 区域区间单价*重量 */
  AREA_INTERVAL_PRICE_WEIGHT = 4,
  /** 区域重量区间固定价 */
  AREA_WEIGHT_INTERVAL_FIXED_PRICE = 5,
  /** 区域重量区间单价*重量 */
  AREA_WEIGHT_INTERVAL_PRICE_WEIGHT = 6
}

export enum PriceType {
  /** 应付 */
  PAYABLE = 0,
  /** 应收 */
  RECEIVABLE = 1
}

export class PartitionWeightPrice {
  partitionId: number;
  fixed: boolean;
  price?: number;
  weightPrice: PriceRelatePartition[];

  constructor(partition: PriceRelatePartition[], fixed: boolean) {
    // 判断partition的所有元素id是否一致
    const partitionIds = partition.map((p) => p.partitionId);
    if (new Set(partitionIds).size !== 1) {
      throw new Error('分区id必须一致');
    }

    this.partitionId = partitionIds[0];
    this.fixed = fixed;
    this.weightPrice = partition;
  }

  public static mappedInstance(partition: PriceRelatePartition[], fixed: boolean): PartitionWeightPrice[] {
    const map = new Map<number, PartitionWeightPrice>();

    partition.forEach((p) => {
      let pwp = map.get(p.partitionId);
      if (pwp) {
        pwp.addWeightPrice(p);
      } else {
        pwp = new PartitionWeightPrice([p], fixed);
        map.set(p.partitionId, pwp);
      }
    });

    return Array.from(map.values());
  }

  addWeightPrice(weightPrice: PriceRelatePartition) {
    if (weightPrice.partitionId !== this.partitionId) {
      throw new Error('分区id必须一致');
    }
    this.weightPrice.push(weightPrice);
    this.weightPrice.sort((a, b) => a.beginWeight - b.beginWeight);
  }

  removeWeightPrice(idx: number) {
    this.weightPrice.splice(idx, 1);
  }

  public transferToPriceRelatePartition(): PriceRelatePartition[] {
    return this.weightPrice.map((wp) => ({
      partitionId: this.partitionId,
      beginWeight: wp.beginWeight,
      endWeight: wp.endWeight,
      firstWeightPrice: wp.firstWeightPrice,
      secondWeightPrice: wp.secondWeightPrice
    }));
  }
}
