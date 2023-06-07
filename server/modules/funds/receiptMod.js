const query = require('../../utils/query')
const { funds } = require('../../config/dbConfig');

module.exports = {
  getList(sql, data) {
    // console.log(sql, data);
    return query(
      sql,
      data,
      funds,
    )
  },
  detail(data) {
    let sql = 'select * from receipt where receipt_num = ?'
    return query(
      sql,
      data,
      funds,
    )
  }
}