import React from 'react'
import { Routes, Route } from "react-router-dom";
import { Result } from 'antd';
//路由鉴权
import { AuthComponent } from "@/components/AuthComponent";

// 路由树
import MyLayout from '@/views/MyLayout/index'
// 登录
import Login from '@/views/Login/index.jsx'
// 注册
import Zhu from '@/views/Login/zhu.jsx'
// 中转页
import Transferpage from '@/views/Login/transferpage.jsx'


//销售
// import AddSaleOrder from '@/views/sale/addSaleOrder/AddSaleOrder'
// import SaleOrder    from '@/views/sale/sales/SaleOrder'
// import DetailsSale  from '@/views/sale/detailsSale/DetailsSale'


/* // 首页
import Home from '@/views/Home/index.jsx'
// 资金
import Receipt from '@/views/Funds/Receipt/index.jsx'
import AddReceipt from '@/views/Funds/Receipt/addReceipt.jsx'
import DetailReceipt from '@/views/Funds/Receipt/detailReceipt.jsx'
import Account from '@/views/Funds/Account/index.jsx'
import Others from '@/views/Funds/Others/index.jsx'
import Payment from '@/views/Funds/Payment/index.jsx'
// 采购
import Procurement from '@/views/procurement/index'
import Addindex from '@/views/procurement/addindex'
import Application from '@/views/procurement/application'
// 报表
import Scale from '@/views/reportForm/sale/sale'
import Finance from '@/views/reportForm/finance/finance'
import Purchase from '@/views/reportForm/purchase/purchase'
import Stock from '@/views/reportForm/stock/stock'

// 设置
import FirmMessage from '@/views/Setting/firm-message/FirmMessage.jsx'
import NoteRecharge from '@/views/Setting/note-recharge/NoteRecharge'
import PrintTemplate from '@/views/Setting/print-template/PrintTemplate'
import StaffManage from '@/views/Setting/staff-manage/StaffManage'
import RoleManage from '@/views/Setting/role-manage/RoleManage'
import OperationLog from '@/views/Setting/operation-log/OperationLog'
import AddStaff from '@/components/setting/AddStaff'; */



export default function index() {
  return (
    <>
        <Routes>
          <Route path="/*" element={ <AuthComponent><MyLayout /></AuthComponent>} >
            
          </Route>
          {/* 登录 */}
          <Route path="/login" element={<Login />} />
          <Route path="/zhu" element={<Zhu />} />
          <Route path="/transferpage" element={<Transferpage />} />
          {/* <Route path="/addSaleOrder" element={<AddSaleOrder />} />
          <Route path="/saleOrder" element={<SaleOrder />} />
          <Route path="/detailsSale" element={<DetailsSale />} /> */}
          <Route path="*" element={<Result status="403" title="403" subTitle="Sorry, you are not authorized to access this page."/>}></Route>
        </Routes>
    </>
  )
}
