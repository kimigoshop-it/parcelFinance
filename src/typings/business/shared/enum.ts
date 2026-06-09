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
  CLEAN_DELIVERY = 5,
  /** 国内仓 */
  DOMESTIC_WAREHOUSE = 6,
  /** 干线+清关 */
  TRUNK_CUSTOMS = 7,
  /** 干线+灰关 */
  TRUNK_GRAY_CUSTOMS = 8
}

export enum GoodType {
  /** 普货 */
  NORMAL = 0,
  /** HV */
  HV = 1,
  /** 快递 */
  EXPRESS = 2,
  /** NonH7 */
  NON_H7 = 3,
  /** 其他 */
  OTHER = 100
}

export enum LastMileService {
  /** 店配 */
  STORE_DELIVERY = 0,
  /** 宅配 */
  HOME_DELIVERY = 1
}

export enum PriceType {
  /** 应付 */
  PAYABLE = 0,
  /** 应收 */
  RECEIVABLE = 1
}

// 对账状态
export enum BillStatus {
  WAITING_FOR_BILL = 0,
  WAITING_FOR_CONFIRM = 1,
  HAS_BEEN_CONFIRMED = 2
}
