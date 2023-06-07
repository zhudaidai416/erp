import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { SearchOutlined, PaperClipOutlined, SettingOutlined, PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, Table, Pagination, Space, message, Upload } from 'antd';
import '../index.scss';
import './receipt.scss';

export default function AddReceipt() {
  // 上传附件.pdf,.word,.xls,.txt,.jpg,.png,.rar,.zip
  // pdf,word,xls,txt,jpg,png,rar,zip
  const [file, setFile] = useState('');
  const props = {
    name: 'file',
    accept: '.pdf,.word,.xls,.txt,.jpg,.png,.rar,.zip',
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      console.log(info)
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功！`);
        setFile(info.file.name);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败！`);
      }
    },
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent) => percent && `${parseFloat(percent.toFixed(2))}%`,
    },
  };
  // 表头参数
  const columns = [
    {
      title: <SettingOutlined />,
      dataIndex: 'operate',
      align: 'center'
    },
    {
      title: '序号',
      dataIndex: 'id',
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
      dataIndex: 'receipt_money',
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
  const [tableData, setTableData] = useState([
    {
      key: '0',
      operate: <><PlusCircleOutlined /><MinusCircleOutlined /></>,
      id: '1',
      receipt_money: <Input />,
      discount_money: '',
      receipt_money: '',
      pay_way: '',
      notes: ''
    }
  ]);
  // 提交
  const onSubmit = (fieldsValue) => {
    const values = {
      ...fieldsValue,
      'pay_date': fieldsValue['pay_date'] ? fieldsValue['pay_date'].format('YYYY-MM-DD') : undefined,
      'accessory': file
    };
    console.log('提交的数据：', values);
  };
  // 取消提交
  const navigate = useNavigate();
  const cancelSubmit = () => {
    navigate('/receipt');
  }
  return (
    <div className='page-content'>
      <div className='top'>
        <div className='title'>收款单</div>
        <div className='receipt-id'>单据编号：SK20170725022</div>
      </div>
      <Form
        name="normal_login"
        // className="search-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSubmit}
      >
        <div className="add-form">
          <Form.Item name="pay_name" className='form-item' label='付款方' colon={false} >
            <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="客户名称/编码" />
          </Form.Item>
          <Form.Item name="all_receipt_money" className='form-item' label='总应收款（元）' colon={false} >
            <Input placeholder="0.00" />
          </Form.Item>
          <Form.Item name="handled_person" className='form-item' label='经手人' colon={false} >
            <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="姓名/手机" />
          </Form.Item>
          <Form.Item name="pay_date" className='form-item' label='付款日期' colon={false} >
            <DatePicker />
          </Form.Item>
        </div>

        <Table
          bordered={true}
          dataSource={tableData}
          columns={columns}
          style={{
            marginBottom: '20px'
          }}
          pagination={false}
          summary={() => (
            <Table.Summary fixed>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>总计</Table.Summary.Cell>
                <Table.Summary.Cell index={1}></Table.Summary.Cell>
                <Table.Summary.Cell index={2}></Table.Summary.Cell>
                <Table.Summary.Cell index={3}></Table.Summary.Cell>
                <Table.Summary.Cell index={4}></Table.Summary.Cell>
                <Table.Summary.Cell index={5}></Table.Summary.Cell>
                <Table.Summary.Cell index={6}></Table.Summary.Cell>
              </Table.Summary.Row>
            </Table.Summary>)}
        />
        <Form.Item name="receipt_notes" label='收款备注' colon={false} >
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="accessory" label='附件信息' colon={false} >
          <Upload {...props}>
            <PaperClipOutlined />上传附件
          </Upload>
          <div className='word-prompt'>（单个附件最大支持20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、RAR、ZIP）</div>
        </Form.Item>
        <Form.Item className='bottom'>
          <Button size="large" onClick={cancelSubmit}>取消</Button>
          <Button type="primary" size="large" className="bottom-second-btn" htmlType="submit">保存并提交</Button>
        </Form.Item>
      </Form>
    </div>
  )
}
