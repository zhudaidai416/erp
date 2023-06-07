
const saleModel = require('../../modules/sale/sale');
// const axios = require('axios');

module.exports = {
  //添加商品
  async add(req, res) {
    console.log('接收到添加活动请求参数：', req.body);
    // if (!req.body.title || !req.body.body || !req.body.dateSel || !req.body.address || !req.body.address.name || !req.body.address.latitude || !req.body.address.longitude || !req.body.openid) {
    //   return res.json({
    //     code: '1001',
    //     msg: '参数不正确'
    //   })
    // }
    const data = [
      req.body.name,
      req.body.price,
      req.body.inventory,
      req.body.img,
      req.body.classification,
      req.body.specifications,
      req.body.unit,
    ]
    console.log('-----', data);
    const resp = await saleModel.add(data);
    console.log('插入数据库：', resp);

    res.json({
      code: '200',
      msg: 'ok'
    });
  },
  // 获取活动列表
  // async list(req, res) {
  //   let { currentPage, pageSize } = req.query;
  //   currentPage = parseInt(currentPage);
  //   pageSize = parseInt(pageSize);
  //   console.log('活动列表参数', currentPage, pageSize);
  //   const startIndex = (currentPage - 1) * pageSize;

  //   if (!currentPage || !pageSize) {
  //     return res.json({
  //       code: '1001',
  //       msg: '参数错误'
  //     })
  //   }

  //   const resp = await saleModel.list([startIndex, pageSize]);
  //   // console.log('查询活动列表：', resp);

  //   res.json({
  //     code: '200',
  //     msg: 'ok',
  //     data: resp
  //   })
  // },
  // 活动详情
  // async detail(req, res) {
  //   let { id } = req.query;
  //   id = Number(id);
  //   if (!id) {
  //     return res.json({
  //       code: '1001',
  //       msg: '参数不正确'
  //     });
  //   }

  //   const resp = await saleModel.detail([id])
  //   console.log('详情数据:', resp);

  //   if (resp.length === 0) {
  //     return res.json({
  //       code: '1001',
  //       msg: '数据不存在'
  //     })
  //   }

  //   res.json({
  //     code: '200',
  //     msg: 'ok',
  //     data: resp[0]
  //   })
  // },
  // 参与活动
  // async join(req, res) {
  //   const { openid, activity_id } = req.query;
  //   if (!openid || !activity_id) {
  //     return res.json({
  //       code: '1001',
  //       msg: '参数不正确'
  //     });
  //   }

  //   const respFindUser = await saleModel.findUser(openid);
  //   console.log('确认用户存在', respFindUser);
  //   if (respFindUser.length == 0) {
  //     return res.json({
  //       code: '1001',
  //       msg: '非法操作'
  //     });
  //   }

  //   const respDetail = await saleModel.detail([activity_id])
  //   console.log('详情数据:', respDetail);

  //   const respAddCount = await saleModel.addCount([respDetail[0].current_count + 1, activity_id]);
  //   console.log('操作数量增加', respAddCount);

  //   const respAddUser = await saleModel.addUser([activity_id, openid]);
  //   console.log('将用户存在活动详情表', respAddUser);

     // 新建一条参与活动的通知
    // (NULL, '您的活动有新参与者',2,'activity_id',5,'参与者openid',1,'活动发布者id',DEFAULT,DEFAULT)
  //   const joinNotifyRes = await saleModel.activityJoinNotify([activity_id, openid, respDetail[0].activity_openid]);
  //   console.log("新建活动通知：", joinNotifyRes);

  //   res.json({
  //     code: '200',
  //     msg: 'OK'
  //   });
  // },
  
  // 活动封面图上传
  uploadpreview(req, res) {
    console.log("文件上传：", req.file);
    console.log("文件上传其他信息：", req.body);
    const url = 'http://localhost:3060/sale_uploads/' + req.file.filename

    res.json({
      code: '200',
      msg: 'ok',
      data: url
    });
  },

  // 获取商品列表
  async list(req, res) {
    const resp = await saleModel.list();
    // console.log('查询活动列表：', resp);

    res.json({
      code: '200',
      msg: 'ok',
      data: resp
    })
  },



  //添加订单数据
  async addOrder(req, res) {
    console.log('接收到添加订单数据请求参数：', req.body);
    const data = [
      req.body.date1,
      req.body.state,
      req.body.customer,
      req.body.totalMoney,
      req.body.warehouse[0],
      req.body.warehouse[1],
      req.body.responsiblePerson,
      req.body.discount,
      req.body.discountAmount,
      req.body.additionalAmount,
      req.body.methodSettlement,
      req.body.documentNote,
      req.body.documentNumber,
    ]
    console.log('-----', data);
    const resp = await saleModel.addOrder(data);
    console.log('插入数据库：', resp);

    res.json({
      code: '200',
      msg: 'ok'
    });
  },

// 添加订单编号数据
  async addOrderNumber(req, res) {
    console.log('添加订单编号数据请求参数：', req.body);
    const data = [
      req.body.documentNumber,
      req.body.goods_id,
      req.body.amount,
    ]
    console.log('-----', data);
    const resp = await saleModel.addOrderNumber(data);
    console.log('插入数据库：', resp);

    res.json({
      code: '200',
      msg: 'ok'
    });
  },


 // 获取订单数据
  async orderList(req, res) {

    // console.log(req.query);
    let { currentPage, pageSize ,selectObj} = req.query;
    if (selectObj == undefined) { selectObj = {} }
    console.log(currentPage, pageSize ,selectObj);

    let sqlpinjie = 'SELECT *'
    let sql = ' FROM order_tab where order_isShow="true" '
   
    // let arr = []
    // 条件筛选其实就是给sql加where
    if (selectObj.state) { 
      if (selectObj.state=='全部') { 
        sql = sql
        // arr.push(selectObj.state)
      }else{
        sql = sql + ` and order_state = '${selectObj.state}'`
      // arr.push(selectObj.state)
      }
    }
    if (selectObj.dataValue) { 
      sql = sql + ` and ( order_time >= '${selectObj.dataValue[0]}' and order_time <= '${selectObj.dataValue[1]}')`
      // arr.push(selectObj.dataValue[0]._d)
      // arr.push(selectObj.dataValue[1]._d)
    }
    if (selectObj.search) { 
      sql = sql + ` and order_name LIKE '%${selectObj.search}%' or order_stores LIKE '%${selectObj.search}%'  or order_warehouse LIKE '%${selectObj.search}%' or order_person LIKE '%${selectObj.search}%' or order_method LIKE '%${selectObj.search}%'`
      // arr.push(selectObj.search)
    }
   
    currentPage = parseInt(currentPage);
    pageSize = parseInt(pageSize);
    console.log('活动列表参数', currentPage, pageSize);
    const startIndex = (currentPage - 1) * pageSize;

    sqlpinjie = sqlpinjie + sql +' ORDER BY order_id ASC LIMIT ?,?'

    let sqlTotal = 'SELECT COUNT(*) as totalPage' + sql

    const resp = await saleModel.orderList(sqlpinjie,[startIndex, pageSize]);
    const totalPage = await saleModel.orderListTotal(sqlTotal);   //查询总共有多少条数据
    console.log('查询活动列表：', resp);

    
    // let qishi = (pageNum-1)*3
    // arr.push(qishi)
    // let pageStuData 
    // let maxPage
    // console.log(sql)
    // console.log(arr)


    res.json({
      code: '200',
      msg: 'ok',
      data: {
        resp,
        totalPage},
    })
  },


  // 删除订单数据
  async delOrder(req, res) {
    console.log('删除订单数据请求参数：', req.body);
    const data = [
      req.body.id,
    ]
    const resp = await saleModel.delOrder(data);
    console.log(resp);
    res.json({
      code: '200',
      msg: '删除成功',
      resp
    });
  },


  // 查询订单列表
  async selectOrder(req, res) {
    console.log('查询订单列表请求参数：', req.query);
    const data = [
    parseInt(req.query.order_id) ,
    ]
    const resp = await saleModel.selectOrder(data);
    const resp2= await saleModel.selectGoods(resp[0].order_number)
    console.log(resp);
    res.json({
      code: '200',
      msg: '查询成功',
      resp:resp[0],
      resp2
    });
  },


 //审核状态
  async auditDataApi(req, res) {
    console.log('审核状态数据请求参数：', req.body);
    let sql
    if (req.body.isTrue==true) {
       sql = `UPDATE order_tab SET order_state='审核通过' WHERE order_id=?`
      
    }else{
       sql = `UPDATE order_tab SET order_state='审核失败' WHERE order_id=?`
    }
    const data = [
      req.body.data1,
    ]
    const resp = await saleModel.auditDataApi(sql,data);
    console.log(resp);
    res.json({
      code: '200',
      msg: '审核成功',
      resp
    });
  },

  // 活动通知
  // async activityJoinNotify(req, res) {
  //   try {
  //     const { openid } = req.query;
  //     console.log('查询新消息时获取到openid：', openid);

  //     if (!openid) {
  //       return res.json({
  //         code: '1001',
  //         msg: '参数错误'
  //       })
  //     }

  //     const notifyRes = await saleModel.activityNotify([openid]);
  //     console.log('消息未读结果：', notifyRes);

  //     res.json({
  //       code: '200',
  //       msg: 'ok',
  //       data: notifyRes
  //     })
  //   } catch (err) {
  //     console.log('查询未读消息出错：', err);
  //     res.json({
  //       code: '1001',
  //       msg: '查询错误'
  //     })
  //   }
  // },


  //``````````````````````````````````````
  // async check(req,res) {
  //   // const { state, id, openid, activityTitle, activityTime } = req.body;
  //   try {
  //     // const resp = await saleModel.check([state, id]);
  //     // console.log('活动审核数据库结果：', resp);

  //     const getAccessTokenRes = await axios({
  //       url: 'https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential',
  //       method: 'GET',
  //       params: {
  //         appid: 'wx5056d073b17c82f4',
  //         secret: 'f480ddcfba3dd739be94360dcf06b666'
  //       }
  //     });
  //     console.log('获取凭证成功：', getAccessTokenRes.data);

  //     //  时间处理
  //     const time3 = "2015年01月05日";
  //     const time11 = "2015年01月05日";
  //     console.log(time11, '时间time3', time3);

  //     const subscribeResp = await axios({
  //       url: 'https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=' + getAccessTokenRes.data.access_token,
  //       method: 'POST',
  //       data: {
  //         touser: 'ou89o5QmclzdeZ-pt00tY3gvnc0s', // 接收者（用户）的 openid
  //         template_id: "AS4-Q0jGc4mBiPl5bjmPOHrj7_YYUu-K7Aw7dVLKkjE", // 所需下发的订阅模板id
  //         // page: "index", // 点击模板卡片后的跳转页面
  //         // miniprogram_state: "developer", // 跳转小程序类型：developer为开发版；trial为体验版；formal为正式版；默认为正式版
  //         // lang: "zh_CN", // 进入小程序查看”的语言类型
  //         data: { // 模板内容，格式形如 { "key1": { "value": any }, "key2": { "value": any } }
  //           "phrase1": {
  //             "value": "通过"
  //           },
  //           "thing2": {
  //             "value": '5555555555555'
  //           },
  //           "time3": {
  //             "value": time3
  //           },
  //           "time11": {
  //             "value": time11
  //           }
  //         }
  //       }
  //     });
  //     console.log('订阅消息通知：', subscribeResp.data);

  //     res.json({
  //       code: '200',
  //       msg: '审核成功'
  //     });

  //   } catch (err) {
  //     console.log('活动审核出错：', err);
  //     res.json({
  //       code: '1001',
  //       msg: '请求错误'
  //     })
  //   }
  // }
    //``````````````````````````````````````

}