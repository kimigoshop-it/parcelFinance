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
  orderforgoods: () => import('./orderforgoods/index.vue'),
  settlement_settlement_area: () => import('./settlement/settlement_area/index.vue')
};
