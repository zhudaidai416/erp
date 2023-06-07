import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, Table, Pagination } from 'antd';
import '../index.scss';
import { itemRender } from '@/components/receipt/pagination';
import { getAccountAsync } from '@/store/actions/funds/accountActions';
import clickToExport from '@/utils/exportToExcel';

const { RangePicker } = DatePicker;

export default function Account() {
  const searchFormRef = useRef();
  const dispatch = useDispatch();
  const accountReducer = useSelector((state) => state.accountReducer);
  const [search, setSearch] = useState({
    pageNum: 1,
    pageSize: 5,
    deal_time: [],
    keywords: ''
  });

  // ========================== 数据初始加载 ==========================
  useEffect(() => {
    dispatch(getAccountAsync(search))
  }, [])

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
      accountReducer.data.forEach((item2) => {
        if (item1 == item2.account_num) {
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
    clickToExport(header, selectedData, '资金流水表');
  }

  // ========================== 搜索 ==========================
  const onSearch = (values) => {
    const rangeValue = values['deal_time'];
    setSearch((pre) => {
      let pro = {
        ...pre,
        pageNum: 1,
        keywords: values['keywords'],
        deal_time: rangeValue ? [rangeValue[0].format('YYYY/MM/DD'), rangeValue[1].format('YYYY/MM/DD')] : undefined,
      }
      dispatch(getAccountAsync(pro));
      return pro;
    });
    // console.log('搜索的数据：', values);
  };

  // ========================== 重置 ==========================
  const onReset = () => {
    searchFormRef.current.resetFields();
    setSearch((pre) => {
      let pro = {
        ...pre,
        pageNum: 1,
        deal_time: [],
        keywords: ''
      }
      dispatch(getAccountAsync(pro))
      return pro
    })
  };

  // ========================== 数据分页 ==========================
  const pageChange = (page, pageSize) => {
    setSearch((pre) => {
      let pro = {
        ...pre,
        pageNum: page,
        pageSize,
      }
      dispatch(getAccountAsync(pro))
      return pro
    })
  }

  // 表头参数
  const columns = [
    {
      title: '交易时间',
      dataIndex: 'deal_time',
    },
    {
      title: '单据编号',
      dataIndex: 'account_num',
    },
    {
      title: '项目名称',
      dataIndex: 'project_name',
    },
    {
      title: '来往单位名称',
      dataIndex: 'organize_name',
    },
    {
      title: '门店',
      dataIndex: 'shop',
    },
    {
      title: '结算方式',
      dataIndex: 'pay_way',
    },
    {
      title: '金额（元）',
      dataIndex: 'money',
      render: (text) => <div style={{ color: 'red' }}>+{text}</div>,
    },
    {
      title: '当前金额（元）',
      dataIndex: 'now_money',
    },
    {
      title: '备注',
      dataIndex: 'notes',
    }
  ];

  return (
    <div className='page-content'>
      <div className='operate'>
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
        <Form.Item name="deal_time" className='search-form-item' label='交易日期' colon={false} >
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

      <Table rowSelection={rowSelection} columns={columns} dataSource={accountReducer.data} pagination={false} />
      <Pagination
        className='pagination'
        total={accountReducer.total}
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
