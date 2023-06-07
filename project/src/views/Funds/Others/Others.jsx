import React, { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SearchOutlined, PaperClipOutlined } from '@ant-design/icons';
import { Button, Form, Input, DatePicker, Table, Pagination, Space, Radio, Modal, Select, Upload, message } from 'antd';
import '../index.scss';
import './others.scss';
import { itemRender } from '@/components/receipt/pagination';
import { getOthersAsync, delOthersAsync, addOthersAsync } from '@/store/actions/funds/othersActions';
import clickToExport from '@/utils/exportToExcel';

const { RangePicker } = DatePicker;


// ========================== 新增、编辑的对话框==========================
const CollectionCreateForm = ({ open, title, onCreate, onCancel }) => {
  const [form] = Form.useForm();
  const [file, setFile] = useState([]);
  const props = {
    name: 'file',
    accept: '.pdf,.word,.xls,.txt,.jpg,.png,.rar,.zip',
    action: 'http://localhost:3060/funds/uploadFiles',
    method: 'POST',
    headers: {
      authorization: 'authorization-text',
    },
    multiple: true,  // 多选
    onChange(info) {  // 上传文件改变时的回调
      let urlArr = [];
      if (info.file.status === 'done') {
        message.success(`${info.file.name} 上传成功！`);
        info.fileList.forEach(item => {
          urlArr.push(item.response.url)
        })
        // console.log('上传文件的url：', urlArr);
        setFile(urlArr);
      } else if (info.file.status === 'error') {
        message.error(`${info.file.name} 上传失败！`);
      }
    },
    onRemove(info) {  // 点击移除文件时的回调
      setFile((pre) => {
        let pro = pre.filter(item => {
          return item != info.response.url
        })
        return pro
      });
    }
  };

  return (
    <Modal
      open={open}
      title={title}
      width={700}
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            let value = {
              ...values,
              'create_time': values['create_time'] ? values['create_time'].format('YYYY/MM/DD') : undefined,
              'accessory': file
            }
            onCreate(value);
          })
          .catch((info) => {
            console.log('失败:', info);
          });
      }}
    >
      <Form
        form={form}
        layout="vertical"
        name="form_in_modal"
        initialValues={{
          modifier: 'public',
        }}
        className="modal-form"
      >
        <Form.Item name="cost_num" className='modal-form-item' label='费用单号' colon={false}>
          <Input placeholder="请输入内容" />
        </Form.Item>
        <Form.Item name="pay_type" className='modal-form-item' label='收支类型' colon={false} >
          <Radio.Group>
            <Radio value='其他收入'>其他收入</Radio>
            <Radio value='其他支出'>其他支出</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="cost_type" className='modal-form-item' label='费用分类' colon={false} >
          <Select>
            <Select.Option value="费用类型一">费用类型一</Select.Option>
            <Select.Option value="费用类型二">费用类型二</Select.Option>
            <Select.Option value="费用类型三">费用类型三</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="pay_way" className='modal-form-item' label='结算方式' colon={false} >
          <Select>
            <Select.Option value="现金">现金</Select.Option>
            <Select.Option value="支付宝">支付宝</Select.Option>
            <Select.Option value="微信">微信</Select.Option>
            <Select.Option value="建设银行">建设银行</Select.Option>
            <Select.Option value="工商银行">工商银行</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item name="money" className='modal-form-item' label='金额（元）' colon={false}>
          <Input placeholder="请输入内容" />
        </Form.Item>
        <Form.Item name="create_time" className='modal-form-item' label='创建日期' colon={false} >
          <DatePicker />
        </Form.Item>
        <Form.Item name="notes" className='modal-form-item' label='收款备注' colon={false}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item name="accessory" className='modal-form-item' label='附件信息' colon={false} >
          <Upload {...props}>
            <PaperClipOutlined />上传附件
          </Upload>
          <div className='word-prompt'>（单个附件最大支持20M，支持格式：PDF、Word、Excel、Txt、JPG、PNG、RAR、ZIP）</div>
        </Form.Item>
      </Form>
    </Modal>
  )
}

export default function Others() {
  const searchFormRef = useRef();
  const dispatch = useDispatch();
  const othersReducer = useSelector((state) => state.othersReducer);
  const [search, setSearch] = useState({
    pageNum: 1,
    pageSize: 5,
    pay_type: '',
    create_time: [],
    keywords: ''
  });

  // ========================== 数据初始加载 ==========================
  useEffect(() => {
    dispatch(getOthersAsync(search))
  }, [])

  // ========================== 多选监听 ==========================
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    // console.log('选中的值', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  // ========================== 导出 ==========================
  const exportExcel = () => {
    // 被选中的数据
    let selectedData = [];
    selectedRowKeys.forEach((item1) => {
      othersReducer.data.forEach((item2) => {
        if (item1 == item2.cost_num) {
          selectedData.push(item2);
        }
      });
    });
    // 表头改造
    let header = {}
    let column = columns.filter(item => item.title != '操作')
    column.forEach((item) => {
      header[item.dataIndex] = item.title;
    })
    clickToExport(header, selectedData, '其他收支表');
  }

  // ========================== 搜索 ==========================
  const onSearch = (values) => {
    const rangeValue = values['create_time'];
    setSearch((pre) => {
      let pro = {
        ...pre,
        pageNum: 1,
        pay_type: values['pay_type'],
        keywords: values['keywords'],
        create_time: rangeValue ? [rangeValue[0].format('YYYY/MM/DD'), rangeValue[1].format('YYYY/MM/DD')] : undefined,
      }
      dispatch(getOthersAsync(pro));
      return pro;
    });
    // console.log('搜索的数据：', values);
  };

  // ========================== 重置 ==========================
  const onReset = () => {
    searchFormRef.current.resetFields();
    setSearch((pre) => {
      let pro = {
        ...pre,
        pageNum: 1,
        pay_type: '',
        create_time: [],
        keywords: ''
      }
      dispatch(getOthersAsync(pro))
      return pro
    })
  };

  // ========================== 新增模态框 ==========================
  const showAddModal = () => {
    setOpen(true);
    setTitle('新增其他收支');
  }

  // ========================== 编辑模态框 ==========================
  const [editId, setEditId] = useState('');
  const showEditModal = (item) => {
    setOpen(true);
    setTitle('编辑其他收支');
    setEditId(item.cost_num);
    // console.log(item.cost_num);
  }

  // ========================== 新增、编辑发起请求 ==========================
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');

  const onCreate = (values) => {
    if (title == '新增其他收支') {
      // console.log('新增表单数据: ', values);
      dispatch(addOthersAsync(values));
      dispatch(getOthersAsync(search))
    } else if (title == '编辑其他收支') {
      // console.log('编辑表单数据: ', values);
    }
    setOpen(false);
  };

  // ========================== 删除 ==========================
  const [delModalOpen, setDelModalOpen] = useState(false);
  const [delId, setDelId] = useState('');
  const showDelModal = (item) => {
    setDelModalOpen(true);
    // console.log(item.cost_num);
    setDelId(item.cost_num);
  };
  const delOk = () => {
    setDelModalOpen(false);
    // console.log('删除的费用单号', delId)
    dispatch(delOthersAsync({ cost_num: delId }))
    dispatch(getOthersAsync(search))
  };
  const delCancel = () => {
    setDelModalOpen(false);
  };

  // ========================== 数据分页 ==========================
  const pageChange = (page, pageSize) => {
    setSearch((pre) => {
      let pro = {
        ...pre,
        pageNum: page,
        pageSize,
      }
      dispatch(getOthersAsync(pro))
      return pro
    })
  }

  // 表头参数
  const columns = [
    {
      title: '创建时间',
      dataIndex: 'create_time',
    },
    {
      title: '费用单号',
      dataIndex: 'cost_num',
    },
    {
      title: '收支类型',
      dataIndex: 'pay_type',
    },
    {
      title: '费用类型',
      dataIndex: 'cost_type',
    },
    {
      title: '金额（元）',
      dataIndex: 'money',
      render: (text) => <div style={{ color: 'red' }}>+{text}</div>,
    },
    {
      title: '结算方式',
      dataIndex: 'pay_way',
    },
    {
      title: '备注',
      dataIndex: 'notes',
    },
    {
      title: '附件',
      dataIndex: 'accessory',
    },
    {
      title: '操作',
      render: (_, record) => (
        <Space size="middle">
          <a onClick={() => showEditModal(record)}>编辑</a>
          <a onClick={() => showDelModal(record)}>删除</a>
        </Space>
      )
    }
  ];

  return (
    <div className='page-content'>
      <div className='operate'>
        <Button type="primary" className='operate-btn' onClick={showAddModal}>新增</Button>
        <Button className='operate-btn'>批量操作</Button>
        <Button className='operate-btn'>导入</Button>
        <Button className='operate-btn' onClick={exportExcel}>导出</Button>
      </div>

      <Form
        ref={searchFormRef}
        className="search-form"
        initialValues={{
          remember: true,
        }}
        onFinish={onSearch}
      >
        <Form.Item name="pay_type" className='search-form-item' label='收支类型' colon={false} >
          <Radio.Group>
            <Radio value='其他收入'>其他收入</Radio>
            <Radio value='其他支出'>其他支出</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item name="create_time" className='search-form-item' label='创建日期' colon={false} >
          <RangePicker />
        </Form.Item>
        <Form.Item name="keywords" className='search-form-item'>
          <Input prefix={<SearchOutlined className="site-form-item-icon" />} placeholder="请输入关键词搜索" />
        </Form.Item>
        <Form.Item className='search-form-item'>
          <Button type="primary" htmlType="submit" className='operate-btn'>搜索</Button>
          <Button onClick={onReset}>重置</Button>
        </Form.Item>
      </Form>

      <Table rowSelection={rowSelection} columns={columns} dataSource={othersReducer.data} pagination={false} />
      <Pagination
        className='pagination'
        total={othersReducer.total}
        itemRender={itemRender}
        showSizeChanger
        showQuickJumper
        defaultCurrent={1}
        defaultPageSize={5}
        current={search.pageNum}
        pageSizeOptions={[5, 10, 20, 30, 40]}
        showTotal={(total) => `共 ${total} 条`}
        onChange={(page, pageSize) => {
          pageChange(page, pageSize)
        }}
      />

      {/* ========================== 新增、编辑的对话框========================== */}
      <CollectionCreateForm
        open={open}
        onCreate={onCreate}
        onCancel={() => {
          setOpen(false);
        }}
        title={title}
      />

      {/* ========================== 删除的对话框 ========================== */}
      <Modal title="删除确认" open={delModalOpen} onOk={delOk} onCancel={delCancel}>
        <p>确定删除此收支信息吗？</p>
      </Modal>
    </div>
  )
}
