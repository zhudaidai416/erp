const query = require('../../utils/query')
const { funds } = require('../../config/dbConfig');

module.exports = {
  getList(sql, data) {
    // console.log(sql,data);
    return query(
      sql,
      data,
      funds,
    )
  },
  del(data) {
    let sql = 'delete from others where cost_num = ?';
    return query(
      sql,
      data,
      funds,
    )
  },
  add(data) {
    console.log('添加的数据',data)
    let sql = 'insert into others (others_id,cost_num,pay_type,cost_type,pay_way,money,create_time,notes,accessory) values (default,?,?,?,?,?,?,?,?)';
    console.log('添加的sql',sql)
    return query(
      sql,
      data,
      funds,
    )
  }
}