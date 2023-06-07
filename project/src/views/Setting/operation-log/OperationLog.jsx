import React from 'react'

import { useState, useEffect } from 'react';

import { SearchOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

import { Button, Form, Input, Space, Table, Modal, message, notification } from 'antd';

import { getOperationLogDataApi, delLogDataByIdApi } from "@/config/settingApi/index";

import exportToExcel from "@/utils/exportToExcel";

import './OperationLog.scss';

import * as _ from 'lodash';



export default function OperationLog() {

  const { confirm } = Modal;

  /* 条件查询 */
  const [condition,setCondition] = useState('')

  /* 表单实例 */
  const [form] = Form.useForm();

  /* table 列设置 */
  const columns = [
    {
      title: '员工账号',
      dataIndex: 'log_account',
    },
    {
      title: '员工姓名',
      dataIndex: 'log_name',
    },
    {
      title: '操作模块',
      dataIndex: 'log_module',
    },
    {
      title: '操作内容',
      dataIndex: 'log_content',
    },
    {
      title: '时间',
      dataIndex: 'log_time',
    },
    {
      title: '操作',
      dataIndex: 'log_operate',
      render: (_,record) => {
        return (
          <Space>
            <Button type="link" onClick={() => showDeleteConfirm(record.log_id)}>删除</Button>
          </Space>
        )
      }
    },
  ];

  /* 日志操作数据源 */
  const [logData, setLogData] = useState([])

  const  [paginationProps] = useState(
    {
      defaultPageSize: 4,
      position: ['bottomCenter'],
      pageSizeOptions:[4,6,8],
      showQuickJumper:true,
      showSizeChanger: true,
      showTotal: (total)=> (<Space><div>共 {total} 条</div></Space>)
     }
  );

  /* useEffect 生命周期函数 */
  useEffect(() => {
    //请求获取数据
    getOperationLogDataApi(condition).then(res => {
      if (res.code === '200') {
        setLogData(res.data)
      }else{
        openNotificationWithIcon('error')
        setLogData([])
      } 
    })
    .catch(err => {
      console.log(err);
    })
  },[])


  /* 导出 */
  const OnExportLog = () => {
    let header = {}
    columns.forEach(item => {
      header[item.dataIndex] = item.title
    })
   delete header.log_operate

   console.log(header);

    exportToExcel(header,logData,'operation-log')
  }

  /* 防抖函数封装 */
  const testDebounce = _.debounce(OnExportLog, 2000, {
    leading: true,
    trailing: false
  })



  /* 条件搜索 */
  const onFinish = (values) => {
    const { search_condition } = values
    setCondition(search_condition)
    getOperationLogDataApi(search_condition).then(res => {
      setLogData(res.data)
    })
  };
  /* 重置 */
  const onReset = () => {
    form.resetFields();
    setCondition(' ')
    //请求获取数据
    getOperationLogDataApi(' ').then(res => {
      setLogData(res.data)
    })
  };

  /* 设置 table 条纹 */
  const getRowClassName = (record, index) => {
    let className = '';
    className = index % 2 === 0 ? 'logOddRow' : 'logEvenRow';
    return className;
  }

  /* 模态框-确认删除 */
  const showDeleteConfirm = (id) => {
    console.log(id);
    confirm({
      title: '删除确认',
      icon: <ExclamationCircleOutlined />,
      content: <h2>你确定删除此日志信息吗？</h2>,
      okText: '确认',
      okType: 'danger',
      cancelText: '取消',
      onOk() {
        // 调用接口 删除该数据
        delLogDataByIdApi(id).then(res =>{
          if (res.code === '200') {
            message.success('删除成功')
            getOperationLogDataApi(condition).then(resp => {
              if (resp.code === '200') {
                setLogData(resp.data)
              }else{
                setLogData([])
                openNotificationWithIcon('error')
              } 
            })
            .catch(err => {
              console.log(err);
            })
          }else{
            message.error('删除失败')
          }
        })
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  };

  /* 通知提醒框 */
  const openNotificationWithIcon = (type) => {
    notification[type]({
      message: '消息提示',
      description:
        '没有数据了，别乱搞了呀....',
    });
  };


  return (
    <>
      <div>
        <Space className='staff-btnTop'>
          <Button onClick={testDebounce} size={'large'}>导出</Button>
        </Space>
      </div>
      <div>
        <Form form={form} layout="inline" onFinish={onFinish} className='staff-form'>
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
      <div className='operationLog'>
        <Table
          style={{'width': '100%'}}
          bordered={true}
          columns={columns}
          dataSource={logData}
          pagination={paginationProps}  
          rowClassName={getRowClassName}
          title={() => '日志操作记录'}
          footer={() => 'Footer'}
        />
      </div>
    </>
    
  )
}
