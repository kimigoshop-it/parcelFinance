export default [
  {
    name: 'home',
    path: '/home',
    component: 'basic',
    meta: {
      title: '应付管理',
      localIcon: 'circum_crop',
      order: 1
    },
    children: [
      {
        name: 'home_LadingBillhome',
        path: '/home/LadingBillhome',
        component: 'self',
        meta: {
          title: '应付帐单',
          localIcon: 'dot',
          requiresAuth: true,
          hide: false,
          keepAlive: true
        }
      },
      {
        name: 'home_edit',
        path: '/home/edit',
        component: 'self',
        meta: {
          title: '对账详情',
          localIcon: 'dot',
          requiresAuth: true,
          hide: true,
          keepAlive: false
        }
      },
      {
        name: 'home_message',
        path: '/home/message',
        component: 'self',
        meta: {
          title: '服务费列表',
          localIcon: 'dot',
          requiresAuth: false,
          hide: false,
          keepAlive: true
        }
      }
    ]
  },
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
          localIcon: 'dot'
        }
      }
    ]
  }
];
