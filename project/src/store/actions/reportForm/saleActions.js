import {
  getSaleType,
  conditionChangeType,
} from '@/store/actionTypes/reportForm/saleActionType'
import { reqGetSale } from '@/http/reportForm/saleHttp'
import addKey from '@/utils/addKey'

const conditionChange = (payload) => ({
  type: conditionChangeType,
  payload,
})

const actionGetSale = (payload) => ({
  type: getSaleType,
  payload,
})

const getSaleAsync = (payload) => {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      reqGetSale(payload).then((res) => {
        if (res.code === 200) { 
          dispatch(conditionChange(res.total))
          dispatch(actionGetSale(addKey(res.data, 'saId')))
          resolve(true)
        } else {
          console.log(res)
          reject(false)
        }
      })
    })
  }
}

export { getSaleAsync, conditionChange }
