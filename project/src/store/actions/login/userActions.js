import {
  actionLoginType,
  actionLogoutType,
  actionMenuListType,
} from '@/store/actionTypes/userActionType'

import { userLoginApi, getMenuListApi } from '@/http/usersApi/index'

import { setToken } from '@/utils/token'

import { message } from 'antd'

// 同步 - 类似 vuex - mutation

/* -------Login------- */

export const actionLogin = (payload) => ({
  type: actionLoginType,
  payload,
})

/* ---------Logout--------- */

export const actionLogout = () => ({
  type: actionLogoutType,
})

/* ------- Menu --------- */

export const actionMenu = (payload) => ({
  type: actionMenuListType,
  payload,
})

/* ---------------------------------- */

// 异步的 - 类似 vuex 的 actions

/* token 存储 */
export const loginActionAsync = (payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      userLoginApi(payload).then((res) => {
        if (res.code === 200) {
          dispatch(actionLogin(res.data.token)) // 将token 存入 Redux 里面

          setToken(res.data.token) // 将token 存入 浏览器里面
          resolve()
        } else {
          message.error('登录失败')
          reject()
        }
      })
    })
  }
}

/* 菜单存储 */
export const getMenuListAsync = () => {
  return (dispatch) => {
    getMenuListApi()
      .then((res) => {
        if (res.code === 200) {
          dispatch(actionMenu(res.data)) // 将菜单列表存储到redux里面
        } else {
          console.log('菜单存储失败....')
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
}

/* export const loginAsync = (data) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      // 模拟异步
      setTimeout(() => {
        dispatch(loginAction(data));
        resolve()
      }, 500);
    })
  };
}; */
