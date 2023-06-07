import {
  getAccount
} from '@/store/actionTypes/fundsActionType';
import { getAccountApi } from '@/http/funds/index';
import addKey from '@/utils/addKey';


export const getAccountAction = (payload) => (
  {
    type: getAccount,
    payload
  }
)

export const getAccountAsync = function (payload) {
  // console.log('数据：', payload);
  return function (dispatch) {
    return new Promise((resolve, reject) => {
      getAccountApi(payload)
        .then(res => {
          if (res.data.code == '200') {
            let tempData = {
              data: addKey(res.data.data, 'account_num'),
              total: res.data.total
            }
            // console.log(tempData)
            dispatch(getAccountAction(tempData))
            resolve()
          } else {
            reject(res.data.msg)
          }
        })
    })
  }
}