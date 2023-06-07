import React, { useEffect, useState } from 'react'
import { Cascader , Form , Select , DatePicker , Space , Button , Table , Input , Upload , Modal , Typography, message } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import '../../assets/scss/procurement/addindex.scss'
import { SettingOutlined , PlusSquareOutlined, MinusSquareOutlined , UploadOutlined , SearchOutlined} from '@ant-design/icons';
import moment from 'moment';
import 'moment/locale/zh-cn'
import { Link, useNavigate } from 'react-router-dom';



import http1 from "../../config/axios"
const http = http1('http://localhost:3060')
const { Text } = Typography;

moment.locale('zh-cn'); 

export default function Receipt() {

  const navigate = useNavigate()
 
 
  const { confirm } = Modal;
    const options = [
        {
          value: '总店',
          label: '总店',
          children: [
            {
              value: '仓库一',
              label: '仓库一',
            },
          ],
        },
        {
          value: '分店',
          label: '分店',
          children: [
            {
              value: '仓库二',
              label: '仓库二',
            },
          ],
        },
      ];
      const onChange = (value) => {
        console.log(value);
        let a = value[0]+'-'+value[1]
        setcangku(a)
      };
      //仓库选择
      const [cangku,setcangku] = useState('')

      //单据编号制造
      const [danju,setdanju] = useState('')
      const danjucreate = () =>{
        if(!danju){        
          let Rand = Math.random()
          let mineId ='DG'+Math.round(Rand * 100000000)
          setdanju(mineId)
        }
      }
      //供应商存储
      const [gongying,setgongying] = useState('')
      //经手人存储
      const [jingshou,setjingshou] = useState('')
      //业务日期存储
      const [yewu,setyewu] = useState('')
      //附加金额存储
      const [fujia,setfujia] = useState()
      //支付方式存储
      const [zhifu,setzhifu] = useState('')
      //备注存储
      const [beizhu,setbeizhu] = useState('')
      //制单人创建
      const [zhidanren,setzhidanren] = useState('默认用户一')
      //制单时间创建
      const [zhidandata,setzhidandata] = useState(()=>{
        let data = new Date()
        let a = data.toLocaleDateString()
        return a
      })
      //制单时间时分秒
      const [zhidantime,setzhidantime] = useState(()=>{
        let data = new Date()
        let a = data.toLocaleTimeString()
        return a
      })
      // 实付金额存储
      const [shifu,setshifu] = useState()
      //总计金额
      const [zongji,setzongji] = useState(0)


      const gongyingshang = (value) => {
        setgongying(value)
      };
      const onSearch = (value) => {
        console.log('供应商搜索:', value);
      };

      const jingshouren = (value) => {
        setjingshou(value)
      };
      const onSearch1 = (value) => {
        console.log('经手人搜索:', value);
      };


      const onChangedata = (date, dateString) => {
        setyewu(dateString)
      };


      // 表格
      //表格删除提示框
      const showConfirm = (key,num,name) => {
        confirm({
          title: `是否删除这个${name} `,
          icon: <SearchOutlined />,
          content: '删除后将丢失配置',
          onOk() {
             let newdata = data.filter((item) => item.key !== key);
             let newdata2 = modalhuancun.filter((item) => item !== key)
            setdata(newdata)
            setmodalhuancun(newdata2)
          },
          onCancel() {
            console.log('Cancel');
          },
        });
      }
      // 表格删除
      const handleDelete = (key,num,name) => {
        console.log(num);
     
          if(num === 1){
            showConfirm(key,num,name)
          //  let newdata = data.filter((item) => item.key !== key);
          //   setdata(newdata)
          }else {
            let newdata = data.map((item) => {
              if(item.key === key){
                item.num =item.num-1
              }
              return item
            } )
             setdata(newdata)
          }
          
           
      }
      //表格增加
      const handleAdd = (key,num) => {
            let newdata = data.map((item) => {
              if(item.key === key){
                item.num =item.num+1
              }
              return item
            })
             setdata(newdata)
      }


      const columns = [
        {
          title: (_,record) => (
            <SettingOutlined />
          ),
          dataIndex: 'set',
          render: (_, record) =>(
            // <Popconfirm title="是否删除?" onConfirm={() => handleDelete(record.key)}>
            //     <MinusCircleOutlined />
            // </Popconfirm>
            <>
              <div onClick={()=>handleDelete(record.key,record.num,record.name)}>
                <MinusSquareOutlined />
              </div>
              <div onClick={()=>handleAdd(record.key,record.num)}>
                <PlusSquareOutlined />
              </div>
            </>
          ),
        },
        {
          title: '序号',
          dataIndex: 'id',
        },
        {
          title: '商品编号',
          dataIndex: 'numbering',
        },
        {
          title: '商品图片',
          dataIndex: 'img',
          render: (_, record) =>(
            <div className='tableimg'>
              <img src={`${url+record.img}`} alt="" />
            </div>
          ),
        },
        {
          title: '商品名称',
          dataIndex: 'm_name',
        },
        {
          title: '商品规格',
          dataIndex: 'specification',
        },
        {
          title: '数量',
          dataIndex: 'num',
          render: (_, record) =>(
            <div>
              {record.num}
            </div>
          ),
        },
        {
          title: '单位',
          dataIndex: 'unit',
        },
        {
          title: '采购单价(元)',
          dataIndex: 'Price',
          render: (_, record) =>(
            <div>
              ￥{record.Price}
            </div>
          ),
        },
        {
          title: '小计(元)',
          dataIndex: 'subtotal',
          render: (_, record) =>(
            <div>
              ￥{record.num*record.Price}.00
            </div>
          ),
        },
        {
          title: '生产日期',
          dataIndex: 'date',
          render: (_, record) =>(
            <div>
              {record.data}
            </div>
          ),
        },
        {
          title: '备注',
          dataIndex: 'remark',
        },
      ];
      const url = 'http://172.16.114.185:3060/procurement'
      const [data, setdata] = useState ([])
      // 表格

      //附加金额输入框变化函数
      const jine = (txt)=>{
        console.log(txt.target.value);
        setfujia(txt.target.value)
        let a = totalBorrow+Number(txt.target.value)
        setzongji(a)
      }
      //单据备注变化函数
      const onbeizhu = (txt)=>{
        setbeizhu(txt.target.value)
      }
      //实付金额变化函数
      const onshifu = (txt)=>{
        setshifu(txt.target.value)
      }


      const zhifufangshi = (value) => {
        setzhifu(value)
      };

      // 上传
      const [fileList, setFileList] = useState([]);
      const handleChange = (info) => {
        let newFileList = [...info.fileList];
    
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-2);
    
        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
          if (file.response) {
            console.log(file.response);
            // Component will show file.url as link
            file.src = file.response.src;
          }
          return file;
        });
        setFileList(newFileList);
      };
      const props = {
        action: 'http://localhost:3060/caigou/procurement/uploads',
        onChange: handleChange,
        multiple: true,
      };
      // 上传


      // 模态框

      const [isModalOpen, setIsModalOpen] = useState(false);

      const showModal = () => {
        setIsModalOpen(true);
        //从数据库获取商品
        getModalData(inputtext,selectvalue)
        //从数据库获取商品
      };

      //当前页数
      // const [pageNum,setPageNum] = useState()
      // const modalpageNum = (num,size)=>{
      //   console.log('123123123',num,size);
      //   setPageNum((pre)=>{
      //     let newNum = Number(num)
      //     console.log(newNum);
      //     getModalData(newNum,size)
          
      //     return newNum

      //   })
      // }
      //拿取模态框数据
      const getModalData = async (name,leixing) => {
        http({
          method: 'GET',
          url: '/caigou/procurement/getmodaldata',
          params: {
            name,
            leixing
          }
        })
        .then(res => {
          let arr = res.data.data.map((item) => {
            item.key = item.id
            return item
          });
          let arr1 = arr.filter((item) => (!modalhuancun.includes(item.key)))
          // console.log(arr1);
            
          setmodaldata(arr1)
          // if (res.code === '200') {
          //   setStaffData(res.data.data)
          //   flg && setPaginationProps({
          //     ...paginationProps,
          //     total: res.data.total
          //   })
          // }
        })
        .catch(err => {
          console.log(err);
        })
      }
      //根据数组拿取已经选定了的类型信息
      const getData = async (arr) => {
        http({
          method: 'GET',
          url: '/caigou/procurement/getdata',
          params: {
            arr
          }
        })
        .then(res => {
          console.log(res);
          let arr = res.data.data.map((item) => {
            item.key = item.id
            item.num = 1
            item.numbering = item.numbering
            item.subtotal = item.Price
            item.date = new Date().toLocaleDateString()
            return item
          });
          // console.log(new Date().toLocaleDateString());
          setdata([...data,...arr])
          // if (res.code === '200') {
          //   setStaffData(res.data.data)
          //   flg && setPaginationProps({
          //     ...paginationProps,
          //     total: res.data.total
          //   })
          // }
          })
          .catch(err => {
            console.log(err);
          })
        }
      //提交表单信息给数据库
      const updata = async (id,danju,zhuangtai,cangku,gongying,jingshou,yewu,fujia,jiesuan,beizhu,fujian,zhidanren,zhidandata,zhidantime,zongji,shifu,heji) => {
        http({
          method: 'post',
          url: '/caigou/procurement/updata',
          data: {
            id,
            danju,
            zhuangtai,
            cangku,
            gongying,
            jingshou,
            yewu,
            fujia,
            jiesuan,
            beizhu,
            fujian,
            zhidanren,
            zhidandata,
            zhidantime,
            zongji,
            shifu,
            heji
          }
        })
        .then(res => {
          console.log(res);
          navigate('/procurement')
        })
        .catch(err => {
          console.log(err);
          message.error('失败')
        })
      }
      //提交要采购的信息给数据库
      const upc_data = async (dataarr) => {
        http({
          method: 'post',
          url: '/caigou/procurement/upcdata',
          data: {
            dataarr
          }
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        })
      }
      //
      // 保存数据到数据库
      const baocun  = ()=>{
        datasql()
        updata(null,danju,'未提交',cangku,gongying,jingshou,yewu,fujia,zhifu,beizhu,fileList[0].src,zhidanren,zhidandata,zhidantime,zongji,shifu,totalBorrow)
      }
      //提交审核数据到数据库
      const upshenghe = ()=>{
        datasql()
        updata(null,danju,'待审核',cangku,gongying,jingshou,yewu,fujia,zhifu,beizhu,fileList[0].src,zhidanren,zhidandata,zhidantime,zongji,shifu,totalBorrow)
      }
      //data数据处理提交给sql
      const [arr,setarr] = useState()
      const datasql = () => {
        let a = data.map((item)=>{
          item.D_id = danju
          return [item.D_id,item.numbering,item.num,item.date]
        })
        console.log(a);
        setarr((pre)=>{
          let pro
          pro = a
          upc_data(a)
          return pro
        })
      }
      

      //模态框确定
      const modalOk = () => {
        setIsModalOpen(false);
        // setmodalhuancun(selectedRowKeys)
        // search()
        setmodalhuancun([...modalhuancun,...selectedRowKeys])
        getData(selectedRowKeys)
        setSelectedModal([])
      };
      //模态框取消
      const modalCancel = () => {
        setIsModalOpen(false);
        setSelectedModal([])
      };
      // 模态框表格
      const modalcolumns = [
              {
                title: '商品名称',
                dataIndex: 'm_name',
              },
              {
                title: '商品分类',
                dataIndex: 'classify',
              },
              {
                title: '属性规格',
                dataIndex: 'specification',
              },
              {
                title: '库存单位',
                dataIndex: 'unit',
              },
              {
                title: '采购单价',
                dataIndex: 'Price',
              },
              {
                title: '库存',
                dataIndex: 'inventory',
              }
            ];
            // const modalhandleDelete = (key) => {
            //   if(selectedRowKeys.length === 0){
            //     const newdata = modaldata.filter((item) => item.key !== key);
            //     modalsetdata(newdata);
            //   }else {
            //     const newdata = modaldata.filter((item) => !selectedRowKeys.includes(item.key));
            //     modalsetdata(newdata);
            //     console.log(selectedRowKeys.value);
            //   }
            // };
            // const [modaldata, modalsetdata] = useState ([]);
            const [modaldata,setmodaldata] = useState([])
            //模态框的多选数组及其操作
            const [selectedRowKeys, setSelectedModal] = useState([]);
            const onSelectChange = (newSelectedRowKeys) => {
              console.log('选择的类型key有: ', newSelectedRowKeys);
              setSelectedModal(newSelectedRowKeys);
            };
            const rowSelection = {
              selectedRowKeys,
              onChange: onSelectChange,
            };
            //模态框缓存数组
            const [modalhuancun,setmodalhuancun] = useState([])
          // 模态框表格
          //模态框输入框内容
          const [inputtext,setinputtext] = useState([])
          //搜索框文字函数
          const ChangeInput = (text) =>{
            console.log(text.target.value);
            setinputtext(text.target.value)
          }
          //模态框重置按钮
          const chongzhi = ()=>{
            modalform.resetFields();
            getModalData('','')
          }
          //搜索按钮函数
          const sousuo = ()=>{
            getModalData(inputtext,selectvalue)
            console.log(123,inputtext,selectvalue);
          }
          //模态框from表单
          const [modalform] = Form.useForm();
          //模态框下拉表
          const [selectvalue,setselectvalue] = useState([])
          const modalhandleChange = (value) => {
            setselectvalue(value)
          };
          // 模态框
          let [totalBorrow , settotalBorrow] = useState(0);



           //生命周期
            useEffect(()=>{
              //合计计算
                let pro = 0
                data.forEach(({Price,num})=>{
                  settotalBorrow((pre)=>{
                    pro+=Number(Price*num)
                    return pro
                  })
                })
              //单据编号生成
              danjucreate()
              },[data])

  return (
    <div className='mian'>
        <div className='addhang1'>
            <div className='biaoti'>采购单</div>
            <div className='bianhao'>单据编号:{danju}</div>
        </div>
        <div className='addhang2'>
            <div className='duojiselect'>
                <div>入库仓库</div>
                <div>
                {/* <Cascader
                    options={options}
                    expandTrigger="hover"
                    displayRender={displayRender}
                    onChange={onChange}
                    placeholder="请选择"
                /> */}
                  <Cascader options={options} onChange={onChange} placeholder="请选择" />
                </div>
            </div>
            <div className='selectok'>
                <div>供应商</div>
                <div>
                <Select
                    className='selectwidth'
                    showSearch
                    placeholder="供应商名称/编码"
                    optionFilterProp="children"
                    onChange={gongyingshang}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      {
                          value: '陈佳豪',
                          label: '陈佳豪',
                      },
                      {
                          value: '赵涛',
                          label: '赵涛',
                      },
                      {
                          value: '朱燕梅',
                          label: '朱燕梅',
                      },
                      {
                          value: '衡志',
                          label: '衡志',
                      },
                      {
                          value: '罗乙城',
                          label: '罗乙城',
                      },
                      {
                          value: '郑世泷',
                          label: '郑世泷',
                      },
                    ]}
                />
                </div>
            </div>
            <div className='selectok'>
                <div>经手人</div>
                <div>
                <Select
                    className='selectwidth'
                    showSearch
                    placeholder="姓名"
                    optionFilterProp="children"
                    onChange={jingshouren}
                    onSearch={onSearch1}
                    filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                      {
                          value: '熊大',
                          label: '熊大',
                      },
                      {
                          value: '熊二',
                          label: '熊二',
                      },
                      {
                          value: '吉吉国王',
                          label: '吉吉国王',
                      },
                      {
                          value: '毛毛',
                          label: '毛毛',
                      },
                    ]}
                />
                </div>
            </div>
            <div className='selectok'>
              <div>业务日期</div>
              <div>
                <Space direction="vertical" size={12} >
                  <DatePicker  locale={zhCN} onChange={onChangedata} />
                </Space>
              </div>
            </div>
            <div className='selectok'>
            <Button type="primary" size={ "large" }  onClick={showModal}>新增</Button>
            </div>
        </div>
        <div className='addhang3'>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            summary={() => {
              return (
                <>
                  <Table.Summary.Row>
                    <Table.Summary.Cell index={0}>合计</Table.Summary.Cell>
                    <Table.Summary.Cell index={1}>
                      <Text type="danger">￥{totalBorrow}.00</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
            pagination={{ pageSizeOptions:[1,2,3,4],showSizeChanger:true,defaultPageSize:3}}
          />
        </div>
        <div className='addhang4'>
          <div>
            <div className='seletext'>附加金额（元）</div>
            <div><Input placeholder="请输入" onBlur={jine} /></div>
          </div>
          <div>
            <div className='seletext'>结算方式</div>
            <div>
              <Select
                defaultValue="请选择"
                style={{
                  width: 120,
                }}
                onChange={zhifufangshi}
                options={[
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
                ]}
              />
            </div>
          </div>
        </div>
        <div className='addhang5'>
            <div className='seletext'>单据备注</div>
            <div><Input placeholder="请输入" onBlur={onbeizhu} /></div>
        </div>
        <div className='addhang6'>
          <div>
            采购单
          </div>
          <div>
            <Upload {...props} 
            fileList={fileList} 
            accept='.pdf,.Word,.Excel,.Txt,.JPG,.PNG,.RAR,.ZIP'
            name='zsl'
            >
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
            <p className='texttitle'>（单个附件最大支持20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、RAR、ZIP）</p>
          </div>
        </div>
        <div className='addhang7'>

        </div>
        <div className='addhang8'>
          <div>
            <div>总计金额 ￥<p className='moneynum'>{zongji}</p></div>
            <div>
              <div>实付金额 ￥</div>
              <div><Input placeholder="请输入实付金额" onBlur={onshifu} type='Number' /></div>
            </div>
          </div>
          <div>
            <div><Button className='buttcolor'><Link to="/procurement">取消</Link></Button></div>
            <div><Button type="primary" onClick={upshenghe}>提交审核</Button></div>
            <div><Button type="primary" onClick={baocun}>保存</Button></div>
          </div>
        </div>
        {/* 模态框 */}
        <div className='modal'> 
          <Modal 
          title="选择商品" 
          open={isModalOpen} 
          onOk={modalOk} 
          onCancel={modalCancel} 
          getContainer={false}
          >
            <div className='modalhang1'>
              <Form form={modalform} className='modalhang2' initialValues={{leixing:''}}>
                <div>
                  <Form.Item name="leixing">
                    <Select
                      style={{
                        width: 120,
                      }}
                      allowClear
                      onChange={modalhandleChange}
                      options={[
                        {
                          value: '',
                          label: '全部',
                        },
                        {
                          value: '水果',
                          label: '水果',
                        },
                        {
                          value: '饮料',
                          label: '饮料',
                        }
                      ]}
                    />
                  </Form.Item>
                </div>
                <div>
                  <Form.Item name='tiaojian'>
                    <Input size="large" onBlur={ChangeInput} placeholder="请输入商品名称" prefix={<SearchOutlined />} />
                  </Form.Item>
                </div>
              </Form>
                <div><Button type="primary" onClick={sousuo} >搜索</Button></div>
                <div><Button onClick={chongzhi}>重置</Button></div>
            </div>
            <div className='modalhanng2'>
              <Table 
              className='ontable' 
              rowSelection={rowSelection} 
              columns={modalcolumns} 
              dataSource={modaldata} 
              pagination={{ pageSizeOptions:[1,2,3,4],showSizeChanger:true,defaultPageSize:3,total:modaldata.length,showTotal:(total)=>(<div>总商品条数{total}</div>)}} 
              />
            </div>
          </Modal>
        </div>
        {/* 模态框 */}
    </div>
  )
}
