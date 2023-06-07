import {
  getAccount,
} from '@/store/actionTypes/fundsActionType'

const INIT_STATE = {
  data: [],
  total: 0
}
export default function accountReducer(state = INIT_STATE, action) {
  switch (action.type) {
    case getAccount:
      return {
        ...state,
        data: action.payload.data,
        total: action.payload.total
      }
    default:
      return state;
  }
}