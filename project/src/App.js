import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import MyRouter from '@/router/index'
// import { AuthComponent } from "@/components/AuthComponent";


function App() {
  return (
    <div className="App">
      <ConfigProvider locale={zhCN}>
         <MyRouter/>
      </ConfigProvider>
    </div>
  )
}

export default App
