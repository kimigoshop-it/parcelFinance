import type { RouteComponent } from 'vue-router';

export const views: Record<RouterPage.LastDegreeRouteKey, RouteComponent | (() => Promise<RouteComponent>)> = {
  403: () => import('./_builtin/403/index.vue'),
  404: () => import('./_builtin/404/index.vue'),
  500: () => import('./_builtin/500/index.vue'),
  appH5: () => import('./_builtin/appH5/index.vue'),
  'constant-page': () => import('./_builtin/constant-page/index.vue'),
  login: () => import('./_builtin/login/index.vue'),
  'not-found': () => import('./_builtin/not-found/index.vue'),
  home_LadingBillhome: () => import('./home/LadingBillhome/index.vue'),
  home_edit: () => import('./home/edit/index.vue'),
  home_message: () => import('./home/message/index.vue'),
  orderforgoods_detail: () => import('./orderforgoods/detail/index.vue'),
  orderforgoods_orderforgoods: () => import('./orderforgoods/orderforgoods/index.vue'),
  payable_statement_list: () => import('./payable_statement/list/index.vue'),
  quotation_payable: () => import('./quotation/payable/index.vue'),
  quotation_price_config: () => import('./quotation/price_config/index.vue'),
  quotation_receivable: () => import('./quotation/receivable/index.vue'),
  receivable_statement_list: () => import('./receivable_statement/list/index.vue'),
  settings_export: () => import('./settings/export/index.vue'),
  settlement_settlement_area: () => import('./settlement/settlement_area/index.vue'),
  statement_detail: () => import('./statement/detail/index.vue'),
  statement_lading_detail: () => import('./statement/lading_detail/index.vue')
};
