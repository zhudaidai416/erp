import React, { useEffect, useState } from 'react'

import { Col, Row, Button, Space, message } from 'antd';

import * as _ from 'lodash'; //引入插件，深拷贝数组

import { getRemainNumAip, RechargeRecordApi } from "@/http/settingApi/index";

export default function NoteComponent() {

  const [btn_arr,setBtn_arr] = useState([
    { key:'1',count: 1000,money: 100,state: false },
    { key:'2',count: 2000,money: 200,state: false },
    { key:'3',count: 5000,money: 500,state: false },
    { key:'4',count: 10000,money: 1000,state: false },
    { key:'5',count: 20000,money: 2000,state: false },
  ])

  const [money, setMoney] = useState()
  const [count, setCount] = useState()

  /* useEffect 生命周期函数 */
  useEffect(() => {
    //请求获取当前用户的剩余短信条数
    getRemainNumAip().then(res => {
      setCount(res.data)
    })
  },[])

  /* 选择充值金额函数 */
  const btnOnclick = (id) => {
    // 借用 lodash 函数库来实现深拷贝
    const cloneArr = _.cloneDeep(btn_arr)
    cloneArr.forEach(item =>{
      item.state = false
      if (item.key === id) {
        item.state = true
        setMoney(item.money)
      }
      return item
    })
    setBtn_arr(cloneArr)
  }

  /* 确认充值函数 */
  const confirm = () => {
    const cloneArr = _.cloneDeep(btn_arr)
    let AllCount = cloneArr.find(item => item.state).count
    //调用接口，将充值金额写到对应的user里面
    RechargeRecordApi({money,AllCount}).then(res => {
      if (res.code === '200') {
        message.success('充值成功')
        setBtn_arr((pre) => {
          pre.forEach(item => {
            item.state = false
            return item
          })
          return pre
        })
        setMoney('')
        //请求获取当前用户的剩余短信条数
        getRemainNumAip().then(res => {
          setCount(res.data)
        })
      }
    })
  }

  /* 防抖函数封装 */
  const testDebounce = _.debounce(confirm, 2000, {
    leading: true,
    trailing: false
  })


  return (
    <div>
      <Space direction={'vertical'} size={'large'}>
        <Row>
          <Col span={8}>剩余短信数量（条）:</Col>
          <Col span={12}>{count}</Col>
        </Row>
        <Row align={'middle'}>
          <Col span={8}>选择充值数量（条）：</Col>
          <Col span={12}>
          <Space size={'large'}>
            {btn_arr.map((item) => (
              <Button onClick={() =>btnOnclick(item.key)} key={item.key} type={item.state?'primary':'default'}>{item.count}</Button>
            ))}
          </Space>
          </Col>
        </Row>
        <Row>
          <Col span={4}>金额（元）：</Col>
          <Col span={12} style={{color:'red'}}>{money}</Col>
        </Row>
        <Row>
          <Col span={4}><Button type="primary" onClick={testDebounce}>确认充值</Button></Col>
        </Row>
      </Space>
    </div>
  )
}
