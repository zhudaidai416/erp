// import { getToken } from '@/utils/token'

import {
  getSaleType,
  conditionChangeType,
} from '@/store/actionTypes/reportForm/saleActionType'

const saleData = {
  list: [],
  total: 0,
}

export default function saleReducer(state = saleData, action) {
  switch (action.type) {
    case getSaleType:
      return {
        ...state,
        list: action.payload,
      }
    case conditionChangeType:
      return {
        ...state,
        total: action.payload,
      }
    default:
      return state
  }
}
