import React from 'react'
import '../../assets/scss/homepage/tu.scss'
import { Button, Form, Input, message } from 'antd';

import { useNavigate, Link } from "react-router-dom";

/* redux */
import { useDispatch } from 'react-redux'

import { loginActionAsync, getMenuListAsync } from "@/store/actions/login/userActions";



export default function Login() {

  /* form表单 */
  const [form] = Form.useForm();

   /* 路由实例 */
   const navigate = useNavigate()

   const dispatch = useDispatch()


  /* 自定义校验密码规则 */
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


  /* 规则验证通过后 */
  const onFinish = async (values) => {
    const {username:userName,password} = values //解构重命名

    dispatch(loginActionAsync({userName,password})).then(res => {

      dispatch(getMenuListAsync())
      
      navigate('/transferpage',{replace: true})
      message.success('登录成功')
    })
  }
  /* 规则验证失败后执行 */
  const onFinishFailed = (errorInfo) => {
    message.error('登录失败')
    console.log('Failed:', errorInfo);
  };

  const OnFormBlur = () => {
    
  }

  return (
    <div>
      <div className="tupian">
        <div className="da">
          <div className="da_left">
            <div className="left_top">七尾云进销存连锁版</div>
            <div className="left_end">© 2020 衡大志原型工作室</div>
          </div>
          <div className="da_right">
            <Form
              onBlur={OnFormBlur}
              form={form}
              name="normal_login"
              className="login-form"
              validateTrigger={['onBlur','onChange']}
              initialValues={{
                username: '1287545148@qq.com',
                password: 'Lyc@1314'
              }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
            >
              <div className="right_dl">
                <div className="dl_top">欢迎登录</div>
                <div className="dl_input">
                  <Form.Item
                    name="username"
                    rules={[
                      { required: true,message: '请输入账号'},
                      { 
                        pattern:/^([a-zA-Z\d][\w-]{2,})@(\w{2,})\.([a-z]{2,})(\.[a-z]{2,})?$/,
                        message: '请输入正确的账号格式',
                        validateTrigger:['onChange','onBlur']
                      }
                    ]}
                  >
                    <Input size="large" className='input_shang' placeholder="请输入注册时填写的邮箱" prefix={<b>账号</b>} />
                  </Form.Item>

                  <Form.Item
                    name="password"
                    rules={[
                      { required: true,message: '请输入初始登录密码'},
                      {validator: startPassword}
                    ]}
                  >
                    <Input size="large" type='password' className='input_xia' placeholder="请输入密码" prefix={<b>密码</b>} />
                  </Form.Item>  
                </div>
                <div className="dl_wang">忘记密码请联系客服</div>
                <Form.Item>
                  <Button type="primary" htmlType="submit" className="dl_an">登录</Button>
                </Form.Item>
                <div className="dl_wu">
                  <Link to="/zhu">没有账号，现在去注册</Link>
                </div>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  )
}
