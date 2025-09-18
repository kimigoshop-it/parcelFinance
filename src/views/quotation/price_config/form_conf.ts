import { BillingMethod, BusinessNode, BusinessType, GoodType, LastMileService, PriceType } from '../shared/model/price';

export default {
  businessTypeOptions: [
    {
      label: '专线',
      value: BusinessType.SPEC_LINE
    },
    {
      label: '拆段',
      value: BusinessType.SPLIT
    }
  ],
  businessNodeOptions: [
    {
      label: '头程',
      value: BusinessNode.HEAD
    },
    {
      label: '清关',
      value: BusinessNode.CUSTOMS_CLEARANCE
    },
    {
      label: '尾程',
      value: BusinessNode.LAST_MILE
    },
    {
      label: '逆向',
      value: BusinessNode.REVERSE
    },
    {
      label: '专线',
      value: BusinessNode.SPEC_LINE
    },
    {
      label: '清派一体',
      value: BusinessNode.CLEAN_DELIVERY
    }
  ],
  goodTypeOptions: [
    {
      label: '普货',
      value: GoodType.NORMAL
    },
    {
      label: 'HV',
      value: GoodType.HV
    },
    {
      label: '快递',
      value: GoodType.EXPRESS
    },
    {
      label: 'NonH7',
      value: GoodType.NON_H7
    }
  ],
  lastMileServiceOptions: [
    {
      label: '店配',
      value: LastMileService.STORE_DELIVERY
    },
    {
      label: '宅配',
      value: LastMileService.HOME_DELIVERY
    }
  ],
  billingMethodOptions: [
    {
      label: '一口价',
      value: BillingMethod.FIXED_PRICE
    },
    {
      label: '重量区间固定价',
      value: BillingMethod.WEIGHT_INTERVAL_FIXED_PRICE
    },
    {
      label: '重量区间单价*重量',
      value: BillingMethod.WEIGHT_INTERVAL_PRICE_WEIGHT
    },
    {
      label: '区域区间固定价',
      value: BillingMethod.AREA_INTERVAL_FIXED_PRICE
    },
    {
      label: '区域区间单价*重量',
      value: BillingMethod.AREA_INTERVAL_PRICE_WEIGHT
    },
    {
      label: '区域重量区间固定价',
      value: BillingMethod.AREA_WEIGHT_INTERVAL_FIXED_PRICE
    },
    {
      label: '区域重量区间单价*重量',
      value: BillingMethod.AREA_WEIGHT_INTERVAL_PRICE_WEIGHT
    }
  ],
  priceTypeOptions: [
    {
      label: '应付',
      value: PriceType.PAYABLE
    },
    {
      label: '应收',
      value: PriceType.RECEIVABLE
    }
  ]
};
