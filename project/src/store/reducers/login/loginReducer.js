import { getToken } from '@/utils/token';

import { 
    actionLogoutType, 
    actionLoginType,
    actionMenuListType
} from '@/store/actionTypes/userActionType'

const initData = {
    token:getToken() || '',
    userId: null,
    username: null,
    authList: [],
};



export default function loginReducer(state = initData, action) {
    switch (action.type) {
        case actionLoginType:
            return {
                ...state,
                token: action.payload
            }
        case actionLogoutType:
            return {
                ...state,
                token: ''
            }
        case actionMenuListType:
            return {
                ...state,
                authList: action.payload
            }
        default:
            return state;
    }

}