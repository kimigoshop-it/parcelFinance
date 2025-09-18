// 对账状态
export enum BillStatus {
  WAITING_FOR_BILL = 0,
  WAITING_FOR_CONFIRM = 1,
  HAS_BEEN_CONFIRMED = 2
}

const financeEnumLabelMap = {
  billStatus: {
    [BillStatus.WAITING_FOR_BILL]: '待对账',
    [BillStatus.WAITING_FOR_CONFIRM]: '待确认',
    [BillStatus.HAS_BEEN_CONFIRMED]: '已确认'
  }
};

export function getFinanceTag(enumName: string, value: number) {
  return financeEnumLabelMap[enumName][value];
}
