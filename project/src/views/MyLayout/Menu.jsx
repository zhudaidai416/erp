import React from 'react'

/* import {
  HomeOutlined,
  ShoppingCartOutlined,
  CarOutlined,
  CarryOutOutlined,
  WalletOutlined,
  PieChartOutlined,
  ProfileOutlined,
  SettingOutlined,
} from '@ant-design/icons'; */

import * as Icon from "@ant-design/icons";

import { Link, Navigate } from 'react-router-dom';

import * as _ from 'lodash'; //引入插件，深拷贝数组

import { menuData_1, menuData_2 } from './menuData'



/* 创建Icon组件 */
const createIcon = (name) => {
  return React.createElement(Icon[name])
}

/* 对菜单进行数据改造 */
const filterOneMenu = (data) => {
  // 借用 lodash 函数库来实现深拷贝
  const cloneData = _.cloneDeep(data)

  const newData = cloneData.map((item,index) => {
        item.icon = createIcon(item.icon);
        return item 
    })
  return newData
}

/* 对菜单进行数据改造 */
const filterTowMenu = (data) => {
  // 借用 lodash 函数库来实现深拷贝
  const cloneData = _.cloneDeep(data)

  const newData = cloneData.map((item,index) => {
      if (item.hidden) return false

      // { label: '菜单项一', key: 'item-1', icon: <UserOutlined> , children: [] }
      /* item.icon = createIcon(item.icon); */

      item.label = <Link to={item.path} state={{ name:item.label }}>{item.label}</Link>

      if (item.children && item.children.length > 0) {
          item.children = filterTowMenu(item.children)
      }
      return item 
  })
  return newData
}

let arr1 = filterOneMenu(menuData_1)

let arr2 = filterTowMenu(menuData_2)

arr1.forEach(item1 => {
 arr2.forEach(item2 => {
    if (item2.key.charAt(0) === item1.key) {
      item1.item.push(item2)
    }
  });
})

export let menu = arr1


/* export const menu1 = [
  {
    key: '1',
    label: '首页',
    icon: <HomeOutlined />,
    item: [
      {
        key: '1.1',
        label: '首页',
        children: [{ key: '/home', label: <Link to="/">首页</Link> }],
      },
    ],
  },
  {
    key: '2',
    label: '销售',
    icon: <ShoppingCartOutlined />,
    item: [
      {
        key: '2.1',
        label: '销售单',
        children: [
          { key: '2.1.1', label: '销售单' },
          { key: '2.1.2', label: '销售退货申请单' },
        ],
      },
    ],
  },
  {
    key: '3',
    label: '采购',
    icon: <CarOutlined />,
    item: [
      {
        key: '3.1',
        label: '采购单',
        children: [
          { key: '3.1.1', label: <Link to="/procurement">采购单</Link> },
          {
            key: '3.1.2',
            label: <Link to="/application">采购退货申请单</Link>,
          },
        ],
      },
    ],
  },
  {
    key: '4',
    label: '库存',
    icon: <CarryOutOutlined />,
    item: [
      {
        key: '4.1',
        label: '库存管理',
        children: [
          { key: '4.1.1', label: '库存查询' },
          { key: '4.1.2', label: '库存流水' },
        ],
      },
      {
        key: '4.2',
        label: '库存盘点',
        children: [{ key: '4.2.1', label: '库存盘点' }],
      },
      {
        key: '4.3',
        label: '库存调拨',
        children: [{ key: '4.3.1', label: '库存调拨' }],
      },
      {
        key: '4.4',
        label: '报损',
        children: [{ key: '4.4.1', label: '报损' }],
      },
      {
        key: '4.5',
        label: '借出',
        children: [{ key: '4.5.1', label: '借出' }],
      },
      {
        key: '4.6',
        label: '借入',
        children: [{ key: '4.6.1', label: '借入' }],
      },
      {
        key: '4.7',
        label: '出库',
        children: [
          { key: '4.7.1', label: '出库管理' },
          { key: '4.7.2', label: '出库明细' },
        ],
      },
      {
        key: '4.8',
        label: '入库',
        children: [
          { key: '4.8.1', label: '入库管理' },
          { key: '4.8.2', label: '入库明细' },
        ],
      },
    ],
  },
  {
    key: 5,
    label: '资金',
    icon: <WalletOutlined />,
    item: [
      {
        key: '5.1',
        label: '资金',
        children: [
          { key: '5.1.1', label: <Link to="/receipt">收款单</Link> },
          { key: '5.1.2', label: '付款单' },
          { key: '5.1.3', label: '其他收支' },
          { key: '5.1.4', label: '资金流水' },
        ],
      },
    ],
  },
  {
    key: 6,
    label: '报表',
    icon: <PieChartOutlined />,
    item: [
      {
        key: '6.1',
        label: '数据分析',
        children: [
          { key: '6.1.1', label: '销售概况' },
          { key: '6.1.2', label: '采购概况' },
          { key: '6.1.3', label: '库存概况' },
          { key: '6.1.4', label: '资金概况' },
        ],
      },
      {
        key: '6.2',
        label: '销售报表',
        children: [
          { key: '6.2.1', label: <Link to="/scale">销售明细表</Link> },
          { key: '6.2.2', label: '销售汇总表（按类别）' },
          { key: '6.2.3', label: '销售汇总表（按商品）' },
          { key: '6.2.4', label: '销售汇总表（按客户）' },
          { key: '6.2.5', label: '销售利润表' },
        ],
      },
      {
        key: '6.3',
        label: '采购报表',
        children: [
          { key: '6.3.1', label: <Link to="/purchase">采购明细表</Link> },
          { key: '6.3.2', label: '采购汇总表（按类别）' },
          { key: '6.3.3', label: '采购汇总表（按商品）' },
          { key: '6.3.4', label: '采购汇总表（按客户）' },
        ],
      },
      {
        key: '6.4',
        label: '库存报表',
        children: [
          { key: '6.4.1', label: <Link to="/stock">商品库存预警表</Link> },
          { key: '6.4.2', label: '商品库存余额表' },
        ],
      },
      {
        key: '6.5',
        label: '财务报表',
        children: [
          { key: '6.5.1', label: <Link to="/finance">客户对账单</Link> },
          { key: '6.5.2', label: '供应商对账单' },
        ],
      },
    ],
  },
  { key: 7, label: '资料', icon: <ProfileOutlined /> },
  {
    key: 8,
    label: '设置',
    icon: <SettingOutlined />,
    item: [
      {
        key: '8.1',
        label: '设置',
        children: [
          { key: '8.1.1', label: <Link to="/firmMessage">企业信息</Link> },
          { key: '8.1.2', label: <Link to="/noteRecharge">短信充值</Link> },
          { key: '8.1.3', label: <Link to="/printTemplate">打印模板</Link> },
          { key: '8.1.4', label: <Link to="/staffManage">员工管理</Link> },
          { key: '8.1.5', label: <Link to="/roleManage">角色管理</Link> },
          { key: '8.1.6', label: <Link to="/operationLog">操作日志</Link> },
        ],
      },
    ]
  }
] */