const query = require('../../utils/query')
const { sale } = require('../../config/dbConfig')

module.exports = {
  add(data) {
    const sql = `INSERT INTO goods VALUE(NULL, ?,?, ?, ?,?,?,?);`
    return query(sql, data, sale)
  },
  // joinActivity() {

  // },
  // list(data) {
  //   const sql = `SELECT * FROM activity ORDER BY activity_id DESC LIMIT ?,?`;
  //   return query(sql, data);
  // },
  // detail(data) {
  //   const sql = `SELECT * FROM activity WHERE activity_id=?`;
  //   return query(sql, data)
  // },
  // findUser(data) {
  //   const sql = `SELECT * FROM app_users WHERE openid=?`;
  //   return query(sql, data)
  // },
  // addCount(data) {
  //   const sql = `UPDATE activity SET current_count=? WHERE activity_id=?`;
  //   return query(sql, data)
  // },
  // addUser(data) {
  //   const sql = `INSERT INTO activity_detail VALUE(NULL, ?, ?)`;
  //   return query(sql, data)
  // },
  // activityJoinNotify(data) {
  //   const sql = `INSERT INTO activity_notify VALUE(NULL, '您的活动有新参与者',2,?,5,?,1,?,DEFAULT,DEFAULT)`;
  //   return query(sql, data)
  // },
  // activityNotify(data) {
  //   const sql = `SELECT * FROM activity_notify WHERE user_id=? AND is_read=0`;
  //   return query(sql, data)
  // },

  list() {
    const sql = `SELECT * FROM goods`
    return query(sql, [], sale)
  },

  addOrder(data) {
    const sql = `INSERT INTO order_tab VALUE(NULL,?,?,?,?,?,?,?,?,?,?,?,?,?,'true');`
    return query(sql, data, sale)
  },

  addOrderNumber(data) {
    const sql = `INSERT INTO order_form VALUE(NULL,?,?,?);`
    return query(sql, data, sale)
  },


  orderList(my_sql,data) {
    // const sql = `SELECT * FROM order_tab  WHERE order_isShow='true' ORDER BY order_id ASC LIMIT ?,?`;
    const sql = my_sql;
    return query(sql, data, sale);
  },

  orderListTotal(my_sql) {
    // const sql = `SELECT COUNT(*) as totalPage  FROM order_tab WHERE order_isShow='true' `;
    const sql =my_sql ;
    return query(sql, [], sale);
  },

  delOrder(data) {
    const sql = `UPDATE order_tab SET order_isShow='false' WHERE order_id=?`
    return query(sql, data, sale)
  },

  selectOrder(data) {
  const sql = `SELECT * FROM order_tab  WHERE order_id=?`;
  return query(sql, data, sale)
  },

  selectGoods(data) {
  const sql = `SELECT * FROM order_form  LEFT JOIN goods  ON order_form.order_form_goods=goods.goods_id  WHERE order_form.order_form_number=?`;
  return query(sql, data, sale)
  },

  auditDataApi(sql,data) {
  // const sql = `SELECT * FROM order_form  LEFT JOIN goods  ON order_form.order_form_goods=goods.goods_id  WHERE order_form.order_form_number=?`;
  return query(sql, data, sale)
  },
}
