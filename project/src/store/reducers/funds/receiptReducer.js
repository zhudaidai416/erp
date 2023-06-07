import {
  getReceipt,
  detailReceipt
} from '@/store/actionTypes/fundsActionType'

const INIT_STATE = {
  data: [],
  total: 0,
  detailData: [],
  detailPublic: []
}
export default function receiptReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case getReceipt:
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total
      }

    case detailReceipt:
      // console.log('数据：',action.payload)
      return {
        ...state,
        detailData: action.payload.detailData,
        detailPublic: action.payload.detailPublic
      }
    default:
      return state;
  }
}