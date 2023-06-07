
import { actionGetFirmData } from '@/store/actionTypes/settingActionType'

const initData = {
   data: []
};

export default function firmManage(state = initData, action) {
    switch (action.type) {
        case actionGetFirmData:
            return {
                ...state,
                data: action.payload
            }
        
        default:
            return state;
    }

}