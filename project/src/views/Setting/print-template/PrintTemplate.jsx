import React from 'react'

import { useState, useEffect } from 'react';

import { SearchOutlined } from '@ant-design/icons';

import { Button, Form, Input, Space, Table, Switch, Spin } from 'antd';

import { getPrintDataApi, changePrintStatusApi } from "@/http/settingApi/index";

import "./PrintTemplate.scss";

import { useNavigate } from 'react-router-dom';



export default function PrintTemplate() {

  const navigate = useNavigate()

  /* loading 加载 */
  const [loading, setLoading] = useState(false);

  /* form表单 */
  const [form] = Form.useForm();

  /* 条件查询 */
  const [condition,setCondition] = useState('')

  /* 分页对象 */
  const [paginationProps, setPaginationProps] = useState(
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

  /* table 列设置 */
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '模板名称',
      dataIndex: 'template_name',
    },
    {
      title: '模板类型',
      dataIndex: 'template_type',
    },
    {
      title: '模板名称地址',
      dataIndex: 'template_store',
    },
    {
      title: '模板状态',
      dataIndex: 'template_status',
      render: (text,recode) => {
        return (
          <Switch 
            checkedChildren="启用" 
            unCheckedChildren="禁用" 
            checked = {text}
            onClick = {(checked) => handleSetStatus(checked,recode.id)}
          />
        )
      }
    },
    {
      title: '最后修改时间',
      dataIndex: 'template_time',
    },
    {
      title: '操作',
      dataIndex: 'operate',
      render: (_,recode) => {
        return (
          <Space>
            <Button onClick={() =>onSetting(recode.id)} type="link">设置</Button>
          </Space>
        )
      }
    },
  ];

  /* table 数据源 */
  const [printData, setPrintData] = useState([])

  /* useEffect 生命周期函数 */
  useEffect(() => {
    //请求获取数据
    getPrintDataApi(condition).then(res => {
      setPrintData(res.data)
    })
  },[])

  /* 更改状态 重新请求 */
  const handleSetStatus = (checked,id) => {
    console.log(checked,id);
    setLoading(() =>true);
    setTimeout(() => {
      /* 修改status的值 */
      changePrintStatusApi({id,checked})
      .then(res => {
        setLoading(() =>false);
        //请求获取数据
        getPrintDataApi(condition).then(res => {
          setPrintData(res.data)
        })
      })
    }, 500);
  }

  /* 搜索条件验证通过 */
  const onFinish = (values) => {
    const { search_condition } = values
    setCondition(search_condition)
    //请求获取数据
    getPrintDataApi(search_condition).then(res => {
      setPrintData(res.data)
    })
  };

  /* 重置 */
  const onReset = () => {
    form.resetFields();
    setCondition('')
    //请求获取数据
    getPrintDataApi('').then(res => {
      setPrintData(res.data)
    })
  };

  /* 设置 table 条纹 */
  const getRowClassName = (record, index) => {
    let className = '';
    className = index % 2 === 0 ? 'PrintOddRow' : 'PrintEvenRow';
    return className;
  }

  /* 设置跳转到新页面 */
  const onSetting = (id) => {
    navigate(`/templateMessage?id=${id}`)
  }

  return (
    <>
      <div>
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} className='staff-form'>
            <Form.Item name='search_condition' style={{width: '325px'}}>
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
      <div className='Print-table'>
        <Spin spinning={loading}>
          <Table
            bordered={true}
            style={{'width': '100%'}}
            columns={columns}
            dataSource={printData}
            pagination={paginationProps}
            rowClassName={getRowClassName}
            title={() => '短信充值记录'}
            footer={() => 'Footer'}  
          />
        </Spin>
      </div>
    </>
    
  )
}
