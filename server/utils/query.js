const mysql = require('mysql')

function query(sql, data, pool) {
  return new Promise((resolve, reject) => {
    mysql.createPool(pool).getConnection((err, connection) => {
      if (!err) {
        connection.query(sql, data, (dbErr, res) => {
          !err ? resolve(res) : reject(dbErr)
          connection.release()
        })
      } else {
        reject(err)
      }
    })
  })
}

module.exports = query
