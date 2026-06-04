import {BusinessType, BusinessNode,  PriceType, GoodType, LastMileService, } from "./enum"

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
    [BusinessNode.CLEAN_DELIVERY]: '清派一体',
    [BusinessNode.DOMESTIC_WAREHOUSE]: '国内仓',
    [BusinessNode.TRUNK_CUSTOMS]: '干线+清关',
    [BusinessNode.TRUNK_GRAY_CUSTOMS]: '干线+灰关'
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
};

export const getEnumLabel = (enumName: keyof typeof priceEnumLabelMap, value: number) => {
  return priceEnumLabelMap[enumName][value];
};
