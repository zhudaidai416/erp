import React from 'react'

import { useNavigate } from "react-router-dom";

import { SearchOutlined } from '@ant-design/icons';

import { Button, Form, Input, Space, Select,
         Table, Switch, ConfigProvider, Spin, message, Popconfirm } from 'antd';

import { useState, useEffect } from 'react';

import http1 from "../../../config/axios";

import zhCN from 'antd/es/locale/zh_CN';

import "./StaffManage.scss";


const http = http1('http://localhost:3060')


export default function StaffManage() {

  const { Option } = Select

  /* 路由实例 */
  const navigate = useNavigate()
  
  /* form表单 */
  const [form] = Form.useForm();

  /* loading 加载 */
  const [loading, setLoading] = useState(false);

  /* table 数据源 */
  const [staffData, setStaffData] = useState([])

  /* 分页对象 */
  const  [paginationProps,setPaginationProps] = useState(
    {
       current: 1,
       pageSize: 2,
       total: 0,
       position: ['bottomCenter'],
       pageSizeOptions:[2,3,6],
       showQuickJumper:true,
       showSizeChanger: true,
     }
   );

  /* 条件查询条件 */
  const [condition, setCondition] = useState({role:'',store:'',search:''})

   const columns = [
    {
      title: '员工ID',
      dataIndex: 'ID',
    },
    {
      title: '员工账号',
      dataIndex: 'account',
    },
    {
      title: '姓名',
      dataIndex: 'name',
    },
    {
      title: '所属门店',
      dataIndex: 'store',
    },
    {
      title: '所属角色',
      dataIndex: 'role',
    },
    {
      title: '员工状态',
      dataIndex: 'staff_status',
      render: (text,recode) => {
        return (
          <Switch size={'default'} 
            checkedChildren="启用"
            unCheckedChildren="禁用"
            checked = {text}
            onClick = {(checked) => handleSetStatus(checked,recode.ID)}
          />
        )
      }
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },
    {
      title: '时间',
      dataIndex: 'time',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (text, recode) => {
        return (
          <Space>
            <Button type="link" onClick={() => addStaff(recode.ID)}>编辑</Button>
            <Popconfirm
              title="你确定要删除这条数据吗？"
              onConfirm={() =>confirm(recode.ID)}
              onCancel={cancel}
              /* okText="Yes"
              cancelText="No" */
            >
            <Button type="link">删除</Button>
            </Popconfirm>
          </Space>
        )
      }
    },
  ];

  /* 更改状态 重新请求 */
  const handleSetStatus = (checked,id) => {
    console.log(checked,id);
    setLoading(() =>true);
    setTimeout(() => {
      /* 修改status的值 */
      http({
        method: 'GET',
        url: '/setting/staffManage/changeStatus',
        params: {
          checked,
          ID: id
        }
      })
      .then(res => {
        getStaffDataApi(paginationProps.current,paginationProps.pageSize)
        setLoading(() =>false);
      })
    }, 500);
  }

  /* 发送请求获取数据 */
  const getStaffDataApi = async (pageNum,pageSize,flg=false) => {
    http({
      method: 'GET',
      url: '/setting/staffManage/getStaffData',
      params: {
        pageNum,
        pageSize
      }
    })
    .then(res => {
      console.log(res);
      if (res.code === '200') {
        setStaffData(res.data.data)
        flg && setPaginationProps({
          ...paginationProps,
          total: res.data.total
        })
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  /* useEffect 生命周期函数 */
  useEffect(() => {
    //发起请你去获取数据
    conditionFindData(condition,paginationProps.current,paginationProps.pageSize,true)
  },[])

  /* 当页码改变时触发 */
  const handleTableChange = async (pagination) => {
    console.log(pagination,'dhjskghdgjk');
    let {current,pageSize} = pagination
    if (pageSize !== paginationProps.pageSize) {
      setPaginationProps((pre)=>{
        let a = {
          ...pre,
          current: 1,
          pageSize: pageSize
        }
        conditionFindData(condition,1,pageSize)
        return a
      })
    }else{
      await setPaginationProps(pagination)
      await conditionFindData(condition,current,pageSize)
    }
  };

  /* 搜索条件提交 */
  const onFinish = (values) => {
    setCondition(() => values)
    console.log('Finish:', values);
    //条件查询
    http({
      method: 'POST',
      url: '/setting/staffManage/conditionFindData',
      data: {
        ...values,
        current : 1,
        pageSize: paginationProps.pageSize
      }
    })
    .then(res => {
      console.log(res);
      setStaffData(res.data.data)
      setPaginationProps(() => ({
        ...paginationProps,
        total: res.data.total,
        current: 1
      }))
    })
    .catch(err => {
      console.log(err);
    })
  };

  /* 条件查新Api */
  const conditionFindData = async (condition,current,pageSize,flg=false) => {
    http({
      method: 'POST',
      url: '/setting/staffManage/conditionFindData',
      data: {
        ...condition,
        current,
        pageSize
      }
    })
    .then(res => {
      console.log(res);
      if (res.code === '200') {
        setStaffData(res.data.data)
        console.log(res.data.data);
        flg && setPaginationProps((pre) => ({
          ...pre,
          total: res.data.total
        }))
      }
    })
    .catch(err => {
      console.log(err);
    })
  }

  /* 重置 */
  const onReset = async () => {
    form.resetFields();
    setCondition(() =>({role:'',store:'',search:''}))
    await conditionFindData({role:'',store:'',search:''},1,2,true)
    setPaginationProps((pre) =>({
      ...pre,
      current: 1,
      pageSize: 2,
    }))
  };

  /* 删除数据 */
  const confirm = (id) => {
    let arr = JSON.stringify([id])
    http.get(`/setting/staffManage/delStaffData?IDArr=${arr}`)
    .then((res) => {
      if (res.code === '200') {
        message.success('删除成功')
        conditionFindData(condition,paginationProps.current,paginationProps.pageSize,true)
      }
    })
  };

  const cancel = () => {
    message.error('Click on No');
  };

  /* table 中CheckBox 选中 */
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
    
  };

  /* 设置 table 条纹 */
  const getRowClassName = (record, index) => {
    let className = '';
    className = index % 2 === 0 ? 'oddRow' : 'evenRow';
    return className;
  }

  /* 新增 staff 数据 */
  const addStaff = (id) => {
    navigate(`/addStaff?id=${id}`)
  }

  return (
    <>
    {/* 搜索form */}
    <div>
      <Space className='staff-btnTop'>
        <Button type='primary' size={'large'} onClick={() => addStaff(undefined)}>新增</Button>
        <Button size={'large'}>批量操作</Button>
        <Button size={'large'}>导入</Button>
        <Button size={'large'}>导出</Button>
      </Space>
      <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} className='staff-form'>
        <Form.Item name="role" label="所属角色" align={'middle'}>
          <Select placeholder="所属角色" allowClear style={{width: '200px'}} size={'large'}>
            <Option value="">全部</Option>
            <Option value="程序员">程序员</Option>
            <Option value="审计员">审计员</Option>
            <Option value="销售员">销售员</Option>
          </Select>
        </Form.Item>
        {/* 所属门店 */}
        <Form.Item name="store" label="所属门店" align={'middle'}>
          <Select placeholder="所属门店" allowClear style={{width: '200px'}} size={'large'}>
            <Option value="">全部</Option>
            <Option value="高新区分店">高新区分店</Option>
            <Option value="武侯区分店">武侯区分店</Option>
            <Option value="郫都区分店">郫都区分店</Option>
          </Select>
        </Form.Item>
        <Form.Item name='search'>
          <Input size="large" placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />
        </Form.Item>
        <Form.Item>
          <Space>
            <Button type="primary" htmlType="submit" size={'large'}>搜索</Button>
            <Button htmlType="button" onClick={onReset} size={'large'}>重置</Button>
          </Space>
        </Form.Item>
      </Form>
    </div>
    {/* table */}
    <div className='staff_table'>
      <Spin spinning={loading}>
        <ConfigProvider locale={zhCN}>
          <Table
            rowSelection={rowSelection}

            columns={columns}
            dataSource={staffData}
            pagination={paginationProps}  
            onChange={handleTableChange}
            rowClassName={getRowClassName}
          />
        </ConfigProvider>
      </Spin>
    </div>
    <div>
    
    </div>
    </>
  )
}
