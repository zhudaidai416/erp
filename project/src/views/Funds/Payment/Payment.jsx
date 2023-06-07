import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, Table, Pagination, Space } from 'antd';
import '../index.scss';
import { itemRender } from '@/components/receipt/pagination';

const { RangePicker } = DatePicker;

export default function Payment() {
  // 新增
  const navigate = useNavigate();
  const add = () => {
    navigate('/receipt/add_receipt');
  }
  // 搜索
  const onFinish = (fieldsValue) => {
    const rangeValue = fieldsValue['date'];
    const values = {
      ...fieldsValue,
      'date': rangeValue ? [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')] : undefined,
    };
    console.log('搜索的数据：', values);
  };

  // 重置
  const searchFormRef = useRef();
  const onReset = () => {
    // 获取表单实例，调用 resetFields 方法重置
    searchFormRef.current.resetFields();
  };
  // 详情
  const detail = () => {
    navigate('/receipt/detail_receipt');
  }

  // 表头参数
  const columns = [
    {
      title: '付款时间',
      dataIndex: 'receipt_time',
    },
    {
      title: '单据编号',
      dataIndex: 'receipt_id',
    },
    {
      title: '供应商',
      dataIndex: 'receipt_name',
    },
    {
      title: '结算方式',
      dataIndex: 'pay_way',
    },
    {
      title: '收款金额（元）',
      dataIndex: 'receipt_money',
    },
    {
      title: '优惠金额（元）',
      dataIndex: 'discount_money',
    },
    {
      title: '实收金额（元）',
      dataIndex: 'real_money',
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={detail}>详情</a>
        </Space>
      )
    }
  ];

  // 表格数据
  const data = [];
  for (let i = 0; i < 15; i++) {
    data.push({
      key: i,
      receipt_time: `2020/03/09 10:55`,
      receipt_id: 'SK20170725022',
      receipt_name: '供应商一',
      pay_way: '支付宝',
      receipt_money: '590.00',
      discount_money: '90.00',
      real_money: '680.00'
    });
  }
  // 多选监听
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('选中的值', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className='page-content'>
      <div className='operate'>
        <Button type="primary" className='operate-btn' onClick={add}>新增</Button>
        <Button className='operate-btn'>批量操作</Button>
        <Button className='operate-btn'>导入</Button>
        <Button className='operate-btn'>导出</Button>
      </div>

      <Form
        ref={searchFormRef}
        className="search-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
      >
        <Form.Item name="name" className='search-form-item' label='供应商' colon={false} >
          <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="客户名称/编码" />
        </Form.Item>
        <Form.Item name="date" className='search-form-item' label='付款日期' colon={false} >
          <RangePicker />
        </Form.Item>
        <Form.Item name="keywords" className='search-form-item'>
          <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="请输入关键词搜索" />
        </Form.Item>
        <Form.Item className='search-form-item'>
          <Button type="primary" htmlType="submit" className='operate-btn'>搜索</Button>
          <Button onClick={onReset}>重置</Button>
        </Form.Item>
      </Form>

      <Table rowSelection={rowSelection} columns={columns} dataSource={data} pagination={false} />
      <Pagination
        className='pagination'
        total={data.length}
        itemRender={itemRender}
        showSizeChanger
        showQuickJumper
        pageSizeOptions={[10, 20, 30, 40, 50]}
        showTotal={(total) => `共 ${total} 条`}
      />
    </div>
  )
}
