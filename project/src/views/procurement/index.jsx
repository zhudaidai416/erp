import React, {useEffect, useState } from 'react'
import { Button , Select , DatePicker , Space, Input ,Table , ConfigProvider , Popconfirm } from 'antd';
import '../../assets/scss/procurement/index.scss'
import zhCN from "antd/es/date-picker/locale/zh_CN"
import { SearchOutlined } from '@ant-design/icons';
import zhCN1 from 'antd/es/locale/zh_CN';
import { Link , useNavigate } from 'react-router-dom';

import moment from 'moment';
import 'moment/locale/zh-cn';
//axion配置
import http1 from "../../config/axios"
const http = http1('http://localhost:3060')
moment.locale('zh-cn');


export default function Receipt() {
    const { RangePicker } = DatePicker;
    const navigate = useNavigate()

      //表格表头设置
      const columns = [
          {
            title: '提交时间',
            dataIndex: 'date',
            render: (_, record) =>(
              <div>
                {record.p_data+' '+record.time}
              </div>
            ),
          },
          {
            title: '单据编号',
            dataIndex: 'D_id',
          },
          {
            title: '供应商名称',
            dataIndex: 'vendor',
          },
          {
            title: '采购金额(元)',
            dataIndex: 'total',
          },
          {
            title: '门店',
            dataIndex: 'zongdian',
          },
          {
            title: '仓库',
            dataIndex: 'warehouse',
          },
          {
            title: '状态',
            dataIndex: 'state',
            render: (_, record) =>(
              <div className='chaozuo'>
                <p className={record.state === '未提交' ? 'weitijiao' : record.state === '待审核' ? 'daishenhe' : record.state === '审核通过' ? 'shenhetongguo'  : 'shenheshibai' }>{record.state === '未提交' ? '未提交': record.state === '待审核' ? '待审核' : record.state === '审核通过' ? '审核通过'  : '审核失败'}</p>
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
                {record.state === '待审核' ? <p>审核</p> : <p>&emsp;&emsp;</p>}
                <p>复制</p>
                <p onClick={() => xiangqin(record.D_id)}>详情</p>
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
      //多选删除和删除
      const handleDelete = (key) => {
        if(selectedRowKeys.length === 0){
          DelData([key])
        }else {
          DelData(selectedRowKeys)
        }
        console.log(key);
      };
      //表格数据存储
      const [data, setdata] = useState ([]);
      //详情跳转
      const xiangqin = (key) =>{
        sessionStorage.setItem('D_id',key);
        navigate('/procurement/detail')
      } 

      //后端请求函数堆
      //根据条件拿取信息表
      const getData = async (select,datatime,value) => {
        http({
          method: 'post',
          url: '/caigou/procurement/getindexdata',
          data: {
            select,
            datatime,
            value
          }
        })
        .then(res => {
          if(res.code === '202'){
            console.log('从后端拿到的数据',res);
            // let arr1 = []
            let arr = res.data.map((item) => {
              item.key = item.id
              item.zongdian = item.warehouse[0]+item.warehouse[1]
              item.p_data = item.BusinessDate.split('T')
              return {'key':item.key,'p_data':item.p_data[0],'time':item.time,'D_id':item.D_id,'vendor':item.vendor,'total':item.total,'zongdian':item.zongdian,'warehouse':item.warehouse,'state':item.state}
            });
            console.log(arr);
            // console.log(new Date().toLocaleDateString());
            setdata(arr)
            console.log(data);
          }
        })
        .catch(err => {
          console.log(err);
        })
      }
      const DelData = async (arr) => {
        http({
          method: 'post',
          url: '/caigou/procurement/deldata',
          data: {
            arr
          }
        })
        .then(res => {
          console.log('从后端拿到的数据',res);
          getData(select,datatime,value)
          })
          .catch(err => {
            console.log(err);
          })
      }
      //状态条件搜索选择
      const [select,setselect] = useState('')
      const handleChange = (value) =>{
        console.log('状态',value);
        setselect(value)
      }
      //日期条件搜索
      const [datatime,setdatatime] = useState([])
      const ontime = (value) => {
        console.log(value);
        let a = new Date(value[0]._d).toLocaleDateString()
        let b = new Date(value[1]._d).toLocaleDateString()
        datatime.push(a,b)
        console.log(datatime);
      }
      //input框搜索
      const [value,setvalue] = useState('')
      const input = (value) =>{
        console.log(value.target.value);
        setvalue(value.target.value)
      }
      //搜索点击事件函数
      const sousuo = ()=>{
        getData(select,datatime,value)
      }

      //多选函数
      const [selectedRowKeys, setSelectedRowKeys] = useState([]);
      const onSelectChange = (newSelectedRowKeys) => {
        console.log('多选选择了的key值为', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
      };
      const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
      };


  //生命周期函数
  useEffect(()=>{
    getData(select,datatime,value)
  },[])

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
                    onChange={handleChange}
                    options={[
                        {
                        value: '',
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
                        <RangePicker locale={zhCN} placeholder={["请选择日期","请选择日期"]} onChange={ontime} />
                    </Space>
                </div>
            </div>
            <div className='sousuo'>
                <Input placeholder="请输入关键词搜索" prefix={<SearchOutlined />} onBlur={input} />
                <Button type="primary" size={ "small" } onClick = {sousuo}>搜索</Button>
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
