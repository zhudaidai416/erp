import React from "react";
// import { useSelector } from "react-redux";
import { Routes, Route } from "react-router-dom";
/* import * as _ from "lodash"; */

import { menuData_2 } from "@/views/MyLayout/menuData";

// 树状转扁平化
const treeToLevel = (data,arr=[]) => {
    data.forEach(item => {
        const { children, ...props } = item;
        arr.push(props)

        if (children) {
            treeToLevel(children, arr)
        }
    })
    return arr
}


 const ChildrenRouter = () => {
    // 获取redux 里面的菜单类表数据
    // const authList = useSelector((state) =>state.loginReducer.authList)
    const authList = menuData_2
    
    const domData = treeToLevel(authList);
    // console.log(domData);

    const arr = domData.map((item, index) => {
        let Com = null
        if (item.component && item.component.split('/')[0] === 'components') {
            //加载组件中的页面
            Com = React.lazy(() => import(`../${item.component}.jsx`));
        }else{
            //加载views中的页面
            Com = React.lazy(() => import(`../views/${item.component}.jsx`));
        }
        
        // console.log("动态加载组件：", Com);
    
        return <Route key={item.key} path={item.path} element={<Com />} />
        // <React.Suspense callback={<div>loading...</div>}>
        // <Com />
        /* </React.Suspense>} />; */ 
    });

    return (
        <React.Suspense callback={<div>loading...</div>}>
            <Routes>{arr}</Routes>
        </React.Suspense >
    )
}

export default React.memo(ChildrenRouter)
