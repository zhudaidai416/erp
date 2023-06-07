import { BellOutlined, CaretDownOutlined, MessageFilled } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Dropdown, Space, Badge, notification } from 'antd';
import React, { useEffect, useState } from 'react';
// import { Outlet } from 'react-router-dom';
import { menu } from './Menu';

import { useNavigate, Link } from "react-router-dom";
import { removeToken, getSubmenuItem, delSubmenuItem } from "@/utils/token";
import { actionLogout } from '@/store/actions/login/userActions'
import { useDispatch } from 'react-redux'
import '../../assets/scss/index.scss';

import ChildrenRouter from "@/router/childrenRouter";

const { Header, Content, Footer, Sider } = Layout;


export default function MyLayout() {
  /* console.log(menu); */
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const back = () => {
    navigate('/login', { replace: true })
    removeToken() // 清空浏览器里面的token
    delSubmenuItem()
    dispatch(actionLogout()) // 清除 Redux 里面的token
  }

  const items = [
    {
      label: '个人信息',
      key: '1',
    },
    {
      label: '修改密码',
      key: '2',
    },
    {
      label: <span onClick={back}>退出登录</span>,
      key: '3',
    },
  ];


  // const navigator = useNavigate()
  const [menuItem, setMenuItem] = useState([
    {
      key: '1.1', label: '首页',
      children: [
        { key: '/home', label: <Link to="/">首页</Link> }
      ]
    }
  ]);

  const [breadCrumb, setBreadCrumb] = useState(['首页'])
  // 二级菜单选择
  const chooseMenu = (e) => {
    
    console.log(getSubmenuItem());
    setMenuItem(e.item.props.item)
    let obj = menu.find(item => (item.key === e.key ))
    setBreadCrumb([obj.label])
  }

  useEffect(() => {
    
    setBreadCrumb((pre) => {
      let pro = [...pre]
      if (getSubmenuItem()) {
        pro[1] = getSubmenuItem()
      }
      return pro
  })

  },[getSubmenuItem()])


  // 作者微信弹窗
  const authorWx = () => {
    notification.open({
      description:
        <div>
          <img className='author-wx' src={require('../../assets/images/wx.jpg')} alt="" />
          <div>作者：衡大志</div>
        </div>,
      placement: 'bottomRight',
      duration: 2,
      style: {
        width: '210px',
        height: '230px',
        right: '60px',
        bottom: '-20px',
        textAlign: 'center',
        borderRadius: '15px'
      }
    });
  }
  return (
    <Layout
      style={{
        height: '100vh',
      }}
    >
      <Sider
        width={65}
        style={{
          height: '100vh'
        }}
      >
        <div className='logo'>Logo</div>
        {/* ========================== 一级菜单 ========================== */}
        <Menu
          className='menu1'
          theme="dark"
          mode="inline"
          items={menu}
          /* defaultSelectedKeys={['1']} */
          onClick={chooseMenu}
        />
      </Sider>
      <Sider
        width={180}
        style={{
          height: '100vh'
        }}
      >
        {/* ========================== 二级菜单 ========================== */}
        <Menu
          className='menu2'
          mode="inline"
          items={menuItem}
          style={{
            overflowY: 'scroll',
            overflowX: 'hidden'
          }}
        // openKeys={menuItem.children}
        // // 注意这个属性 `onOpenChange`
        // onOpenChange={(openKeys) => {
        //   setMenuItem(openKeys);
        // }}
        />
      </Sider>

      <Layout className="site-layout"
        style={{
          backgroundColor: '#F5F9FF'
        }}>
        <Header className="header">
          <div className='system-title'>欢迎登录朝阳路分店！</div>
          <div className='system-user'>
            <Badge dot className='system-icon'>
              <BellOutlined />
            </Badge>
            <div>
              <Dropdown
                menu={{ items }}
              >
                <Space>
                  <Badge dot className='user-status'>
                    <img className='user-avatar' src={require("../../assets/images/avatar.jpg")} alt="" />
                  </Badge>
                  用户名
                  <CaretDownOutlined style={{ color: '#cccccc', marginLeft: '10px' }} />
                </Space>
              </Dropdown>
            </div>
          </div>
        </Header>

        <Content
          style={{
            padding: '0 30px',
            overflowY: 'scroll',
            backgroundColor: '#F5F9FF'
          }}
        >
          <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            {breadCrumb.map((item,index) => (
              <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
            ))}
            {/* <Breadcrumb.Item>首页</Breadcrumb.Item> */}
          </Breadcrumb>
          <div
            className="site-layout-background"
          >
            {/* <Outlet /> */}
            <ChildrenRouter />
          </div>

          <Footer
            style={{
              textAlign: 'center',
              backgroundColor: '#F5F9FF'
            }}
          >
            © 2022 衡大志工作室
          </Footer>
          <div className='author' onClick={authorWx}>
            <MessageFilled className='author-icon' />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
}

