import zhCN from 'antd/es/locale/zh_CN';
import Item from 'antd/lib/list/Item';
import {getOrderDataApi,delOrderApi} from '../../../http/sale_api/sale'
import React,{ useState, useEffect } from 'react'
import { Space, Table, Button,Select ,DatePicker ,Input,Divider ,Pagination,ConfigProvider,Typography} from 'antd';
import { UserOutlined ,AudioOutlined,SearchOutlined} from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import './index.scss'
const { Text } = Typography;





const { RangePicker } = DatePicker;    //日期组件

const SaleOrder=()=>{
    function dateTransForm(my_date) {    //日期格式转换
      let year = my_date.getFullYear();
      let month = my_date.getMonth() + 1;
      let day = my_date.getDate();
      let hours = my_date.getHours() < 10 ? "0" + my_date.getHours() : my_date.getHours()
      let minutes  = my_date.getMinutes() < 10 ? "0" + my_date.getMinutes() : my_date.getMinutes();
      let seconds  = my_date.getSeconds() < 10 ? "0" + my_date.getSeconds() : my_date.getSeconds();
      let str=`${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      return str
    }

    const [state, setState] = useState();  //状态
    const stateOption=[                    //状态下拉列表
      { 
      value: '全部',
      label: '全部',
      },
      {
      value: '未提交',
      label: '未提交',
      },
      {
      value: '待审核',
      // disabled: true,
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
    ] 
    const stateChange = (value) => {       //状态下拉列表改变回调函数
          console.log(`selected ${value}`);
          setState(value)
    };
   
    const [date1,setDate1] = useState(); //改造后的日期
    const [date2,setDate2] = useState(); //改造后的日期
    const [dataValue,setDataValue] = useState(); //业务日期
    const DateChange=(e)=>{                      //业务日期回调函数
        console.log(e);
        setDataValue(e)

        setDate1(dateTransForm(e[0]._d))
        setDate2(dateTransForm(e[1]._d))
    }

    const [search,setSearch] = useState(); //关键词搜索
    const searchChange=(e)=>{              //搜索回调函数
        console.log(e);
        setSearch(e.target.value)
        console.log(search);
    }

    const [dataList, setDataList] = useState([]);       //Table表格数据
    const [currentPage, setCurrentPage] = useState(1);  //当前页
    const [pageSize, setPageSize] = useState(2);        //每页大小
    const [totalPage,setTotalPage] = useState();        //共有多少条数据
    const onChange=(currentPage,pageSize)=>{
      setCurrentPage(currentPage)
      let table={
        currentPage,
        pageSize,
        selectObj:{
          state,
          dataValue:[date1,date2],
          search
        }
      }
      getOrderDataApi(table).then( (res)=>{
          console.log(res);
          const options={
            style:'currency',
            currency:'CNY',
          }
          setDataList(res.data.data.resp.map((item,index)=>{
            item.key=item.order_id
            item.order_money=(item.order_money).toLocaleString('zh-CN',options)
            return item
          }))
          setTotalPage(res.data.data.totalPage[0].totalPage)
        })
        .catch((err)=>{
          console.log(err);
        })
    }
    const onShowSizeChange=(currentPage, pageSize)=>{
      // setPageSize()
      setPageSize(pageSize)
      console.log(currentPage, pageSize);
    }

    useEffect(() => {
      let data={
        currentPage,
        pageSize,
        selectObj:{
          state,
          dataValue:[date1,date2],
          search
        }
      }
      getOrderDataApi(data).then( (res)=>{
        console.log(res);
        const options={
          style:'currency',
          currency:'CNY',
        }
        setDataList(res.data.data.resp.map((item,index)=>{
          item.key=item.order_id
          item.order_money=(item.order_money).toLocaleString('zh-CN',options)
          return item
        }))
        setTotalPage(res.data.data.totalPage[0].totalPage)
      })
      .catch((err)=>{
        console.log(err);
      })
    }, []);

    const reset=()=>{     //重置  
        // let currentTime=new Date()   //当前时间
        // console.log(currentTime,22);
        // let customTime="2025-12-20 10:01:50" //自定义时间
        // customTime=customTime.replace("-","/");
        // customTime=new Date(Date.parse(customTime))
        // if(currentTime<customTime){
        //     console.log(`当前时间${currentTime}<自定义时间${customTime}`);
        // }else if(currentTime>customTime){
        //   console.log(`当前时间${currentTime}>自定义时间${customTime}`);
        // }else{
        //   console.log(`当前时间${currentTime}==自定义时间${customTime}`);
        // }
        // console.log(new Date(Date.parse("2025/12/20 10:01:50")) > new Date(Date.parse("2026/12/20 10:01:50")));
        setCurrentPage(1)
        setState()
        setDataValue()
        setSearch()
        let data={
          currentPage:1,
          pageSize,
          selectObj:{
            state:'',
            dataValue:'',
            search:''
          }
        }
       
        getOrderDataApi(data).then( (res)=>{
          console.log(res);
          const options={
            style:'currency',
            currency:'CNY',
          }
          setDataList(res.data.data.resp.map((item,index)=>{
            item.key=item.order_id
            item.order_money=(item.order_money).toLocaleString('zh-CN',options)
            return item
          }))
          setTotalPage(res.data.data.totalPage[0].totalPage)
        })
        .catch((err)=>{
          console.log(err);
        })
    }

    const columns = [
        {
          title: '提交时间',
          dataIndex: 'order_time',
        //   render: (text) => <a>{text}</a>,
        },
        {
          title: '单据编号',
          dataIndex: 'order_number',
        },
        {
          title: '客户名称',
          dataIndex: 'order_name',
        },
        {
          title: '实收金额（元）',
          dataIndex: 'order_money',
        },
        {
          title: '门店',
          dataIndex: 'order_stores',
        },
        {
          title: '仓库',
          dataIndex: 'order_warehouse',
        },
        {
          title: '状态',
          dataIndex: 'order_state',
          render: (text) => <Text style={{color:'green'}}>{text}</Text>,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          render: (_,record) => (
            <Space size="middle" style={{color:'blue',cursor:'pointer'}}>
              {/* <text onClick={() => onCheckActivity(record)}>审核</text> */}
              <Text style={{color:'blue',cursor:'pointer'}} onClick={() =>navigate(`/sale/detailsSale?order_id=${record.order_id}`)}>审核</Text>
              <Text style={{color:'blue',cursor:'pointer'}}                                        >复制</Text>
              <Text style={{color:'blue',cursor:'pointer'}} onClick={() =>navigate(`/sale/detailsSale?order_id=${record.order_id}`)}>详情</Text>
              <Text style={{color:'blue',cursor:'pointer'}} onClick={() => delOrder(record)}       >删除</Text>
            </Space>
          ),
        },
      ];
    const searchData=()=>{        //搜索按钮
      setCurrentPage(1)
      let data={
        currentPage:1,
        pageSize,
        selectObj:{
          state,
          dataValue:[date1,date2],
          search
        }
      }
     
      getOrderDataApi(data).then( (res)=>{
        console.log(res);
        const options={
          style:'currency',
          currency:'CNY',
        }
        setDataList(res.data.data.resp.map((item,index)=>{
          item.key=item.order_id
          item.order_money=(item.order_money).toLocaleString('zh-CN',options)
          return item
        }))
        setTotalPage(res.data.data.totalPage[0].totalPage)
      })
      .catch((err)=>{
        console.log(err);
      })
    }

    const delOrder=(record)=>{    //删除订单
        console.log(record.order_id);
        delOrderApi(record.order_id).then(()=>{
            let table={
              currentPage,
              pageSize
            }
            getOrderDataApi(table).then( (res)=>{
              console.log(res);
              const options={
                style:'currency',
                currency:'CNY',
              }
              setDataList(res.data.data.resp.map((item,index)=>{
                item.key=item.order_id
                item.order_money=(item.order_money).toLocaleString('zh-CN',options)
                return item
              }))
              setTotalPage(res.data.data.totalPage[0].totalPage)
            })
            .catch((err)=>{
              console.log(err);
            })
        }).catch((err)=>{
          console.log(err);
        })
    }
      // const data = [
      //   // {
      //   //   key: '1',
      //   //   time: '2020/03/09 10:55',
      //   //   number: 'PO20170725022',
      //   //   name: '广汇商贸',
      //   //   money: '¥50000.00',
      //   //   address: '总店',
      //   //   git: '总店-仓库一',
      //   //   status: '待审核',
      //   //   operation: 'New York No. 1 Lake Park',
      //   // },
      //   // {
      //   //   key: '2',
      //   //   time: '2020/03/09 10:55',
      //   //   number: 'PO20170725022',
      //   //   name: '广汇商贸',
      //   //   money: '¥50000.00',
      //   //   address: '总店',
      //   //   git: '总店-仓库一',
      //   //   status: '待审核',
      //   //   operation: 'New York No. 1 Lake Park',
      //   // },
      //   // {
      //   //   key: '3',
      //   //   time: '2020/03/09 10:55',
      //   //   number: 'PO20170725022',
      //   //   name: '广汇商贸',
      //   //   money: '¥50000.00',
      //   //   address: '总店',
      //   //   git: '总店-仓库一',
      //   //   status: '待审核',
      //   //   operation: 'New York No. 1 Lake Park',
      //   // },
      //   // {
      //   //   key: '4',
      //   //   time: '2020/03/09 10:55',
      //   //   number: 'PO20170725022',
      //   //   name: '广汇商贸',
      //   //   money: '¥50000.00',
      //   //   address: '总店',
      //   //   git: '总店-仓库一',
      //   //   status: '待审核',
      //   //   operation: 'New York No. 1 Lake Park',
      //   // },
      // ];
      
      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {
          console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
        },
        // getCheckboxProps: (record) => ({
        //   disabled: record.name === 'Disabled User',
        //   // Column configuration not to be checked
        //   name: record.name,
        // }),
      };
    //   const [selectionType, setSelectionType] = useState('checkbox');\

    const navigate=useNavigate();
    return (
        <div className='content'>
            <div className='content_one'>
                <Button type="primary" onClick={()=>navigate('/sale/addSaleOrder')}>新增</Button>
                <Button>批量操作</Button>
                <Button>导入</Button>
                <Button>导出</Button>
            </div>
            <div className='content_two'> 
                状态：<Select
                className='group'
                defaultValue="请选择"
                style={{
                    width: 180,
                }}
                value={state}
                onChange={stateChange}
                options={stateOption}
                />
                业务日期：<Space direction="vertical" size={8} className='group'>
                            <RangePicker value={dataValue}  onChange={DateChange}/>
                        </Space>
                <Input className='group' value={search}  onChange={searchChange} style={{width:'200px'}} size="middle" placeholder="请输入关键词搜索" prefix={<SearchOutlined  />} />
                <Button className='group' type="primary" onClick={searchData}>搜索</Button>
                <Button onClick={reset}>重置</Button>
            </div>
            <div>
            {/* <Radio.Group
                onChange={({ target: { value } }) => {
                setSelectionType(value);
                }}
                value={selectionType}
            > */}
                {/* <Radio value="checkbox">Checkbox</Radio>
                <Radio value="radio">radio</Radio> */}
            {/* </Radio.Group> */}

            <Divider />
            <Table
                rowSelection={{
                ...rowSelection,
                }}
                columns={columns}
                dataSource={dataList}
                pagination={false}
            />
            </div>

            <Divider />
            <div className='foot'>
             <ConfigProvider locale={zhCN}>
                <Pagination
                        total={totalPage}
                        showSizeChanger
                        current={currentPage}
                        pageSize={pageSize}
                        // defaultPageSize={2}
                        pageSizeOptions={[2,3,5,10]}
                        onChange={onChange}
                        onShowSizeChange={onShowSizeChange}
                        showQuickJumper={true}
                        showTotal={(total) => `共 ${total} 条`}
                />
             </ConfigProvider>
                
            </div>
       </div>
       

    )
}

export default  SaleOrder