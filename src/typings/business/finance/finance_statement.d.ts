declare interface QueryFinancialStatementParams extends BaseQueryParams {
  bilNumber?: string;
  billTime?: string;
  status?: number;
  customerId?: number;
  billNode?: number;
  billType?: number;
}

declare interface FinancialStatementView extends Omit<FinancialStatement, 'financialStatementDetailsList'> {
  financialStatementDetailsList: Response<FinancialStatementDetails[]>;
}

declare interface FinancialStatement {
  /** 主键Id */
  id: number;

  /** 账单编号 */
  bilNumber?: string | null;

  /** 客户名称 */
  customerName: string;

  /** 对账类型（0：应付，1：应收） */
  billType?: number | null;

  /** 单号 */
  businessNumber?: string | null;

  /** 开始账单时间 */
  billTime?: string | Date | null;

  /** 结束账单时间 */
  endBillTime?: string | Date | null;

  /** 币种 */
  currency?: string | null;

  /** 账单金额 */
  billAmount?: number | null;

  /** 账单状态 0:待对账  1：待确认  2：已确认 */
  billStatus?: number | null;

  /** 对账节点 */
  billNode?: string | null;

  /** 对账详情 */
  financialStatementDetailsList: FinancialStatementDetails[];
}

declare interface FinancialStatementDetails {
  /** 账单编号 */
  bilNumber?: string | null;

  /** 计费单号 */
  billCdoe?: string | null;

  /** 业务编号 */
  businessNumber?: string | null;

  /** 计费类型 1:包裹签收费用  2:包裹店拒收费用 */
  billingType?: number | null;

  /** 计费时间 */
  billTime?: string | Date | null;

  /** 重量 */
  billWeight?: number | null;

  /** 单价 */
  billPrice?: number | null;

  /** 金额 */
  billAmount?: number | null;

  /** 账单id */
  financialStatementId?: number | null;

  /** 货物类型（0：普货，1：HV，2：快递，3：NonH7） */
  goodType?: number | null;

  /** 尾程服务（0：店配，1：宅配） */
  lastMileService?: number | null;

  /** 对账类型（0：应付，1：应收） */
  billType?: number | null;
}
