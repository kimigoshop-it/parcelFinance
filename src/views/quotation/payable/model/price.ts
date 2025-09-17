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

const priceEnumLabelMap = {
  businessType: {
    [BusinessType.SPEC_LINE]: '专线',
    [BusinessType.SPLIT]: '拆段'
  },
  businessNode: {
    [BusinessNode.HEAD]: '头程',
    [BusinessNode.CUSTOMS_CLEARANCE]: '清关',
    [BusinessNode.LAST_MILE]: '尾程',
    [BusinessNode.REVERSE]: '逆向',
    [BusinessNode.SPEC_LINE]: '专线',
    [BusinessNode.CLEAN_DELIVERY]: '清派一体'
  },
  priceType: {
    [PriceType.PAYABLE]: '应付',
    [PriceType.RECEIVABLE]: '应收'
  },
  goodType: {
    [GoodType.NORMAL]: '普货',
    [GoodType.HV]: 'HV',
    [GoodType.EXPRESS]: '快递',
    [GoodType.NON_H7]: 'NonH7'
  },
  lastMileService: {
    [LastMileService.STORE_DELIVERY]: '店配',
    [LastMileService.HOME_DELIVERY]: '宅配'
  },
  billingMethod: {
    [BillingMethod.FIXED_PRICE]: '一口价',
    [BillingMethod.WEIGHT_INTERVAL_FIXED_PRICE]: '重量区间固定价',
    [BillingMethod.WEIGHT_INTERVAL_PRICE_WEIGHT]: '重量区间单价*重量',
    [BillingMethod.AREA_INTERVAL_FIXED_PRICE]: '区域区间固定价',
    [BillingMethod.AREA_INTERVAL_PRICE_WEIGHT]: '区域区间单价*重量',
    [BillingMethod.AREA_WEIGHT_INTERVAL_FIXED_PRICE]: '区域重量区间固定价',
    [BillingMethod.AREA_WEIGHT_INTERVAL_PRICE_WEIGHT]: '区域重量区间单价*重量'
  }
};

export const getPriceEnumLabel = (enumName: string, value: number) => {
  return priceEnumLabelMap[enumName][value];
};
