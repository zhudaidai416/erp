const query = require('../../utils/query')
const { funds } = require('../../config/dbConfig');

module.exports = {
  getList(sql,data) {
    // console.log(sql,data);
    return query(
      sql,
      data,
      funds,
    )
  }
}