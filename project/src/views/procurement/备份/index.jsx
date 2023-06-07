import React, { useState } from 'react'
import { Button , Select , DatePicker , Space, Input ,Table , ConfigProvider , Popconfirm } from 'antd';
// import '../../assets/scss/procurement/index.scss'
import zhCN from "antd/es/date-picker/locale/zh_CN"
import { SearchOutlined } from '@ant-design/icons';
import zhCN1 from 'antd/es/locale/zh_CN';
import { Link } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');

export default function Receipt() {
    const { RangePicker } = DatePicker;

    const columns = [
        {
          title: '提交时间',
          dataIndex: 'data',
        },
        {
          title: '单据编号',
          dataIndex: 'uid',
        },
        {
          title: '供应商名称',
          dataIndex: 'gyname',
        },
        {
          title: '采购金额(元)',
          dataIndex: 'jine',
        },
        {
          title: '门店',
          dataIndex: 'mendian',
        },
        {
          title: '仓库',
          dataIndex: 'cangku',
        },
        {
          title: '状态',
          dataIndex: 'state',
          render: (_, record) =>(
            <div className='chaozuo'>
              <p className={record.state === 1 ? 'weitijiao' : record.state === 2 ? 'daishenhe' : record.state === 3 ? 'shenhetongguo'  : 'shenheshibai' }>{record.state === 1 ? '未提交': record.state === 2 ? '待审核' : record.state === 3 ? '审核通过'  : '审核失败'}</p>
              {/* <p>未提交</p>
              <p>待审核</p>
              <p>审核通过</p>
              <p>审核失败</p> */}
            </div>
          ),
        },
        {
          title: '操作',
          dataIndex: 'set',
          render: (_, record) =>(
            <div className='chaozuo'>
              <p>审核</p>
              <p>复制</p>
              <p>详情</p>
              <Popconfirm title="是否删除?" onConfirm={() => handleDelete(record.key)}>
                <p>删除</p>
              </Popconfirm>
            </div>
          ),
            
          // render: (_, record) => (
          //   <Space size="middle">
          //     <p>Invite {record.name}</p>
          //     <p onClick={handleDelete}>Delete</p>
          //   </Space>
          // ),
        },
      ];
      const handleDelete = (key) => {
        if(selectedRowKeys.length === 0){
          const newdata = data.filter((item) => item.key !== key);
          setdata(newdata);
        }else {
          const newdata = data.filter((item) => !selectedRowKeys.includes(item.key));
          setdata(newdata);
          console.log(selectedRowKeys.value);
        }
      };
      const [data, setdata] = useState ([]);
      for (let i = 0; i < 100; i++) {
        data.push({
          key: i,
          data: `2020/03/09 10:55 [${i}]`,
          uid: `CG2017072502${i}`,
          gyname: `广汇商贸 [${i}]`,
          jine: `￥${i}0000`,
          mendian: `总店 [${i}]`,
          cangku: `总店-仓库一 [${i}]`,
          state: Math.ceil(Math.random()*(3-0)+0),
          set: `操作 [${i}]`,
        });
      }

      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  return (
    <div className='yemian'>
        {/* 第一行按钮 */}
        <div className='hang1'>
            <Button type="primary" size={ "large" }><Link to="/procurement/add">新增</Link></Button>
            <Button size={ "large" }>批量操作</Button>
            <Button size={ "large" }>导入</Button>
            <Button size={ "large" }>导出</Button>
        </div>
        {/* 第一行按钮 */}
        {/* 第二行搜索 */}
        <div className='hang2'>
            <div className='onselect'>
                <div>状态</div><Select
                    defaultValue="请选择"
                    style={{
                        width: 120,
                    }}
                    // onChange={handleChange}
                    options={[
                        {
                        value: '全部',
                        label: '全部',
                        },
                        {
                        value: '未提取',
                        label: '未提取',
                        },
                        {
                        value: '待审核',
                        label: '待审核',
                        },
                        {
                        value: '审核通过',
                        label: '审核通过',
                        },
                        {
                        value: '审核失败',
                        label: '审核失败',
                        },
                    ]}
                    />
            </div>
            <div className='dataselect'>
                <div>业务日期</div>
                <div>
                    <Space direction="vertical" size={12} >
                        <RangePicker locale={zhCN} placeholder={["请选择日期","请选择日期"]} />
                    </Space>
                </div>
            </div>
            <div className='sousuo'>
                <Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} />
                <Button type="primary" size={ "small" }>搜索</Button>
                <Button size={ "small" }>重置</Button>
            </div>
        </div>
        {/* 第二行搜索 */}
        {/* 第三行表格 */}
        <div className='hang3'>
          <ConfigProvider locale={zhCN1}>
            <Table className='ontable' rowSelection={rowSelection} columns={columns} dataSource={data} />
          </ConfigProvider>
        </div>
        {/* 第三行表格 */}
    </div>
  )
}
