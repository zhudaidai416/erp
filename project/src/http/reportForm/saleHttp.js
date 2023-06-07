import createAxios from '@/config/axios'

const axios = createAxios('http://localhost:3060')

// 获取销售明细表
const reqGetSale = (payload) => {
  return axios.post('sale/getSale', { payload })
}

export { reqGetSale }
