import React, { useEffect, useState } from 'react'

import '@/views/Setting/print-template/templateMessage.scss'

import { Col, Row, Input, Form, Space, Button, Switch, message, Checkbox } from 'antd';

import { useForm } from 'antd/es/form/Form';

import { useSearchParams, useNavigate } from "react-router-dom";

import { getTemplateMessageByIdApi, changeTemplateDataApi } from "@/config/settingApi/index";

export default function TemplateMessage() {

    const { TextArea } = Input;

    /* 缓存数组 */
    const [objData,setObjData] = useState({})

    /* 获取 form 实例 */
    const [form] = useForm()

    /* checkBox 数组 */
    const [checkboxArr,setCheckboxArr] = useState([])

    /* 路由参数 */
    const navigate = useNavigate()
    const [searchParams] = useSearchParams()
    /* console.log('获取查询参数：', searchParams.get('id')); */

    /* useEffect 生命周期函数 */
    useEffect(() => {
        // 请求获取对应页面的数据
        getTemplateMessageByIdApi(searchParams.get('id'))
        .then(res => {
            if (res.code === '200') {
                const arr  = res.data.template_field.split('、')
                res.data.template_status ? res.data.template_status=true : res.data.template_status=false
                setIsCheck(res.data.template_status)
                setCheckboxArr(arr)
                res.data.template_field = arr
                form.setFieldsValue(res.data);
                setObjData(res.data)
            }
        })

    },[])


    /* 保存按钮 表单 onFinish */
    const onFinish = (values) => {
        setObjData((pre) =>{
            let obj =  {...pre,...values}
            // 发起请求 修改数据
            changeTemplateDataApi(obj).then(res => {
                if (res.code === '200') {
                    message.success(res.msg)
                    navigate('/printTemplate')
                }
            })

            return obj
        })
        
    }

    /* 取消 */
    const cancel = () => {
        navigate('/printTemplate')
    }

    /* 是否选中 */
    const [isCheck,setIsCheck] = useState(false)

    /* SwitchChange 函数 */
    const onSwitchChange = (values) => {
        console.log(values);
        setIsCheck(values)
    }

    /* onChangeCheckbox 多选框改变 */
    const onChangeCheckbox = (values) => {
        setCheckboxArr(values)
    }

    /* onChangeTitle 标题改变 */
    const onChangeTitle = (value) => {
        setObjData((pre) => (
            {
                ...pre,
                template_type:value.target.value
            }
        ))
    }

    /* onChangeFooter foot改变 */
    const onChangeFooter = (value) => {
        setObjData((pre) => (
            {
                ...pre,
                template_remark:value.target.value
            }
        ))
    }


  return (
    <>
        <div className='template-title-1'>模板信息</div>
        <div className='templateMessage-table'>
            <Form
                className='templateMessage-form'
                form={form} 
                onFinish={onFinish} 
            >
                <Row align={'middle'}>
                    <Col span={3}>模板名称</Col>
                    <Col span={8}>
                        <Form.Item name="template_name">
                            <Input size={'large'} placeholder="请输入名称"/>
                        </Form.Item> 
                    </Col>
                </Row>
                <Row align={'middle'}>
                    <Col span={3}>标题</Col>
                    <Col span={8}>
                        <Form.Item name="template_type">
                            <Input size={'large'} placeholder="请输入模板标题" onChange={onChangeTitle}/>
                        </Form.Item> 
                    </Col>
                </Row>
                <Row align={'middle'}>
                    <Col span={3}>页脚</Col>
                    <Col span={8}>
                        <Form.Item name="template_remark">
                            <TextArea rows={4} placeholder="请输入页脚内容" onChange={onChangeFooter} />
                        </Form.Item> 
                    </Col>
                </Row>
                <Row align={'middle'}>
                    <Col span={3}>模板状态</Col>
                    <Col span={8}>
                        <Form.Item name="template_status">
                            <Switch 
                                checkedChildren="启用" 
                                unCheckedChildren="禁用" 
                                checked={isCheck}
                                onChange={onSwitchChange}
                            />
                        </Form.Item> 
                    </Col>
                </Row>
                <Row align={'middle'}>
                    <Col span={3}>配置字段</Col>
                    <Col span={20} >
                        <Form.Item name="template_field">
                            <Checkbox.Group onChange={onChangeCheckbox} value={checkboxArr}>
                                <Space size={40}> 
                                    <Checkbox value="折扣率">折扣率</Checkbox>  
                                    <Checkbox value="折扣金额">折扣金额</Checkbox>  
                                    <Checkbox value="附加金额">附加金额</Checkbox>
                                    <Checkbox value="结算方式">结算方式</Checkbox>
                                    <Checkbox value="备注">备注</Checkbox>
                                </Space>
                            </Checkbox.Group>
                        </Form.Item> 
                    </Col>
                </Row>
                <Form.Item>
                    <Row className='template_bottom-btn'>
                    <Col offset={20}>
                        <Space>
                            <Button size={'large'} onClick={cancel}>取消</Button>
                            <Button type="primary" htmlType="submit" size={'large'}>保存</Button>
                        </Space>
                    </Col>
                    </Row>
                </Form.Item>
            </Form>

        </div>
        <div className='template-preview'>预览</div>
        {isCheck && <div className='template-card'>
            <h1 className='card-title'>{objData.template_type}</h1>
            <div className='card-top'>
                <p>PO20170725022</p>
                <p>2022.11.16 10:54</p>
                <p>客 户&emsp;<span>客户1</span></p>
                <p>经手人<span>七尾</span></p>
            </div>
            <div className='card-middle'>
                <table>
                   <thead>
                        <tr>
                            <th>货号/品名</th>
                            <th>单价</th>
                            <th>数量</th>
                            <th>小计</th>
                        </tr>
                   </thead>
                    <tbody>
                        <tr>
                            <td>0001/懒羊羊动力饮料</td>
                            <td>50.00</td>
                            <td>1.00</td>
                            <td>50.00</td>
                        </tr>
                        <tr>
                            <td>0002/喜滋饼干</td>
                            <td>10.00</td>
                            <td>1.00</td>
                            <td>10.00</td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colSpan="2">合计</td>
                            {/* <td>10.00</td> */}
                            <td>2.00</td>
                            <td>60.00</td>
                        </tr>
                    </tfoot>
                </table>
            </div>
            <div className='card-bottom'>
                {checkboxArr.includes('折扣率') && <p>折扣率 &emsp;<span>5%</span></p>}
                {checkboxArr.includes('折扣金额') && <p>折扣金额 <span>3.00</span></p>}
                {checkboxArr.includes('附加金额') && <p>附加金额 <span>10.00</span></p>}
                {checkboxArr.includes('结算方式') && <p>结算方式 <span>现金</span></p>}
                {checkboxArr.includes('实收金额') && <p>实收金额 <span>67.00</span></p>}
                {checkboxArr.includes('备注') && <p>备 注&emsp;&emsp;<span>{objData.template_remark}</span></p>}
            </div>
        </div>}

    </>
  )
}

