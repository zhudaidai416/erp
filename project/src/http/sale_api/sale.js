import axios from './index';

// 活动列表
// export const getActivityDataApi = ({
//   currentPage = 1,
//   pageSize = 5,
// }) => axios({
//   url: '/sys/activity/list',
//   method: 'GET',
//   params: {
//     currentPage,
//     pageSize,
//   }
// });


// 审核活动
// export const checkActivityApi = (data) => axios({
//   url: '/sys/activity/check',
//   method: 'POST',
//   data
// })


//············································tuPian页面
//上传图片    
export const addApi = (data) => axios({
  url: '/sale/add',
  method: 'POST',
  data
})
//·············································tuPian页面




//·············································AddSaleOrder页面
// 商品列表
export const getDataApi = () => axios({
  url: '/sale/list',
  method: 'GET',
});

// 添加订单数据
export const addOrderDataApi = (data) => axios({
  url: '/sale/addOrder',
  method: 'POST',
  data
});

// 添加订单编号数据
export const addOrderNumberDataApi = (data) => axios({
  url: '/sale/addOrderNumber',
  method: 'POST',
  data
});
//·············································AddSaleOrder页面



//·············································SaleOrder页面
//获取订单列表
export const getOrderDataApi = (params) => axios({
  url: '/sale/orderList',
  method: 'GET',
  params
});

export const delOrderApi = (data) => axios({   //删除订单
  url: '/sale/delOrder',
  method: 'POST',
  data:{
    id:data
  }
});

//·············································SaleOrder页面


//·············································DetailsSale页面
//查询订单列表
export const selectOrderDataApi = (params) => axios({
  url: '/sale/selectOrder',
  method: 'GET',
  params
});

//审核状态
export const auditDataApi = (data) => axios({
  url: '/sale/auditDataApi',
  method: 'POST',
  data
});

//·············································DetailsSale页面