import React, { useEffect } from 'react'

import { Col, Row, Upload, Input, Select, Modal, Form, Space, Button, message } from 'antd';

import ImgCrop from 'antd-img-crop';

import './firmMessage.scss'

import { useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { actionFirmAsync } from "@/store/actions/setting/settingActions";

import { changeFirmDataApi } from '@/http/settingApi/index'


export default function FirmMessage() {
  const { Option } = Select;

  /* form表单 */
  const [form] = Form.useForm();
  
  const dispatch = useDispatch()
  /* 获取 redux 里面 firm 的数据 */
  const firmData = useSelector((state) => state.firmReducer.data)

  
  /* 图片上传 */
  const [fileList, setFileList] = useState([])
  const [previewOpen, setPreviewOpen] = useState(false); //模态框
  const [previewImage, setPreviewImage] = useState(''); // 图片SRC

  const handleCancel = () => setPreviewOpen(false); //取消模态框

  /* 图片 onchange 回调 */
  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  /* 图片预览回调 */
  const onPreview = async (file) => {
    // console.log(file);
    setPreviewImage(file.response.src) 
    setPreviewOpen(true);
  }


  /* useEffect 生命周期函数 */
  useEffect(() => {
    //获取firm数据
    dispatch(actionFirmAsync()).then(res => {
      form.setFieldsValue(res);
      // console.log(res.firm_logo);
      setFileList([{
        ...fileList,
        url: res.firm_logo
      }
      ])
    })

  },[])

  /* 表单验证成功后提交 */
  const onFinish = (values) => {
    values.firm_logo = fileList[fileList.length-1].url
    console.log(values);
    // 发起请求修改数据
    changeFirmDataApi(values)
    .then(res => {
      console.log(res)
      if (res.code === '200') {
        message.success(res.msg)
      }else{
        message.error('修改失败')
      }
      
    })
  }
  
  return (
    <>
      <div className='firm-title'>企业管理</div>
      <div className='firm-middle'>
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
          <Col span={4}>企业logo:</Col>
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
        <Form 
          form={form} name="horizontal_login" 
          onFinish={onFinish} className='firm-form'
          // initialValues={Data}
          >
          <Row align={'middle'}>
            <Col span={4}>企业名称</Col>
              <Col span={12}>
                <Form.Item name="firm_name">
                    <Input size={'large'} placeholder="七尾云科技有限公司" value={124}/>
                </Form.Item> 
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={4}>企业账户</Col>
            <Col span={12}>
              <Form.Item name='firm_account'>
                <Input size={'large'} placeholder="1339000@163.com" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={4}>所属行业</Col>
            <Col span={12}>
              <Form.Item name='firm_industry'>
                <Select placeholder="请选择" allowClear size={'large'} style={{ width: '100%'}}>
                  <Option value="1">教育</Option>
                  <Option value="2">互联网</Option>
                  <Option value="3">娱乐</Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={4}>到期时间</Col>
            <Col span={12}>
              <Form.Item name='firm_datedTime'>
                <Input size={'large'} placeholder="2028/09/09" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={4}>联系人姓名</Col>
            <Col span={12}>
              <Form.Item name='contact_name'>
                <Input size={'large'} placeholder="陈佳豪" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={4}>联系人电话</Col>
            <Col span={12}>
              <Form.Item name='contact_phone'>
                <Input size={'large'} placeholder="17628236387" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={4}>公司地址</Col>
            <Col span={12}>
              <Form.Item name='firm_address'>
                <Input size={'large'} placeholder="四川省成都市" />
              </Form.Item>
            </Col>
          </Row>
          <Row align={'middle'}>
            <Col span={4}>备注信息</Col>
            <Col span={12}>
              <Form.Item name='firm_note'>
                <Input size={'large'} placeholder="请输入" />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item>
            <Row>
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
