import createAxios from 'axios';

const axios = createAxios.create({
  baseURL: 'http://127.0.0.1:3060',
});


// ========================== 收款单 ==========================
// 获取数据列表
export const getReceiptApi = (data) => axios({
  url: '/funds/getReceipt',
  method: 'GET',
  params: data
})

// 获取数据详情
export const detailReceiptApi = (data) => axios({
  url: '/funds/detailReceipt',
  method: 'GET',
  params: data
})


// ========================== 其他收支 ==========================
// 获取数据
export const getOthersApi = (data) => axios({
  url: '/funds/getOthers',
  method: 'GET',
  params: data
})

// 删除数据
export const delOthersApi = (data) => axios({
  url: '/funds/delOthers',
  method: 'POST',
  data
})

// 添加数据
export const addOthersApi = (data) => axios({
  url: '/funds/addOthers',
  method: 'POST',
  data
})


// ========================== 资金流水 ==========================
// 获取数据
export const getAccountApi = (data) => axios({
  url: '/funds/getAccount',
  method: 'GET',
  params: data
})