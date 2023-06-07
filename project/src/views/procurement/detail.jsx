import React, { useEffect, useState } from 'react'
import '../../assets/scss/procurement/detail.scss'
import { Table , Typography , Button } from 'antd';
import { SettingOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';

import http1 from "../../config/axios"


export default function Receipt() {
    const navigate = useNavigate()
    const { Text } = Typography;
    const http = http1('http://localhost:3060')
    //按钮大小
    const [size, setSize] = useState('large')
    //审核状态
    const [state,setstate] = useState()
    //图片地址拼接
    const src = 'http://172.16.114.185:3060/procurement'
    

    //表格
    //表格头
    const columns = [
        {
          title: (_,record) => (
                <SettingOutlined />
              ),
          dataIndex: 'caozuo'
        },
        {
          title:'序号',
          dataIndex: 'key'
        },
        {
          title:'商品编号',
          dataIndex: 'numbering'
        },
        {
            title: '商品图片',
            dataIndex: 'img',
            render: (_, record) =>(
              <div>
                <img className='tableimg' src={`${src+record.img}`} alt="" />
              </div>
            ),
        },
        {
            title:'商品名称',
            dataIndex: 'm_name'
        },
        {
            title:'商品规格',
            dataIndex: 'specification'
        },
        {
          title: '数量',
          dataIndex: 'num',
        //   defaultSortOrder: 'descend',
          sorter: (a, b) => a.num - b.num,
        },
        {
            title:'单位',
            dataIndex: 'unit'
        },
        {
            title: '采购单价(元)',
            dataIndex: 'Price',
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.Price - b.Price,
        },
        {
            title: '小计',
            dataIndex: 'xiaoji',
            render: (_, record) =>(
                <div>
                  <div>{record.num*record.Price}.00</div>
                </div>
              ),
        },
        {
            title: '生成日期',
            dataIndex: 'date',
            // defaultSortOrder: 'descend',
            sorter: (a, b) => a.date - b.date,
        },
        {
          title: '备注',
          dataIndex: 'beizhu'
        },
      ];
    //表格内容
    const [data,setdata] = useState([])
    //表格变动函数
    const onChange = (pagination, filters, sorter, extra) => {
        console.log('params', pagination, filters, sorter, extra);
    };
    //单据号更改
    const [danju,setdanju] = useState()
    //入库仓库更改
    const [warehouse,setwarehouse] = useState()
    //供应商更改
    const [vendor,setvendor] = useState()
    //业务日期更改
    const [date,setdate] = useState()
    //经手人更改
    const [Handlers,setHandlers] = useState()
    //附加金额更改
    const [attach,setattach] = useState()
    //支付方式更改
    const [tlement,settlement] = useState()
    //备注更改
    const [remark,setremark] = useState()
    //附件链接更改
    const [url,seturl] = useState()
    //总计金额
    const [total,settotal] = useState()
    // 实付金额
    const [pay,setpay] = useState()
    //合计计算
    const [heji,setheji] = useState()
    //单价计算 
    const [danjia,setdanjia] = useState()
    //数量计算
    const [num,setnum] = useState()

    // 删除按钮
    const delxinxi = () =>{
        DelData(danju)
    }



    //后端请求函数堆
    //根据单据拿取页面信息
    const getData = async (key) => {
        http({
          method: 'get',
          url: '/caigou/procurement/detailindex',
          params: {
            key
          }
        })
        .then(res => {
            console.log(res);
            setstate(res.data.data[0].state)
            setwarehouse(res.data.data[0].warehouse)
            setvendor(res.data.data[0].vendor)
            setdate(res.data.data[0].p_data+' '+res.data.data[0].time)
            setHandlers(res.data.data[0].Handlers)
            setattach(res.data.data[0].attach)
            settlement(res.data.data[0].settlement)
            setremark(res.data.data[0].remark)
            seturl(res.data.data[0].annex)
            settotal(res.data.data[0].total)
            setpay(res.data.data[0].pay)
            setheji(res.data.data[0].heji)
            tableData(key)
        })
        .catch(err => {
          console.log(err);
        })
    }
    //根据单据拿取内部表格
    const tableData = async (key) => {
        http({
          method: 'get',
          url: '/caigou/procurement/detaildata',
          params: {
            key
          }
        })
        .then(res => {
            // console.log(res);
            res.data.arr.map((item,index)=>{
                item.key = item.id
                item.num = res.data.data[index].num
                item.date = res.data.data[index].date
                return item
            })
            console.log(res.data.arr);
            setdata(res.data.arr)
        })
        .catch(err => {
            console.log(err);
        })
    }
    //根据id删除信息
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
          navigate('/procurement')
          })
          .catch(err => {
            console.log(err);
          })
      }
    //生命周期函数
    useEffect(()=>{
        setdanju(sessionStorage['D_id'])
        getData(sessionStorage['D_id'])
        let pro = 0
                data.forEach(({Price})=>{
                    setdanjia((pre)=>{
                    pro+=Number(Price)
                    return pro
                  })
                })
        let prd = 0
                data.forEach(({Price})=>{
                    setnum((pre)=>{
                    prd+=Number(Price)
                    return prd
                  })
                })
    },[])
  return (
    <div className='yemian'>
        <div className='detail1'>
            <div className='shenhe'>{state}</div>
            <div className='caigou'>采购单</div>
            <div className='danju'>单据编号：{danju}</div>
        </div>
        <div className='detail2'>
            <div>入库仓库：{warehouse}</div>
            <div>供应商：{vendor}</div>
            <div>经手人：{Handlers}</div>
            <div>业务日期：{date}</div>
        </div>
        <div className='detail3'>
        <Table
            columns={columns}
            dataSource={data}
            onChange={onChange}
            bordered
            summary={() => {
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text type="danger">{num}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text type="danger">{danjia}.00</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text type="danger">{heji}.00</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                    <Table.Summary.Cell index={0}></Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
            pagination={{ pageSizeOptions:[1,2,3,4],showSizeChanger:true,defaultPageSize:3,total:data.length,showTotal:(total)=>(<div>总商品条数{total}</div>)}} 
          />
        </div>
        <div className='detail4'>
            <div>附加金额：{attach}元</div>
            <div>结算方式：{tlement}</div>
        </div>
        <div className='detail5'>
            <div>备注：{remark}</div>
        </div>
        <div className='detail6'>
            <div>附件：<a href={url}>点击查看附件</a></div>
        </div>
        <div className='detail7'>
            <div>
                <div>总计金额  ¥ <div className='num'>{total}</div></div>
                <div>实付金额  ¥ <div className='num1'>{pay}</div></div>
            </div>
            <div className='anniu'>
                <Button size={size}>取消</Button>
                <Button size={size}>修改</Button>
                <Button size={size} onClick={delxinxi}>删除</Button>
                <Button type="primary" className='no' size={size}>审核不通过</Button>
                <Button type="primary" className='yes' size={size}>审核通过</Button>
            </div>
        </div>
    </div>
  )
}
