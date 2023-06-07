
import {getDataApi,addOrderDataApi,addOrderNumberDataApi} from '../../../http/sale_api/sale'

import React,{ useState, useEffect } from 'react'
import { Space, Table, Button,Select ,DatePicker ,Cascader,ConfigProvider,Input ,message, Upload,Typography ,Modal ,Tabs ,Alert} from 'antd';
import { UserOutlined ,AudioOutlined,SearchOutlined,UploadOutlined ,SettingOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './index.scss'
import zhCN from 'antd/es/locale/zh_CN';
const { Text } = Typography;





const AddSaleOrder=()=>{

  const [documentNumber, setDocumentNumber] = useState();  //单据编号
  const documentNumberChange=(e)=>{                        //单据编号输入框改变的回调函数
    setDocumentNumber(e.target.value)
  }

  const [warehouse, setWarehouse] = useState([]);  //仓库
  const warehouseOptions = [                       //出库仓库下拉列表
  {
    value: '总部',
    label: '总部',
    children: [
      {
        value: '北京仓库一',
        label: '北京仓库一',
      },
      {
        value: '北京仓库二',
        label: '北京仓库二',
      },
    ],
  },
  {
    value: '分部',
    label: '分部',
    children: [
      {
        value: '成都仓库一',
        label: '成都仓库一',
      },
      {
        value: '成都仓库二',
        label: '成都仓库二',
      },
    ],
  },
  ];
  const warehouseChange = (value) => {             //仓库下拉框改变的回调函数
    console.log(value);
    setWarehouse(value)
    console.log(warehouse);
  };

  const [customer, setCustomer] = useState();  //客户
  const customerOption=[                       //客户下拉列表
      {
      value: '孙悟空',
      label: '孙悟空',
      },
      {
      value: '猪八戒',
      label: '猪八戒',
      },
      {
      value: '沙悟净',
      // disabled: true,
      label: '沙悟净',
      },
      {
      value: '唐僧',
      label: '唐僧',
      },
      {
      value: '如来佛祖',
      label: '如来佛祖',
      },
  ]
  const customerChange = (value) => {          //客户下拉列表状态改变回调函数
      console.log(`selected ${value}`);
      setCustomer(value)
  };

  const [responsiblePerson, setResponsiblePerson] = useState();  //经办人
  const responsiblePersonOption=[                  //经办人下拉列表
      {
      value: '罗乙成',
      label: '罗乙成',
      },
      {
      value: '郑世龙',
      label: '郑世龙',
      },
      {
      value: '朱燕梅',
      // disabled: true,
      label: '朱燕梅',
      },
      {
      value: '赵涛',
      // disabled: true,
      label: '赵涛',
      },
      {
      value: '陈佳豪',
      // disabled: true,
      label: '陈佳豪',
      },
  ]
  const responsiblePersonChange = (value) => {     //经办人状态改变回调函数
      console.log(`selected ${value}`);
      setResponsiblePerson(value)
  };
   
  const [date1, setDate] = useState();         //日期
  const dateChange = (date, dateString) => {   //日期状态改变回调函数
      // console.log(date, dateString);
      const my_date=date._d
      let hours = my_date.getHours() < 10 ? "0" + my_date.getHours() : my_date.getHours()
      let minutes  = my_date.getMinutes() < 10 ? "0" + my_date.getMinutes() : my_date.getMinutes();
      let seconds  = my_date.getSeconds() < 10 ? "0" + my_date.getSeconds() : my_date.getSeconds();
      let str=dateString +' ' + `${hours}:${minutes}:${seconds}`
      setDate(str)
  };

  const [discount, setDiscount] = useState();    //折扣率
  const discountChange = (e) => {                //折扣率输入框改变回调函数
      setDiscount(parseInt(e.target.value))
      setDiscountAmount(total()*(discount/100))
  };

  const [discountAmount, setDiscountAmount] = useState();   //折扣金额
  const discountAmountChange = (e) => {                     //折扣金额输入框改变回调函数
    setDiscountAmount(e.target.value)
  };

  const [additionalAmount, setAdditionalAmount] = useState(); //附加金额
  const additionalAmountChange = (e) => {                     //附加金额输入框改变回调函数
    setAdditionalAmount(parseInt(e.target.value) )
  };

  const [methodSettlement, setMethodSettlement] = useState();   //结算方式
  const methodSettlementOptions=[                               //结算方式下拉列表
  {
  value: '现金',
  label: '现金',
  },
  {
  value: '支付宝',
  label: '支付宝',
  },
  {
  value: '微信',
  // disabled: true,
  label: '微信',
  },
  {
  value: '建设银行',
  label: '建设银行',
  },
  {
  value: '工商银行',
  label: '工商银行',
  },
  ]
  const methodSettlementChange = (value) => {                    //结算方式下拉列表状态改变
    console.log(`selected ${value}`);
    setMethodSettlement(value)
  };

  const [documentNote, setDocumentNote] = useState();   //单据备注
  const documentNoteChange = (e) => {                   //单据备注输入框改变回调函数
    setDocumentNote(e.target.value)
  };
 
  const total=function(){   //利用数组方法计算金额总计
    let sum=0
    dataList.forEach((item)=>{
      sum+=item.subtotal
    })
    return sum
  }
  const navigate=useNavigate();
  const submit=()=>{
    let totalMoney=total()-discountAmount+additionalAmount
    let table={
      documentNumber,
      warehouse,
      customer,
      responsiblePerson,
      date1,
      discount,
      discountAmount,
      additionalAmount,
      methodSettlement,
      documentNote,
      totalMoney,
      state:'待审核'
    }
    console.log(dataList);
    addOrderDataApi(table).then( (res)=>{
      console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
    for (let i = 0; i < dataList.length; i++) {
      let table={
        documentNumber,
        goods_id:dataList[i].goods_id,
        amount:parseInt(dataList[i].amount),
      }
      addOrderNumberDataApi(table).then( (res)=>{
        console.log(res);
        })
        .catch((err)=>{
          console.log(err);
        })
    }
    navigate('/saleOrder')
  }


    const props = {
      name: 'file',
      action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
      headers: {
        authorization: 'authorization-Text',
      },
      onChange(info) {
        if (info.file.status !== 'uploading') {
          console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
          message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
          message.error(`${info.file.name} file upload failed.`);
        }
      },
    };
    const style={
      width:'20px',
      height:'20px',
      backgroundColor:'red',
      borderRadius:'50%',
      cursor:'pointer',
      TextAline:'center',
      lineHeight:'20px',
      color:'white',
      fontSize:'20px',
    }
    const style1={
      width:'20px',
      height:'20px',
      backgroundColor:'green',
      borderRadius:'50%',
      cursor:'pointer',
      TextAline:'center',
      lineHeight:'20px',
      color:'white',
      fontSize:'20px'
    }

    var ddd
    const bbb= (e)=>{
      ddd=e.target.value
      return Promise.resolve()
    }
    const aaa=(e,record)=>{
      if (e.target.value>record.goods_inventory) {
       return   alert('库存不足')

      }
      bbb(e).then(()=>{
        setDataList(dataList.map((item,index)=>{
            if ( item.goods_id==record.goods_id) {
              item.amount=ddd
            }
            item.subtotal=item.amount*item.goods_price
          return item
        }))
      })
    }
    const columns = [  //Table表格表头
      {
        title: <SettingOutlined />,
        dataIndex: 'operation',
        render: (_,record) => (
          <Space size="middle">
            {/* <Text onClick={() => onCheckActivity(record)}>审核</Text> */}
            <div style={style} onClick={showModal}>+</div>
            <div style={style1} onClick={()=>setDataList(dataList.filter((item)=>item.goods_id!=record.goods_id))}>-</div>
          </Space>
        ),
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
        dataIndex: 'amount',
        render: (_,record) => (
          
          record.amount!=undefined?record.amount:
          <Space size="middle" >
            <Input type="text"  onPressEnter={(e)=>aaa(e,record)}  style={{border:'none'}}/>
          </Space>
          // <Space size="middle" >
          //   <Input type="text" value={amountValue}  onChange={setDataList(dataList.map((item,index)=>{
          //     if ( item.goods_id=record.goods_id) {
          //       item.amount=amountValue
          //     }
          //   return item
          // }))}  style={{border:'none'}}/>
          // </Space>
          // <Space size="middle" >
          //   <Input type="text" value={amountValue} onChange={()=>console.log(record.amount)} style={{border:'none'}}/>
          // </Space>
        ),
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
           <Text>{record.amount*record.goods_price}</Text>
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

    const [middleList, setMiddleList] = useState([]);  //Table表格中间数据数据
    const [dataList, setDataList] = useState([{}]);  //Table表格数据
   
   


    //```````````````````模态框``````````
    const [isModalOpen, setIsModalOpen] = useState(false);  //模态框开启
    const [drinkDataList, setIDrinkDataList] = useState([]);  //模态框中饮料表格数据
    const [fruitDataList, setFruitDataList] = useState([]); //模态框中水果表格数据
    const abc=(res)=>{            //解决异步
      setFruitDataList(res.data.data.filter((item)=>item.goods_classification=="水果"))
      setIDrinkDataList(res.data.data.filter((item)=>item.goods_classification=="饮料"))
      return  Promise.resolve()
    }
    const showModal = () => {      //模态框打开
      
        getDataApi().then( (res)=>{
          res.data.data=res.data.data.map((item,index)=>{
            item.key=item.goods_id
            return item
          })
          console.log(res); 
            abc(res).then(()=>{
              console.log(drinkDataList)
              setIsModalOpen(true);
            })
          })
          .catch((err)=>{
            console.log(err);
          })
    };
    const [selectedKeys, setSelectedKeys] = useState([]); //模态框中表格选中后解决清除选中状态
    const handleOk = () => {   //模态框点击确认按钮
      setSelectedKeys([])  //模态框点击确认将选中的列清空
      setIsModalOpen(false);    //将模态框关闭
      // setMiddleList(middleList.map((item,index)=>{
      //     item.serial=index+1;
      //     return item
      // }))
      // setDataList([...dataList,...middleList])
      if (dataList.length==1&&dataList[0].goods_name==undefined) {
        setDataList([...middleList].map((item,index)=>{
          item.serial=index+1;
          return item
        }))
      }else{
        setDataList([...dataList,...middleList].map((item,index)=>{
          item.serial=index+1;
          return item
        }))
      }
    };
    const handleCancel = () => {   //模态框点击取消按钮
      setIsModalOpen(false);
    };
    //```````````````````模态框``````````

    //```````````````````tab选项卡``````````
    const onChange6 = (key) => {
      console.log(key);
    };
    //```````````````````tab选项卡``````````

    const rowSelection = {
      selectedRowKeys: selectedKeys,
      onChange: (selectedRowKeys, selectedRows) => {

        setMiddleList([...selectedRows].filter((item,index)=>{
          for (let i = 0; i < dataList.length; i++) {
            if ( item.goods_name==dataList[i].goods_name) {
              return false
            }
          }
          return true
        }))
        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        setSelectedKeys(selectedRowKeys)
      },
      
      // getCheckboxProps: (record) => ({
      //   disabled: record.name === 'Disabled User',
      //   // Column configuration not to be checked
      //   name: record.name,
      // }),
      
    };


    const columns_1 = [
      {

        title: '商品名称',
        dataIndex: 'goods_name',
      //   render: (Text) => <a>{Text}</a>,
      },
      {

        title: '商品价格',
        dataIndex: 'goods_price',
      },
      {

        title: '商品库存',
        dataIndex: 'goods_inventory',
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

        title: '商品分类',
        dataIndex: 'goods_classification',
      },
      {

        title: '商品规格',
        dataIndex: 'goods_specifications',
      },
      {

        title: '单位',
        dataIndex: 'goods_uni',
      },

    ];

    
   
    return (
        <div className='content'> 
           <div className='header'>
                <div className='header_center'>销售单</div>
                <div className='header_right'>
                  单据编号：<Input className='sale_group' value={documentNumber} onChange={documentNumberChange} style={{width:'200px'}} size="middle" placeholder="请输入"  />
                </div>
           </div>
           <div className='sale_body'>
                出库仓库：<Cascader className='sale_group' options={warehouseOptions} onChange={warehouseChange} placeholder="请选择" style={{width:'150px'}} />

                客户：<Select
                    className='sale_group'
                    defaultValue="客户名称/编码"
                    style={{
                        width: 180,
                    }}
                    value={customer}
                    onChange={customerChange}
                    options={customerOption}
                    suffixIcon={<SearchOutlined/>}
                />

                经办人：<Select
                    className='sale_group'
                    defaultValue="姓名/手机"
                    style={{
                        width: 180,
                    }}
                    value={responsiblePerson}
                    onChange={responsiblePersonChange}
                    options={responsiblePersonOption}
                    suffixIcon={<SearchOutlined/>}
                />
                业务日期： <ConfigProvider locale={zhCN} >
                            <Space direction="vertical">
                                <DatePicker onChange={dateChange}   className='sale_group'/>
                            </Space>
                        </ConfigProvider>   

                {/* <Button type="primary" onClick={showModal}>添加商品</Button>
                <Button type="primary" onClick={()=>(console.log(new Date()))}>时间</Button> */}
                <Modal  open={isModalOpen} onOk={handleOk} onCancel={handleCancel}  width='1200px'>
                  <Tabs defaultActiveKey="1" onChange={onChange6}>
                    <Tabs.TabPane tab="饮料" key="1">
                      <Table
                          rowSelection={{
                          ...rowSelection,
                          }}
                          columns={columns_1}
                          dataSource={drinkDataList}
                          pagination={false}
                      />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="水果" key="2">
                      <Table
                            rowSelection={{
                            ...rowSelection,
                            }}
                            columns={columns_1}
                            dataSource={fruitDataList}
                            pagination={false}
                        />
                    </Tabs.TabPane>
                  </Tabs>
                </Modal>
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
                pageData.forEach(({ number, subtotal }) => {
                  totalBorrow += number;
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
                        <Text>{}</Text>
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
              折扣率%：<Input className='sale_group' value={discount} onPressEnter={discountChange} style={{width:'200px'}} size="middle" placeholder="请输入"  />
              折扣金额（元）：<Input className='sale_group' value={discountAmount} onChange={discountAmountChange}  style={{width:'200px'}} size="middle" placeholder="请输入"  />
              附加金额（元）：<Input className='sale_group' value={additionalAmount} onPressEnter={additionalAmountChange} style={{width:'200px'}} size="middle" placeholder="请输入"  />
              结算方式：<Select
                    className='sale_group'
                    defaultValue="请选择"
                    style={{
                        width: 180,
                    }}
                    value={methodSettlement}
                    onChange={methodSettlementChange}
                    options={methodSettlementOptions}
                    />
           </div>
           <div className='sale_body'>
              单据备注：<Input className='sale_group' value={documentNote} onChange={documentNoteChange} style={{width:'600px'}} size="middle" placeholder="请输入"  />
           </div>
           <div>
              附件信息：<Upload {...props}>
                          <Button icon={<UploadOutlined />}>上传附件</Button>（单个附件最大支持20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、RAR、ZIP）
                       </Upload>
                       
           </div>
           <div className='sale_foot'>
              <div>
                <Text className='sale_group'>总计金额  ¥ <Text style={{fontSize:'30px',color:'red',marginRight:'40px'}}> {total()-discountAmount+additionalAmount}</Text></Text>
                <Text>实收金额  ¥ <Text style={{fontSize:'30px',color:'red'}}> {total()-discountAmount+additionalAmount}</Text></Text>
              </div>
             
              <div>
                <Button className='sale_group' onClick={()=>navigate('/sale/sales')}>取消</Button>
                <Button type="primary" className='sale_group' onClick={submit}>提交审核</Button>
                <Button type="primary">保存</Button>
              </div>
           </div>
        </div>
       

    )
}

export default  AddSaleOrder