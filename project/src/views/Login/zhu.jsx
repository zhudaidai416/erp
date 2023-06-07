import React from "react";
import '../../assets/scss/homepage/tu.scss'
import { Button, Checkbox, Input } from 'antd';
import { Link } from 'react-router-dom';


// 遵守协议勾选框
const onChange = (e) => {
    console.log(`checked = ${e.target.checked}`);
};



// 验证用户名格式
const username = (event) => {
  let val = event.currentTarget.value;
  let tip = '';
  tip = val === '' ? '' : val.length < 2 ? '用户名要为2位以上的字符哦' : '';
  this.setState({
    username: val,
    usernameTip: tip
  })
}

// 验证手机号格式
const tel = (event) => {
  let val = event.currentTarget.value;
  let tip = '';
  if ( val.length === 0 ) {
    tip = ''
  }else if ( !(/^1[34578]\d{9}$/.test(val)) ) {
    tip = '请输入正确的手机号'
  } else {
    tip = ''
  }
  this.setState({
    tel: val,
    telTip: tip
  })
}

// 验证密码
const password = (event) => {
  let val = event.currentTarget.value;
  let tip = '';
  if ( val.length === 0) {
    tip = ''
  } else if (!(/^[a-zA-Z]{1}([a-zA-Z0-9]|[._]){5,15}$/.test(val)) ) {
    tip = '密码必须以字母开头，6-16位数字、字母、下划线和.'
  } else {
    tip = ''
  }
  this.setState({
    password: val,
    passwordTip: tip
  })
}



export default function zhu(){
    return (
      <div>
          <div className="tupian">
            <div className="da">
              <div className="da_left">
                <div className="left_top">七尾云进销存连锁版</div>
                <div className="left_end">© 2020 衡大志原型工作室</div>
              </div>
              <div className="da_right">
                <div className="right_dl">
                  <div className="dl_top">注册账号</div>
                  <div className="dl_input">
                    <Input size="large" className='input_shang' placeholder="请输入手机号码" prefix={<p>手机号码</p>} />
                    <Input size="large" className='input_xia' placeholder="请输入密码" prefix={<p>密码</p>} />
                  </div>
                  <div className="dl_zs">
                    <Checkbox onChange={onChange}></Checkbox> 注册即表示你同意遵守《服务协议》
                  </div>
                  <Button type="primary" className="dl_an">
                    <Link to="/login">快速开通</Link>
                  </Button>
                  <div className="dl_wu">
                    <Link to="/login">已有账号,现在去登录</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    )
}