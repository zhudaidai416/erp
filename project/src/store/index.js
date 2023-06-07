import {
  legacy_createStore as createStore,
  combineReducers,
  applyMiddleware,
  compose,
} from 'redux'

import thunkMiddleware from 'redux-thunk' // 异步处理模块

import {
  loginReducer, firmReducer, saleReducer,
  receiptReducer, othersReducer, accountReducer
} from "./reducers/index";  // 引入子模块

const mainReducer = combineReducers({
  loginReducer,
  firmReducer,
  saleReducer,
  receiptReducer,
  othersReducer,
  accountReducer
})

const middlewares = [
  // 三方模块通过该中间件注册
  thunkMiddleware,
]

// Redux DevTools 配置
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  mainReducer,
  composeEnhancers(applyMiddleware(...middlewares)),
)

/* 检测state的变化 */
store.subscribe(() => {
  console.log('数据发生改变', store.getState())
})

export default store
