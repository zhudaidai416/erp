import {
  getReceipt,
  detailReceipt
} from '@/store/actionTypes/fundsActionType';
import { getReceiptApi, detailReceiptApi } from '@/http/funds/index';
import addKey from '@/utils/addKey';


export const getReceiptAction = (payload) => (
  {
    type: getReceipt,
    payload
  }
)

export const detailReceiptAction = (payload) => (
  {
    type: detailReceipt,
    payload
  }
)

export const getReceiptAsync = function (payload) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      getReceiptApi(payload)
        .then(res => {
          if (res.data.code == '200') {
            let tempData = {
              data: addKey(res.data.data, 'receipt_num'),
              total: res.data.total
            }
            // console.log('获取后台改造后的数据',tempData)
            dispatch(getReceiptAction(tempData))
            resolve()
          } else {
            reject(res.data.msg)
          }
        })
    })
  }
}

export const detailReceiptAsync = function (payload) {
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      detailReceiptApi(payload)
        .then(res => {
          if (res.data.code == '200') {
            // console.log(res.data)
            let tempData = res.data.data.map((item, index) => {
              return {
                ...item,
                key: index + 1
              }
            })
            let tempData2 = {
              detailData: tempData,
              detailPublic: res.data.detailPublic,
            }
            dispatch(detailReceiptAction(tempData2))
            resolve()
          } else {
            reject(res.data.msg)
          }
        })
    })
  }
}