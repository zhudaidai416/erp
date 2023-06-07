
import {selectOrderDataApi,auditDataApi} from '../../../http/sale_api/sale'

import React,{ useState, useEffect } from 'react'
import { Space, Table, Button,Select ,DatePicker ,Cascader,ConfigProvider,Input ,message, Upload,Typography ,Modal ,Tabs ,Alert} from 'antd';
import { UserOutlined ,AudioOutlined,SearchOutlined,UploadOutlined ,SettingOutlined} from '@ant-design/icons';
import { useNavigate,useParams ,useSearchParams} from "react-router-dom";
import './index.scss'
import zhCN from 'antd/es/locale/zh_CN';
const { Text } = Typography;





const DetailsSale=()=>{

  const [dataList, setDataList] = useState([]);  //Table表格数据
  const [dataObj, setDataObj] = useState({});  //页面数据

  // const params=useParams();
  // console.log('获取动态参数',params);
  const [searchParams, setSearchParams] = useSearchParams()

  // console.log('获取查询参数：', searchParams.get('order_id'));
  var my_data
  useEffect(() => {
     my_data={order_id:parseInt(searchParams.get('order_id')) }
    setSearchParams(my_data)
    if (my_data.order_id) {
      selectOrderDataApi(my_data).then( (res)=>{
        console.log(res);
        setDataObj(res.data.resp)
        setDataList(res.data.resp2.map((item,index)=>{
          item.key=item.order_id
          item.serial=index+1
          item.subtotal=item.order_form_sum*item.goods_price
          return item
        }))
  
      })
      .catch((err)=>{
        console.log(err);
      })
    }
    
  }, []);

  const audit=(data1,isTrue)=>{     //审核通过与不通过
    const dataObj={
      data1,
      isTrue
    }
    if (true) {
      auditDataApi(dataObj).then((res)=>{
        console.log(res);
        navigate('/sale/sales')
      }).catch((err)=>{
        console.log(err);
      })
    }
  }

  const navigate=useNavigate();
  const submit=()=>{
    // let totalMoney=total()
    // let table={
    //   totalMoney,
    //   state:'待审核'
    // }
    // console.log(dataObj);
    // addOrderDataApi(table).then( (res)=>{
    //   console.log(res);
    //   })
    //   .catch((err)=>{
    //     console.log(err);
    //   })
    // for (let i = 0; i < dataObj.length; i++) {
    //   let table={
        
    //     goods_id:dataObj[i].goods_id,
    //     amount:parseInt(dataObj[i].amount),
    //   }
    //   addOrderNumberDataApi(table).then( (res)=>{
    //     console.log(res);
    //     })
    //     .catch((err)=>{
    //       console.log(err);
    //     })
    // }
    // navigate('/saleOrder')
  }

    const columns = [  //Table表格表头
      {
        title: <SettingOutlined />,
        dataIndex: 'operation',
      },
      {
        title: '序号',
        dataIndex: 'serial',
      },
      {
        title: '商品编号',
        dataIndex: 'goods_id',
      },
      {
        title: '商品图片',
        dataIndex: 'goods_picture',
        render: (_,record) => (
          <Space size="middle" >
          <img src={record.goods_picture} style={{width:'50px',height:'50px'}} alt="" />
          </Space>
        ),
      },
      {
        title: '商品名称',
        dataIndex: 'goods_name',
      },
      {
        title: '商品规格',
        dataIndex: 'goods_specifications',
      },
      {
        title: '数量',
        dataIndex: 'order_form_sum',
      },
      {
        title: '单位',
        dataIndex: 'goods_uni',
      },
      {
        title: '单价（元）',
        dataIndex: 'goods_price',
      },
      {
        title: '小计（元）',
        dataIndex: 'subtotal',
        render: (_,record) => (
          <Space size="middle" >
           <Text>{record.order_form_sum*record.goods_price}</Text>
          </Space>
        ),
      },
      {

        title: '商品库存',
        dataIndex: 'goods_inventory',
      },
      {
        title: '备注',
        dataIndex: 'goods_classification',
      },
    ];

    return  (
     
        <div className='content'> 
           <div className='header'>
                <div className='header_right' style={{color:'red',fontSize:'20px'}}>
                  {dataObj.order_state}
                </div>
                <div className='header_center'>销售单</div>
                <div className='header_right' >
                  单据编号：<span style={{textDecoration:'underline'}}>{dataObj.order_number}</span>
                </div>
           </div>
           <div className='sale_body'>
                出库仓库：<span className='saleDetail_group'>{dataObj.order_stores}-{dataObj.order_warehouse}</span>
                客户：<span className='saleDetail_group'>{dataObj.order_name}</span>
                经办人：<span className='saleDetail_group'>{dataObj.order_person}</span>
                业务日期：<span className='saleDetail_group'>{dataObj.order_time}</span>
           </div>
           <div className='sale_group'>
            <Table
              columns={columns}
              dataSource={dataList}
              pagination={false}
              bordered
              summary={(pageData) => {
                let totalBorrow = 0;
                let totalRepayment = 0;
                pageData.forEach(({ order_form_sum, subtotal }) => {
                  totalBorrow += order_form_sum;
                  totalRepayment += subtotal;
                });
                return (
                  <>
                    <Table.Summary.Row>
                      <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
                      <Table.Summary.Cell index={1}>
                        <Text type="danger">{}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={2}>
                        <Text>{}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={3}>
                        <Text>{}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={4}>
                        <Text>{}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={5}>
                        <Text>{}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={6}>
                        <Text>{totalBorrow}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={7}>
                        <Text>{}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={8}>
                        <Text>{}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={9}>
                        <Text>{totalRepayment}</Text>
                      </Table.Summary.Cell>
                      <Table.Summary.Cell index={10}>
                        <Text>{}</Text>
                      </Table.Summary.Cell>
                    </Table.Summary.Row>
                   
                  </>
                );
              }}
            />
          </div>

           <div className='sale_body' style={{marginTop:'20px'}}>
              折扣率%：<span className='saleDetail_group'>{dataObj.order_discount}</span>
              折扣金额（元）：<span className='saleDetail_group'>{dataObj.order_discount_money}</span>
              附加金额（元）：<span className='saleDetail_group'>{dataObj.order_additional}</span>
              结算方式：<span className='saleDetail_group'>{dataObj.order_method}</span>
           </div>
           <div className='sale_body'>
              单据备注：<span className='saleDetail_group'>{dataObj.order_note}</span>
           </div>
           <div className='sale_body'>
              附件信息：<span className='saleDetail_group'>{'无'}</span>
           </div>
           <div className='sale_body'>
              制单人：<span className='saleDetail_group'>{dataObj.order_person}</span>
              制单日期：<span className='saleDetail_group'>{dataObj.order_time}</span>
           </div>

           <div className='sale_foot'>
              <div>
                <Text className='sale_group'>总计金额  ¥ <Text style={{fontSize:'30px',color:'red',marginRight:'40px'}}> {dataObj.order_money}</Text></Text>
                <Text>实收金额  ¥ <Text style={{fontSize:'30px',color:'red'}}> {dataObj.order_money}</Text></Text>
              </div>
              <div>
                <Button className='sale_group' size='large' onClick={()=>navigate('/sale/sales')}>取消</Button>
                <Button className='sale_group' size='large'>导出</Button>
                <Button className='sale_group' size='large'>打印</Button>
                <Button className='sale_group' size='large'>删除</Button>
                <Button className='sale_group' size='large'>复制</Button>
                <Button className='sale_group' size='large'>修改</Button>
                <Button type="primary" danger className='sale_group'  size='large'   onClick={()=>audit(dataObj.order_id,false)}>审核不通过</Button>
                <Button style={{backgroundColor:'green',color:'white'}} size='large' onClick={()=>audit(dataObj.order_id,true)}>审核通过</Button>
              </div>
           </div>
        </div>
      

    )
}

export default  DetailsSale