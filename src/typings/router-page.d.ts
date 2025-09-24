declare namespace RouterPage {
  /** 根路由 */
  type RootRouteKey = 'root';

  /** 未找到路由(捕获无效路径的路由) */
  type NotFoundRouteKey = 'not-found';

  /** 页面路由 */
  type RouteKey =
    | '403'
    | '404'
    | '500'
    | 'appH5'
    | 'constant-page'
    | 'home'
    | 'home_LadingBillhome'
    | 'home_edit'
    | 'home_message'
    | 'login'
    | 'not-found'
    | 'orderforgoods'
    | 'orderforgoods_detail'
    | 'orderforgoods_orderforgoods'
    | 'payable'
    | 'payable_statement'
    | 'payable_statement_list'
    | 'quotation'
    | 'quotation_payable'
    | 'quotation_price'
    | 'quotation_price_config'
    | 'quotation_receivable'
    | 'receivable'
    | 'receivable_statement'
    | 'receivable_statement_list'
    | 'settlement'
    | 'settlement_settlement'
    | 'settlement_settlement_area'
    | 'statement'
    | 'statement_detail'
    | 'statement_lading'
    | 'statement_lading_detail';

  /** 最后一级路由(该级路有对应的vue文件) */
  type LastDegreeRouteKey = Extract<RouteKey, '403' | '404' | '500' | 'appH5' | 'constant-page' | 'home_LadingBillhome' | 'home_edit' | 'home_message' | 'login' | 'not-found' | 'orderforgoods_detail' | 'orderforgoods_orderforgoods' | 'payable_statement_list' | 'quotation_payable' | 'quotation_price_config' | 'quotation_receivable' | 'receivable_statement_list' | 'settlement_settlement_area' | 'statement_detail' | 'statement_lading_detail'>
}
