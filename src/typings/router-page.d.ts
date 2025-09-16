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
    | 'quotation'
    | 'quotation_payable'
    | 'quotation_payable_price'
    | 'quotation_payable_price_config'
    | 'settlement'
    | 'settlement_settlement'
    | 'settlement_settlement_area';

  /** 最后一级路由(该级路有对应的vue文件) */
  type LastDegreeRouteKey = Extract<RouteKey, '403' | '404' | '500' | 'appH5' | 'constant-page' | 'home_LadingBillhome' | 'home_edit' | 'home_message' | 'login' | 'not-found' | 'orderforgoods_detail' | 'orderforgoods_orderforgoods' | 'quotation_payable' | 'quotation_payable_price_config' | 'settlement_settlement_area'>
}
