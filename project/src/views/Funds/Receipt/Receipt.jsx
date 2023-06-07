import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, Table, Pagination, Space } from 'antd';
import '../index.scss';
import { itemRender } from '@/components/receipt/pagination';
import { getReceiptAsync } from '@/store/actions/funds/receiptActions';
import clickToExport from '@/utils/exportToExcel';

const { RangePicker } = DatePicker;

export default function Receipt() {
  const searchFormRef = useRef();
  const navigate = useNavigate();
  const receiptReducer = useSelector((state) => state.receiptReducer);
  const dispatch = useDispatch();
  const [search, setSearch] = useState({
    pageNum: 1,
    pageSize: 5,
    pay_name: '',
    receipt_time: [],
    keywords: ''
  });

  // ========================== 数据初始加载 ==========================
  useEffect(() => {
    dispatch(getReceiptAsync(search))
  }, [])

  // ========================== 新增 ==========================
  const add = () => {
    navigate('/receipt/add_receipt');
  }

  // ========================== 多选监听 ==========================
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log('选中的值', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // ========================== 导出 ==========================
  const exportExcel = () => {
    // 被选中的数据
    let selectedData = [];
    selectedRowKeys.forEach((item1) => {
      receiptReducer.data.forEach((item2) => {
        if (item1 == item2.receipt_num) {
          selectedData.push(item2);
        }
      });
    });
    // 表头改造
    let header = {}
    let column = columns.filter(item => item.title != '操作')
    column.forEach((item) => {
      header[item.dataIndex] = item.title;
    })
    clickToExport(header, selectedData, '收款表');
  }

  // ========================== 搜索 ==========================
  const onSearch = (values) => {
    const rangeValue = values['receipt_time'];
    setSearch((pre) => {
      let pro = {
        ...pre,
        pageNum: 1,
        pay_name: values['pay_name'],
        keywords: values['keywords'],
        receipt_time: rangeValue ? [rangeValue[0].format('YYYY/MM/DD'), rangeValue[1].format('YYYY/MM/DD')] : undefined,
      }
      dispatch(getReceiptAsync(pro));
      return pro;
    });
  };

  // ========================== 重置 ==========================
  const onReset = () => {
    searchFormRef.current.resetFields();
    setSearch((pre) => {
      let pro = {
        ...pre,
        pageNum: 1,
        pay_name: '',
        receipt_time: [],
        keywords: ''
      }
      dispatch(getReceiptAsync(pro))
      return pro
    })
  };

  // ========================== 详情 ==========================
  const detail = (item) => {
    navigate(`/receipt/detail_receipt/${item.receipt_num}`);
  }

  // ========================== 数据分页 ==========================
  const pageChange = (page, pageSize) => {
    setSearch((pre) => {
      // console.log(pre)
      let pro = {
        ...pre,
        pageNum: page,
        pageSize,
      }
      dispatch(getReceiptAsync(pro))
      return pro
    })
  }

  // 表头参数
  const columns = [
    {
      title: '收款时间',
      dataIndex: 'receipt_time',
    },
    {
      title: '单据编号',
      dataIndex: 'receipt_num',
    },
    {
      title: '付款方',
      dataIndex: 'pay_name',
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
          <a onClick={() => detail(record)}>详情</a>
        </Space>
      )
    }
  ];

  return (
    <div className='page-content'>
      <div className='operate'>
        <Button type="primary" className='operate-btn' onClick={add}>新增</Button>
        <Button className='operate-btn'>批量操作</Button>
        <Button className='operate-btn'>导入</Button>
        <Button className='operate-btn' onClick={exportExcel}>导出</Button>
      </div>

      <Form
        ref={searchFormRef}
        className="search-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSearch}
      >
        <Form.Item name="pay_name" className='search-form-item' label='付款方' colon={false} >
          <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="客户名称/编码" />
        </Form.Item>
        <Form.Item name="receipt_time" className='search-form-item' label='收款日期' colon={false} >
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

      <Table rowSelection={rowSelection} columns={columns} dataSource={receiptReducer.data} pagination={false} />
      <Pagination
        className='pagination'
        total={receiptReducer.total}
        itemRender={itemRender}
        showSizeChanger
        showQuickJumper
        defaultCurrent={1}
        defaultPageSize={5}
        current={search.pageNum}
        pageSizeOptions={[5, 10, 20, 30, 40]}
        showTotal={(total) => `共 ${total} 条`}
        onChange={(page, pageSize) => {
          pageChange(page, pageSize)
        }}
      />
    </div>
  )
}
