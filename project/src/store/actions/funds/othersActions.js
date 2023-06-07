import {
  getOthers
} from '@/store/actionTypes/fundsActionType';
import { getOthersApi, delOthersApi, addOthersApi } from '@/http/funds/index';
import addKey from '@/utils/addKey';


export const getOthersAction = (payload) => (
  {
    type: getOthers,
    payload
  }
)

// ========================== 数据渲染 ==========================
export const getOthersAsync = function (payload) {
  // console.log('数据：', payload);
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      getOthersApi(payload)
        .then(res => {
          if (res.data.code == '200') {
            let tempData = {
              data: addKey(res.data.data, 'cost_num'),
              total: res.data.total
            }
            // console.log(tempData)
            dispatch(getOthersAction(tempData))
            resolve()
          } else {
            reject(res.data.msg)
          }
        })
    })
  }
}

// ========================== 删除 ==========================
export const delOthersAsync = function (payload) {
  // console.log('数据：', payload);
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      delOthersApi(payload)
        .then(res => {
          if (res.data.code == '200') {
            // console.log(res.data)
            resolve()
          } else {
            reject(res.data.msg)
          }
        })
    })
  }
}

// ========================== 添加 ==========================
export const addOthersAsync = function (payload) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      addOthersApi(payload)
        .then(res => {
          if (res.data.code == '200') {
            // console.log(res.data)
            resolve()
          } else {
            reject(res.data.msg)
          }
        })
    })
  }
}