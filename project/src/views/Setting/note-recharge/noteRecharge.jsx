import React from 'react'

import { Tabs } from 'antd';

import NoteComponent from "@/components/setting/NoteComponent";
import RechargeRecord from "@/components/setting/RechargeRecord";


const onChange = (key) => {
  console.log(key);
};

export default function NoteRecharge() {

  return (
    <Tabs
    defaultActiveKey="1"
    destroyInactiveTabPane={true}
    onChange={onChange}
    size={'large'}
    items={[
      {
        label: `短信充值`,
        key: '短信充值',
        children: <NoteComponent />,
      },
      {
        label: `短信充值记录`,
        key: '短信充值记录',
        children: <RechargeRecord />,
      },
    ]}
  />
  )
}
