/* 统一暴露reducers */
import loginReducer from './login/loginReducer'
import firmReducer from './setting/firmReducer'
import saleReducer from './reportForm/saleReducer'
import receiptReducer from './funds/receiptReducer'
import othersReducer from './funds/othersReducer'
import accountReducer from './funds/accountReducer'


export {
    loginReducer,
    firmReducer,
    saleReducer,
    receiptReducer,
    othersReducer,
    accountReducer
}

