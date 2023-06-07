import React, { useEffect } from 'react'

import { Space, Table } from 'antd';

import { useState } from 'react';

import { getRechargeRecordDataApi } from "@/http/settingApi/index";

import '@/views/Setting/note-recharge/noteRecharge.scss'


const columns = [
  {
    title: '订单编号',
    dataIndex: 'note_number',
    render: (text) => <a href='/1234'>{text}</a>,
  },
  {
    title: '订单时间',
    dataIndex: 'note_time',
  },
  {
    title: '购买数量（条）',
    dataIndex: 'note_count',
  },
  {
    title: '金额（元）',
    dataIndex: 'note_money',
  },
  {
    title: '剩余短信条数',
    dataIndex: 'user_noteRemain',
  },
  {
    title: '支付方式',
    dataIndex: 'note_payMethod',
  },
  {
    title: '状态',
    dataIndex: 'note_status',
    render: (text,recode) => {
      return (
        <>
          {text?<p style={{color:'#2ed477'}}>充值成功</p>:<p>充值失败</p>}
        </>
      )
    }
  },
];


export default function RechargeRecord() {

  /* useEffect 生命周期函数 */
  useEffect(() => {
    //请求获取数据
    getRechargeRecordDataApi().then(res => {
      console.log(res.data);
      res.data.forEach(item => {
        item.key = item.note_number
      })
      setPayRecordData(res.data)
    })
  },[])


  const  [paginationProps] = useState(
    {
       /* current: 1, */
       /* pageSize: 4,
       total: 100, */
       defaultPageSize: 4,
       position: ['bottomCenter'],
       pageSizeOptions:[4,6,8],
       showQuickJumper:true,
       showSizeChanger: true,
       showTotal: (total)=> (<Space><div>共 {total} 条</div></Space>)
     }
   );

  const [payRecordData,setPayRecordData] = useState([
    /* {
      key: '1',
      number: '29000900',
      time: '2020/03/09 10:55',
      payAmount: 1000,
      money: 100,
      amount: 1089,
      pay: '支付宝',
      state: '充值成功'
    } */
  ])


  /* 设置 table 条纹 */
  const getRowClassName = (record, index) => {
    let className = '';
    className = index % 2 === 0 ? 'RechargeOddRow' : 'RechargeEvenRow';
    return className;
  }

  return (
    <div className='Recharge'>

      <Table
        style={{'width': '100%'}}
        bordered={true}
        columns={columns}
        dataSource={payRecordData}
        pagination={paginationProps}
        rowClassName={getRowClassName}
        title={() => '短信充值记录'}
        footer={() => 'Footer'}
      />
      
    </div>
  )
}
