import React, { useState } from 'react'
import { Cascader , Select , DatePicker , Space , Button , Table , Popconfirm , Input , Upload , Modal} from 'antd';
// import '../../assets/scss/procurement/addindex.scss'
import { SettingOutlined , MinusCircleOutlined , UploadOutlined , SearchOutlined} from '@ant-design/icons';

export default function Receipt() {

    const options = [
        {
          value: 'zong',
          label: '总部',
          children: [
            {
              value: 'cangku1',
              label: '仓库一',
            },
          ],
        },
        {
          value: 'fen',
          label: '分部',
          children: [
            {
              value: 'cangku2',
              label: '仓库二',
            },
          ],
        },
      ];
      const onChange = (value) => {
        console.log(value);
      };
      
      // Just show the latest item.
      const displayRender = (labels) => labels[labels.length - 1];


      const bianhuahou = (value) => {
        console.log(`selected ${value}`);
      };
      const onSearch = (value) => {
        console.log('search:', value);
      };

      const bianhuahou1 = (value) => {
        console.log(`selected ${value}`);
      };
      const onSearch1 = (value) => {
        console.log('search:', value);
      };


      const onChangedata = (date, dateString) => {
        console.log(date, dateString);
      };


      // 表格


      // 表格删除
      const handleDelete = (key) => {
          const newdata = data.filter((item) => item.key !== key);
          setdata(newdata);
      }

      const columns = [
        {
          title: (_,record) => (
            <SettingOutlined />
          ),
          dataIndex: 'set',
          render: (_, record) =>(
            <Popconfirm title="是否删除?" onConfirm={() => handleDelete(record.key)}>
                <MinusCircleOutlined />
            </Popconfirm>
          ),
        },
        {
          title: '序号',
          dataIndex: 'key',
        },
        {
          title: '商品编号',
          dataIndex: 'uid',
        },
        {
          title: '商品图片',
          dataIndex: 'img',
          render: (_, record) =>(
            <div className='tableimg'>
              <img src={require(`${record.img}`)} alt="" />
            </div>
          ),
        },
        {
          title: '商品名称',
          dataIndex: 'name',
        },
        {
          title: '商品规格',
          dataIndex: 'specification',
        },
        {
          title: '数量',
          dataIndex: 'num',
        },
        {
          title: '单位',
          dataIndex: 'unit',
        },
        {
          title: '采购单价(元)',
          dataIndex: 'unitprice',
        },
        {
          title: '小计(元)',
          dataIndex: 'subtotal',
        },
        {
          title: '生产日期',
          dataIndex: 'data',
        },
        {
          title: '备注',
          dataIndex: 'remark',
        },
      ];
      const [data, setdata] = useState ([
        {
          key: 1,
          uid:151231,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 2,
          uid:151232,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 3,
          uid:151233,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 4,
          uid:151233,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 5,
          uid:151233,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 6,
          uid:151233,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 7,
          uid:151233,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 8,
          uid:151233,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 9,
          uid:151233,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 10,
          uid:151233,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
        {
          key: 11,
          uid:151233,
          img:'./img/1.jpg',
          name: '苹果',
          specification:'500g',
          num:'1',
          unit:'斤',
          unitprice:'￥500',
          subtotal:'￥500',
          data: '2020-10-21',
          remark: 'New York No. 1 Lake Park',
        },
      ])
      const a = 10000
      // 表格


      const zhifufangshi = (value) => {
        console.log(`selected ${value}`);
      };

      // 上传
      const [fileList, setFileList] = useState([
        {
          uid: '-1',
          name: 'xxx.png',
          status: 'done',
          url: 'http://www.baidu.com/xxx.png',
        },
      ]);
      const handleChange = (info) => {
        let newFileList = [...info.fileList];
    
        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        newFileList = newFileList.slice(-2);
    
        // 2. Read from response and show file link
        newFileList = newFileList.map((file) => {
          if (file.response) {
            // Component will show file.url as link
            file.url = file.response.url;
          }
          return file;
        });
        setFileList(newFileList);
      };
      const props = {
        action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
        onChange: handleChange,
        multiple: true,
      };
      // 上传

      // 模态框

      const [isModalOpen, setIsModalOpen] = useState(false);

      const showModal = () => {
        setIsModalOpen(true);
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
      // 模态框表格
      const modalcolumns = [
              {
                title: '商品名称',
                dataIndex: 'name',
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
            const modaldata = []
            for (let i = 0; i < 20; i++) {
              modaldata.push({
                key: i,
                name: `天地一号 [${i}]`,
                classify: `食品/饮料${i}`,
                specification: `250ml [${i}]`,
                unit: `箱${i}`,
                Price: `¥500.00 [${i}]`,
                inventory: `600 [${i}]`
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
      // 模态框表格

      // 模态框

  return (
    <div className='mian'>
        <div className='addhang1'>
            <div className='biaoti'>采购单</div>
            <div className='bianhao'>单据编号:CG20170725022</div>
        </div>
        <div className='addhang2'>
            <div className='duojiselect'>
                <div>入库仓库</div>
                <div>
                <Cascader
                    options={options}
                    expandTrigger="hover"
                    displayRender={displayRender}
                    onChange={onChange}
                    placeholder="请选择"
                />
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
                    onChange={bianhuahou}
                    onSearch={onSearch}
                    filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                    {
                        value: '供应商一',
                        label: '供应商一',
                    },
                    {
                        value: '供应商二',
                        label: '供应商二',
                    },
                    {
                        value: '供应商三',
                        label: '供应商三',
                    },
                    ]}
                />
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
                    onChange={bianhuahou1}
                    onSearch={onSearch1}
                    filterOption={(input, option) =>
                    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
                    }
                    options={[
                    {
                        value: '经手人一',
                        label: '经手人一',
                    },
                    {
                        value: '经手人二',
                        label: '经手人二',
                    },
                    {
                        value: '经手人三',
                        label: '经手人三',
                    },
                    ]}
                />
                </div>
            </div>
            <div className='selectok'>
              <div>业务日期</div>
              <div>
                <Space direction="vertical">
                  <DatePicker onChange={onChangedata} />
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
            footer={() => (
              <div className='biaogefooter'>
                <p>合计</p>
                <p>￥{a}</p>
              </div>
            )}
            pagination={{ pageSizeOptions:[1,2,3,4],showSizeChanger:true,defaultPageSize:3}}
          />
        </div>
        <div className='addhang4'>
          <div>
            <div className='seletext'>附加金额（元）</div>
            <div><Input placeholder="请输入" /></div>
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
            <div><Input placeholder="请输入" /></div>
        </div>
        <div className='addhang6'>
          <div>
            采购单
          </div>
          <div>
            <Upload {...props} fileList={fileList} accept='.pdf,.Word,.Excel,.Txt,.JPG,.PNG,.RAR,.ZIP'>
              <Button icon={<UploadOutlined />}>上传附件</Button>
            </Upload>
            <p className='texttitle'>（单个附件最大支持20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、RAR、ZIP）</p>
          </div>
        </div>
        <div className='addhang7'>

        </div>
        <div className='addhang8'>
          <div>
            <div>总计金额 ￥<p className='moneynum'>8000</p></div>
            <div>
              <div>实付金额 ￥</div>
              <div><Input placeholder="请输入实付金额" /></div>
            </div>
          </div>
          <div>
            <div><Button className='buttcolor'>取消</Button></div>
            <div><Button type="primary">提交审核</Button></div>
            <div><Button type="primary">保存</Button></div>
          </div>
        </div>
        <div className='modal'> 
          <Modal title="选择商品" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <div className='modalhang1'>
              <div><Input size="large" placeholder="请输入搜索内容" prefix={<SearchOutlined />} /></div>
              <div><Button type="primary">搜索</Button></div>
              <div><Button>重置</Button></div>
            </div>
            <div className='modalhanng2'>
              <Table 
              className='ontable' 
              rowSelection={rowSelection} 
              columns={modalcolumns} 
              dataSource={modaldata} 
              pagination={{ pageSizeOptions:[1,2,3,4],showSizeChanger:true,defaultPageSize:3}} 
              />
            </div>
          </Modal>
        </div>
    </div>
  )
}
