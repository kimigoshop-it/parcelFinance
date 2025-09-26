export default [
  {
    name: 'payable_statement',
    path: '/payable_statement',
    component: 'basic',
    meta: {
      title: '应付账单',
      localIcon: 'circum_crop',
      order: 1
    },
    children: [
      {
        name: 'payable_statement_list',
        path: '/payable_statement/list',
        component: 'self',
        meta: {
          title: '应付账单',
          localIcon: 'dot',
          requiresAuth: true,
          hide: false,
          keepAlive: true
        }
      }
    ]
  },
  {
    name: 'receivable_statement',
    path: '/receivable_statement',
    component: 'basic',
    meta: {
      title: '应收账单',
      localIcon: 'circum_crop',
      order: 1
    },
    children: [
      {
        name: 'receivable_statement_list',
        path: '/receivable_statement/list',
        component: 'self',
        meta: {
          title: '应收账单',
          localIcon: 'dot',
          requiresAuth: true,
          hide: false,
          keepAlive: true
        }
      }
    ]
  },
  {
    name: 'orderforgoods',
    path: '/orderforgoods',
    component: 'basic',
    meta: {
      title: '订单管理',
      localIcon: 'circum_crop',
      order: 1
    },
    children: [
      {
        name: 'orderforgoods_orderforgoods',
        path: '/orderforgoods/orderforgoods',
        component: 'self',
        meta: {
          title: '小包订单',
          localIcon: 'dot',
          requiresAuth: true,
          hide: false,
          keepAlive: true
        }
      },
      {
        name: 'orderforgoods_detail',
        path: '/orderforgoods/detail',
        component: 'self',
        meta: {
          title: '订单详情',
          localIcon: 'dot',
          requiresAuth: true,
          hide: true,
          keepAlive: false
        }
      }
    ]
  },
  {
    name: 'quotation',
    path: '/quotation',
    component: 'basic',
    meta: {
      title: '报价管理',
      localIcon: 'circum_crop',
      order: 1
    },
    children: [
      {
        name: 'quotation_payable',
        path: '/quotation/payable',
        component: 'self',
        meta: {
          title: '应付报价',
          localIcon: 'dot',
          requiresAuth: true
        }
      },
      {
        name: 'quotation_receivable',
        path: '/quotation/receivable',
        component: 'self',
        meta: {
          title: '应收报价',
          localIcon: 'dot',
          requiresAuth: true
        }
      },
      {
        name: 'quotation_price_config',
        path: '/quotation/price_config',
        component: 'self',
        meta: {
          title: '应收报价编辑',
          localIcon: 'dot',
          requiresAuth: true,
          hide: false,
          keepAlive: false
        }
      }
    ]
  },
  {
    name: 'settlement',
    path: '/settlement',
    component: 'basic',
    meta: {
      title: '结算区域',
      localIcon: 'circum_crop',
      order: 1
    },
    children: [
      {
        name: 'settlement_settlement_area',
        path: '/settlement/settlement_area',
        component: 'self',
        meta: {
          title: '结算区域',
          localIcon: 'dot',
          requiresAuth: true,
          hide: false,
          keepAlive: false
        }
      }
    ]
  },
  {
    name: 'statement',
    path: '/statement',
    component: 'basic',
    meta: {
      title: '账单管理',
      localIcon: 'circum_crop',
      order: 1,
      hide: true
    },
    children: [
      {
        name: 'statement_detail',
        path: '/statement/detail',
        component: 'self',
        meta: {
          title: '账单详情',
          localIcon: 'dot',
          hide: true
        }
      },
      {
        name: 'statement_lading_detail',
        path: '/statement/lading_detail',
        component: 'self',
        meta: {
          title: '提单明细',
          localIcon: 'dot',
          hide: true
        }
      }
    ]
  },
  {
    name: 'settings',
    path: '/settings',
    component: 'basic',
    meta: {
      title: '系统设置',
      localIcon: 'circum_crop',
      order: 1
    },
    children: [
      {
        name: 'settings_export',
        path: '/settings/export',
        component: 'self',
        meta: {
          title: '导出记录',
          localIcon: 'dot',
          requiresAuth: true,
          hide: false,
          keepAlive: false
        }
      }
    ]
  },
  {
    name: 'returnshipment',
    path: '/returnshipment',
    component: 'basic',
    meta: {
      title: '退运',
      localIcon: 'circum_crop',
      order: 1
    },
    children: [
      {
        name: 'returnshipment_returnshipmentorder',
        path: '/returnshipment/returnshipmentorder',
        component: 'self',
        meta: {
          title: '退运订单',
          localIcon: 'dot',
          requiresAuth: true,
          hide: false,
          keepAlive: false
        }
      },
      {
        name: 'returnshipment_returnshipmentorder_detail',
        path: '/returnshipment/returnshipmentorder/detail',
        component: 'self',
        meta: {
          title: '退运订单详情',
          localIcon: 'dot',
          requiresAuth: true,
          hide: true,
          keepAlive: false
        }
      }
    ]
  }
];
