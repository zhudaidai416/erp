import { actionGetFirmData} from "@/store/actionTypes/settingActionType";

import { getFirmDataApi } from "@/http/settingApi/index";


import { message } from "antd";

// 同步 - 类似 vuex - mutation


/* ------- Firm --------- */

export const actionFirm = (payload) => ({
    type: actionGetFirmData,
    payload
})

/* ---------------------------------- */

// 异步的 - 类似 vuex 的 actions

/* token 存储 */
export const actionFirmAsync = () => {

  return (dispatch) => {
      return new Promise((resolve, reject) => {
        getFirmDataApi().then((res) => {
          if (res.code === '200') {
            dispatch(actionFirm(res.data)); // 将数据 存入 Redux 里面
            resolve(res.data[0])
          } else {
            message.success('存储失败')
            reject()
          }
        });
      })
  };
};


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
