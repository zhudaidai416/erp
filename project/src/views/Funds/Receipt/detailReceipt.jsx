import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import ReactToPrint from 'react-to-print';
import { Table, Button } from 'antd';
import '../index.scss';
import './receipt.scss';
import { detailReceiptAsync } from '@/store/actions/funds/receiptActions';

export default function DetailReceipt() {
  const navigate = useNavigate();
  const params = useParams(); // 路由动态参数
  const receiptReducer = useSelector((state) => state.receiptReducer);
  const dispatch = useDispatch();

  // ========================== 数据初始加载 ==========================
  useEffect(() => {
    dispatch(detailReceiptAsync({ receipt_num: params.id }))
  }, [])

  // ========================== 总应收款 ==========================
  let all = 0;
  receiptReducer.detailData.forEach((item) => {
    all += item.receipt_money;
  });
  let allReceiptMoney = all;

  // ========================== 取消 ==========================
  const cancel = () => {
    navigate('/receipt');
  }

  // ========================== 打印 ==========================
  const printRef = useRef();

  // 表头参数
  const columns = [
    {
      title: '',
      dataIndex: 'operate',
      align: 'center'
    },
    {
      title: '序号',
      dataIndex: 'key',
      align: 'center'
    },
    {
      title: '收款金额（元）',
      dataIndex: 'receipt_money',
      align: 'center',
      editable: true,
    },
    {
      title: '优惠金额（元）',
      dataIndex: 'discount_money',
      align: 'center',
      editable: true,
    },
    {
      title: '实收金额（元）',
      dataIndex: 'real_money',
      align: 'center'
    },
    {
      title: '结算方式',
      dataIndex: 'pay_way',
      align: 'center',
      editable: true,
    },
    {
      title: '备注',
      dataIndex: 'notes',
      align: 'center',
      width: '300px'
    },
  ];

  return (
    <div className='page-content'>
      <div ref={printRef} className='printContent'>
        <div className='top'>
          <div className='title'>收款单</div>
          <div className='receipt-id'>单据编号：{receiptReducer.detailPublic.receipt_num}</div>
        </div>
        <div className='content'>
          <div className='content-item'>付款方：{receiptReducer.detailPublic.pay_name}</div>
          <div className='content-item'>总应收款：{allReceiptMoney}</div>
          <div className='content-item'>经手人：{receiptReducer.detailPublic.handled_person}</div>
          <div className='content-item'>收款日期：{receiptReducer.detailPublic.receipt_time}</div>
        </div>
        <Table
          bordered={true}
          dataSource={receiptReducer.detailData}
          columns={columns}
          style={{
            marginBottom: '20px'
          }}
          pagination={false}
          summary={(pageData) => {
            let totalReceipt = 0;
            let totalDiscount = 0;
            let totalReal = 0;
            pageData.forEach(({ receipt_money, discount_money, real_money }) => {
              totalReceipt += receipt_money;
              totalDiscount += discount_money;
              totalReal += real_money;
            });
            return (
              <Table.Summary>
                <Table.Summary.Row style={{ backgroundColor: '#FAFAFA' }}>
                  <Table.Summary.Cell align={'center'}>总计</Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell align={'center'}>{totalReceipt}</Table.Summary.Cell>
                  <Table.Summary.Cell align={'center'}>{totalDiscount}</Table.Summary.Cell>
                  <Table.Summary.Cell align={'center'}>{totalReal}</Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                  <Table.Summary.Cell></Table.Summary.Cell>
                </Table.Summary.Row>
              </Table.Summary>
            )
          }}
        />
        <div className='content'>备注：{receiptReducer.detailPublic.notes}</div>
        <div className='content'>附件：{receiptReducer.detailPublic.accessory}</div>
        <div className='content'>
          <div className='content-item'>制单人：{receiptReducer.detailPublic.prepared_person}</div>
          <div className='content-item'>制单日期：{receiptReducer.detailPublic.prepared_time}</div>
        </div>
      </div>

      <div className='bottom'>
        <Button size="large" onClick={cancel}>取消</Button>
        <ReactToPrint
          trigger={() => <Button type="primary" size="large" className="bottom-second-btn">打印</Button>}
          content={() => printRef.current}
        />
      </div>
    </div>
  )
}
