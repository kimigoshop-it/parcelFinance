// 对账状态
export enum BillStatus {
  WAITING_FOR_BILL = 0,
  WAITING_FOR_CONFIRM = 1,
  HAS_BEEN_CONFIRMED = 2
}

export enum DeliveryType {
  STORE_DELIVERY = 1,
  HOME_DELIVERY = 2
}

const financeEnumLabelMap = {
  billStatusPayable: {
    [BillStatus.WAITING_FOR_BILL]: '待对账',
    [BillStatus.WAITING_FOR_CONFIRM]: '待付款',
    [BillStatus.HAS_BEEN_CONFIRMED]: '已付款'
  },
  billStatusReceivable: {
    [BillStatus.WAITING_FOR_BILL]: '待对账',
    [BillStatus.WAITING_FOR_CONFIRM]: '待收款',
    [BillStatus.HAS_BEEN_CONFIRMED]: '已收款'
  },
  deliveryType: {
    [DeliveryType.STORE_DELIVERY]: '店配',
    [DeliveryType.HOME_DELIVERY]: '宅配'
  }
};

export function getFinanceTag(enumName: keyof typeof financeEnumLabelMap, value: number) {
  return financeEnumLabelMap[enumName][value];
}

export const billStatusColors = {
  [BillStatus.WAITING_FOR_BILL]: '#000',
  [BillStatus.WAITING_FOR_CONFIRM]: '#f30',
  [BillStatus.HAS_BEEN_CONFIRMED]: '#009900'
};
