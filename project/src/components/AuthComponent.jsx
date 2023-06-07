/* 路由鉴权 */
// 1. 判断token是否存在
// 2. 如果存在，直接正常渲染
// 3. 如果不存在，重定向到登录路由

/* 高阶组件 */
import React from 'react'
import { getToken, setSubmenuItem } from "@/utils/token";
import { Navigate, useLocation } from 'react-router-dom';

function AuthComponent({ children }) {

  let location = useLocation();

  location.state && setSubmenuItem(location.state.name)

  const isToken = getToken()

  if (isToken) {
    return <>{ children }</>
  }else{
    return <Navigate to='/login' replace /> // 重定向到登录路由
  }
} 
    

// <AuthComponent> <Layout /> </AuthComponent>
// 登录：<> <Layout /> </>
// 非登录：<Navigate to='/login' replace />

export { AuthComponent }
