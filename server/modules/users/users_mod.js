const query = require('../../utils/query')
const { setting } = require('../../config/dbConfig')

module.exports = {
  getAllData() {
    const sql = `SELECT COUNT(ID) as total FROM staff_manage`
    return query(sql, [], setting)
  },
}
