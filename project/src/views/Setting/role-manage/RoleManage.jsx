import React from 'react'

import { SearchOutlined } from '@ant-design/icons';

import { Button, Form, Input, Space, Table, Switch  } from 'antd';

import { useState } from 'react';

/* table 列设置 */
const columns = [
  {
    title: '角色ID',
    dataIndex: 'ID',
  },
  {
    title: '角色名称',
    dataIndex: 'name',
  },
  {
    title: '所属部门',
    dataIndex: 'department',
  },
  {
    title: '角色状态',
    dataIndex: 'status',
    render: (text) => {
      return (
        <Switch checkedChildren="启用" unCheckedChildren="禁用" defaultChecked />
      )
    }
  },
  {
    title: '员工人数',
    dataIndex: 'count',
  },
  {
    title: '时间',
    dataIndex: 'time',
  },
  {
    title: '操作',
    dataIndex: 'operate',
    render: () => {
      return (
        <Space>
          <Button type="link">编辑</Button>
          <Button type="link">删除</Button>
        </Space>
      )
    }
  },
];

/* table 数据源 */
const roleData = [
  {
    key: '1',
    ID: '001',
    name: '程序员',
    department: '研发部',
    status: true,
    count: 45,
    time: '2020/03/09 10:55',
  },
  {
    key: '2',
    ID: '002',
    name: '程序员',
    department: '研发部',
    status: true,
    count: 45,
    time: '2020/03/09 10:55',
  }
]

export default function RoleManage() {

  const [form] = Form.useForm();

  const  [paginationProps] = useState(
    {
       current: 1,
       pageSize: 10,
       total: 100,
       position: ['bottomCenter'],
       pageSizeOptions:[5,10,15],
       showQuickJumper:true,
       showSizeChanger: true,
     }
   );


  const onFinish = (values) => {
    console.log('Finish:', values);
  };
  /* 重置 */
  const onReset = () => {
    form.resetFields();
  };
  return (
    <>
      <div>
      <Space className='staff-btnTop'>
        <Button type='primary' size={'large'}>新增</Button>
        <Button size={'large'}>批量操作</Button>
        <Button size={'large'}>导入</Button>
        <Button size={'large'}>导出</Button>
      </Space>
      </div>
      <div>
        <Form form={form} name="horizontal_login" layout="inline" onFinish={onFinish} className='staff-form'>
          <Form.Item name='search' style={{width: '325px'}}>
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
      <div>
      <Table
          rowSelection={{
            type: 'checkbox',
          }}
          columns={columns}
          dataSource={roleData}
          pagination={paginationProps}  
        />
      </div>
    </>
  )
}
