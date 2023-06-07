import React, { useEffect } from 'react'

import { useState } from 'react';

import { Col, Row, Upload, Input, Select, Modal, Form, Space, Button, Switch, message  } from 'antd';

import ImgCrop from 'antd-img-crop';

import { useSearchParams, useNavigate } from "react-router-dom";

import { addStaffApi, getStaffByIDApi, AlterOneStaffAip } from "@/http/settingApi/index";

import "@/views/Setting/staff-manage/StaffAdd.scss";

export default function AddStaff() {
  const { Option } = Select;

  /* form表单 */
  const [form] = Form.useForm();

  /* 路由实例 */
  const navigate = useNavigate()

  /* 是否选中 */
  const [isCheck,setIsCheck] = useState(false)
  const [objData,setOnjData] = useState({})

  /* 路由参数 */
  const [searchParams] = useSearchParams()
  console.log('获取查询参数：', searchParams.get('id'));

  /* 图片上传 */
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false); //模态框
  const [previewImage, setPreviewImage] = useState(''); // 图片SRC
  const handleCancel = () => setPreviewOpen(false); //取消模态框

  /* 图片 onchange 回调 */
  const onChange = ({ fileList: newFileList,file }) => {
    console.log(file.response);
    file.response && setPreviewImage(file.response.src) 
    setFileList(newFileList);
  }

  /* 图片预览回调 */
  const onPreview = async (file) => {
    console.log(file);
    setPreviewImage(file.response.src) 
    setPreviewOpen(true);
  }

  /* useEffect 生命周期函数 */
  useEffect(() => {
    let id = searchParams.get('id')
    //调用接口 获取数据
    getStaffByIDApi(id).then(res => {
      if (res.code === '200') {
        res.data.staff_status ? res.data.staff_status=true : res.data.staff_status=false
        setIsCheck(res.data.staff_status)
        setOnjData(res.data)
        form.setFieldsValue(res.data);
        setFileList([{
          ...fileList,
          url: res.data.head_photo
        }
        ])
      }
    })
  },[])

  /* form 验证成功回调 */
  const onFinish = (values) => {
    values.head_photo = previewImage
    if (searchParams.get('id') === 'undefined') {
      //调用接口 新增一条数据
      addStaffApi(values)
      .then(res => {
        console.log(res);
      })
    }else{
      //调用接口 修改某条数据
      setOnjData((pre) =>{
        let newData = {
          ...pre,
          ...values
        }
        console.log(newData);
        AlterOneStaffAip(newData).then(res => {
          console.log(res);
          if (res.code === '200') {
            message.success(res.msg)
            navigate('/staffManage')
          }else{
            message.success(res.msg)
          }
        })
        return newData
      }) 

    }
  }

  /* SwitchChange 函数 */
  const onSwitchChange = (values) => {
    console.log(values);
    setIsCheck(values)
  }

  /* 自定义校验规则 */
  const startPassword = (errorInfo) => {
    // 获取表格数据
    const formData = form.getFieldsValue();
    // 动态判断输入文本是否符合检验条件
    // 长度为6-16位数
    if (formData.password.length < 6 || formData.password.length > 16) {
      return Promise.reject('请输入6-16位密码')
    }
    // const reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^.{6,16}$/
    const reg = /^.*(?=.{6,16})(?=.*\d)(?=.*[A-Z]{1,})(?=.*[a-z]{1,})(?=.*[!@#$%^&*?]).*$/;
    const flag = reg.test(formData.password)
    if (!flag) {
      return Promise.reject('6-16位必须包含个数字、小写字母、大写字母、特殊字符')
    }
    // 通过验证
    return Promise.resolve()
  };

  return (
    <>
      <div className='firm-title-1'>员工管理</div>
      <div className='firm-middle firm-middle-1'>
      <Row>
          <Modal open={previewOpen} title='图片预览' footer={null} onCancel={handleCancel}>
            <img
              alt="example"
              style={{
                width: '100%',
              }}
              src={previewImage}
            /> 
          </Modal>
          <Col span={4}>上传头像:</Col>
          <Col span={12}>
            <ImgCrop rotate>
              <Upload
                action="http://localhost:3060/setting/avatar_photo"
                listType="picture-card"
                name = 'img'
                method = 'POST'
                fileList={fileList}
                onChange={onChange}
                onPreview={onPreview}
              >
                {fileList.length < 5 && '+ Upload'}
              </Upload>
            </ImgCrop>
          </Col>
        </Row>
        <Row><Col style={{fontSize: '12px',color: 'grey',marginBottom:'20px'}} offset={4}>建议上传图片尺寸为60px*60px，若不设置则使用系统默认头像</Col></Row>

        <Form 
          form={form} name="horizontal_login" 
          onFinish={onFinish} className='firm-form'
          // initialValues={Data}
          labelCol={{span: 8}}
          labelAlign={'left'}
          colon={false}
          >
          <Row align={'middle'}>
            {/* <Col span={4}>账号</Col> */}
            <Col span={12}>
              <Form.Item 
                name="account"
                label= '账号'
                rules={[
                  { required: true,message: '请输入账号'},
                  { 
                    pattern:/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
                    message: '请输入正确的账号格式',
                    validateTrigger:['onChange','onBlur']
                  }
                ]}
              >
                  <Input size={'large'} placeholder="请填写邮箱作为员工的登录账号" />
              </Form.Item> 
            </Col>
          </Row>
          <Row align={'middle'}>
            {/* <Col span={4}>员工姓名</Col> */}
            <Col span={12}>
              <Form.Item 
                name='name'
                label='员工姓名'
                rules={[{ required: true, message:'请输员工姓名'}]}
                >
                <Input size={'large'} placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            {/* <Col span={4}>员工工号</Col> */}
            <Col span={12}>
              <Form.Item name='jobNumber' label='员工工号'>
                <Input size={'large'} placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            {/* <Col span={4}>手机号码</Col> */}
            <Col span={12}>
              <Form.Item name='phone' label='手机号码'>
                <Input size={'large'} placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            {/* <Col span={4}>初始登录密码</Col> */}
            <Col span={12}>
              <Form.Item 
                name='password'
                label='初始登录密码'
                rules={[
                  { required: true,message: '请输入初始登录密码'},
                  {validator: startPassword}
                ]}
                >
                <Input size={'large'} placeholder="6到16个字符,至少包含大小写字母 数字中的两种" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            {/* <Col span={4}>所属门店</Col> */}
            <Col span={12}>
              <Form.Item name='store' label='所属门店'>
                <Select placeholder="请选择" allowClear size={'large'} style={{ width: '100%'}}>
                  <Option value="武侯区分店">武侯区分店</Option>
                  <Option value="高新区分店">高新区分店</Option>
                  <Option value="郫都区分店">郫都区分店</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            {/* <Col span={4}>选择角色</Col> */}
            <Col span={12}>
              <Form.Item 
                name='role'
                label='角色选择'
                rules={[{ required: true,message: '请选择一种角色'}]}
                >
                <Select placeholder="请选择" allowClear size={'large'} style={{ width: '100%'}}>
                  <Option value="程序员">程序员</Option>
                  <Option value="审计员">审计员</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            {/* <Col span={4}>员工转态</Col> */}
            <Col span={12}>
              <Form.Item name='staff_status' label='员工转态'>
              <Switch 
                size={'large'} 
                checkedChildren="启用" 
                unCheckedChildren="禁用"
                checked={isCheck}
                onChange={onSwitchChange}
                 />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row className='addStaff_bottom-btn'>
              <Col offset={20}>
                <Space>
                  <Button size={'large'}>取消</Button>
                  <Button type="primary" htmlType="submit" size={'large'}>保存</Button>
                </Space>
              </Col>
            </Row>
          </Form.Item>
        </Form>
      </div>




    </>
    
  )
}
