module.exports = {
  menuData_1: [
    {
      key: '1',
      label: '首页',
      path: '',
      icon: 'HomeOutlined',
      item: [],
    },
    {
      key: '2',
      label: '销售',
      path: '',
      icon: 'ShoppingCartOutlined',
      item: [],
    },
    {
      key: '3',
      label: '采购',
      path: '',
      icon: 'CarOutlined',
      item: [],
    },
    {
      key: '4',
      label: '库存',
      path: '',
      icon: 'CarryOutOutlined',
      item: [],
    },
    {
      key: '5',
      label: '资金',
      path: '',
      icon: 'WalletOutlined',
      item: [],
    },
    {
      key: '6',
      label: '报表',
      path: '',
      icon: 'PieChartOutlined',
      item: [],
    },
    {
      key: '7',
      label: '资料',
      path: '',
      icon: 'ProfileOutlined',
    },
    {
      key: '8',
      label: '设置',
      path: '',
      icon: 'SettingOutlined',
      item: [],
    },
  ],

  menuData_2: [
    {
      key: '1.1',
      label: '首页',
      path: '',
      component: 'Home/index',
      children: [
        {
          key: '1.1.1',
          label: 'Home',
          path: '/',
          component: 'Home',
        },
      ],
    },
    {
      key: '2.1',
      label: '销售单',
      path: '',
      component: '',
      children: [
        {
          key: '2.1.1',
          label: '销售单',
          path: '',
          component: '',
        },
        {
          key: '2.1.2',
          label: '销售退货申请单',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '3.1',
      label: '采购单',
      path: '',
      component: '',
      children: [
        {
          key: '3.1.1',
          label: '采购单',
          path: '/procurement',
          component: 'procurement/index',
        },
        {
          key: '3.1.2',
          label: '采购退货申请单',
          path: '/application',
          component: 'procurement/application',
        },
        {
          key: '3.1.3',
          label: '采购退货申请单',
          path: '/application',
          component: 'procurement/addindex',
          hidden: true,
        },
      ],
    },
    {
      key: '4.1',
      label: '库存管理',
      path: '',
      component: '',
      children: [
        {
          key: '4.1.1',
          label: '库存查询',
          path: '',
          component: '',
        },
        {
          key: '4.1.2',
          label: '库存流水',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '4.2',
      label: '库存盘点',
      path: '',
      component: '',
      children: [
        {
          key: '4.2.1',
          label: '库存盘点',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '4.3',
      label: '库存调拨',
      path: '',
      component: '',
      children: [
        {
          key: '4.3.1',
          label: '库存调拨',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '4.4',
      label: '报损',
      path: '',
      component: '',
      children: [
        {
          key: '4.4.1',
          label: '报损',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '4.5',
      label: '借出',
      path: '',
      component: '',
      children: [
        {
          key: '4.5.1',
          label: '借出',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '4.6',
      label: '借入',
      path: '',
      component: '',
      children: [
        {
          key: '4.6.1',
          label: '借入',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '4.7',
      label: '出库',
      path: '',
      component: '',
      children: [
        {
          key: '4.7.1',
          label: '出库管理',
          path: '',
          component: '',
        },
        {
          key: '4.7.2',
          label: '出库明细',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '4.8',
      label: '入库',
      path: '',
      component: '',
      children: [
        {
          key: '4.8.1',
          label: '入库管理',
          path: '',
          component: '',
        },
        {
          key: '4.8.2',
          label: '入库明细',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '5.1',
      label: '资金',
      path: '',
      component: '',
      children: [
        {
          key: '5.1.1',
          label: '收款单',
          path: '/receipt',
          component: 'Funds/Receipt/index',
        },
        {
          key: '5.1.2',
          label: '付款单',
          path: '/payment',
          component: 'Funds/Payment/index',
        },
        {
          key: '5.1.3',
          label: '其他收支',
          path: '/others',
          component: 'Funds/Others/index',
        },
        {
          key: '5.1.4',
          label: '资金流水',
          path: '/account',
          component: 'Funds/Account/index',
        },
      ],
    },
    {
      key: '6.1',
      label: '数据分析',
      path: '',
      component: '',
      children: [
        {
          key: '6.1.1',
          label: '销售概况',
          path: '/analysis',
          component: '/reportForm/analysis/analysis',
        },
        {
          key: '6.1.2',
          label: '采购概况',
          path: '',
          component: '',
        },
        {
          key: '6.1.3',
          label: '库存概况',
          path: '',
          component: '',
        },
        {
          key: '6.1.4',
          label: '资金概况',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '6.2',
      label: '销售报表',
      path: '',
      component: '',
      children: [
        {
          key: '6.2.1',
          label: '销售明细表',
          path: '/sale',
          component: 'reportForm/sale/sale',
        },
        {
          key: '6.2.2',
          label: '销售汇总表（按类别）',
          path: '',
          component: '',
        },
        {
          key: '6.2.3',
          label: '销售汇总表（按商品）',
          path: '',
          component: '',
        },
        {
          key: '6.2.4',
          label: '销售汇总表（按客户）',
          path: '',
          component: '',
        },
        {
          key: '6.2.5',
          label: '销售利润表',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '6.3',
      label: '采购报表',
      path: '',
      component: '',
      children: [
        {
          key: '6.3.1',
          label: '采购明细表',
          path: '/purchase',
          component: 'reportForm/purchase/purchase',
        },
        {
          key: '6.3.2',
          label: '采购汇总表（按类别）',
          path: '',
          component: '',
        },
        {
          key: '6.3.3',
          label: '采购汇总表（按商品）',
          path: '',
          component: '',
        },
        {
          key: '6.3.4',
          label: '采购汇总表（按客户）',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '6.4',
      label: '库存报表',
      path: '',
      component: '',
      children: [
        {
          key: '6.4.1',
          label: '商品库存预警表',
          path: '/stock',
          component: 'reportForm/stock/stock',
        },
        {
          key: '6.4.2',
          label: '商品库存余额表',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '6.5',
      label: '财务报表',
      path: '',
      component: '',
      children: [
        {
          key: '6.5.1',
          label: '客户对账单',
          path: '/finance',
          component: 'reportForm/finance/finance',
        },
        {
          key: '6.5.2',
          label: '供应商对账单',
          path: '',
          component: '',
        },
      ],
    },
    {
      key: '8.1',
      label: '设置',
      path: '',
      component: '',
      children: [
        {
          key: '8.1.1',
          label: '企业信息',
          path: '/firmMessage',
          component: 'Setting/firm-message/FirmMessage',
        },
        {
          key: '8.1.2',
          label: '短信充值',
          path: '/noteRecharge',
          component: 'Setting/note-recharge/noteRecharge',
        },
        {
          key: '8.1.3',
          label: '打印模板',
          path: '/printTemplate',
          component: 'Setting/print-template/PrintTemplate',
        },
        {
          key: '8.1.4',
          label: '员工管理',
          path: '/staffManage',
          component: 'Setting/staff-manage/StaffManage',
        },
        {
          key: '8.1.5',
          label: '角色管理',
          path: '/roleManage',
          component: 'Setting/role-manage/RoleManage',
        },
        {
          key: '8.1.6',
          label: '操作日志',
          path: '/operationLog',
          component: 'Setting/operation-log/OperationLog',
          hidden: false,
        },
        {
          key: '8.1.7',
          label: '添加员工',
          path: '/addStaff',
          component: 'components/setting/AddStaff',
          hidden: true,
        },
      ],
    },
  ],
}
