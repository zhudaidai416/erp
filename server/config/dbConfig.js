// 报表
const reportForm = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'b2b',
}

// 设置
const setting = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: 'root',
  database: 'setting',
}

// 采购
const procurement = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '123qaz',
  database: 'b2b',
}

// 销售
const sale = {
  connectionLimit: 10,
  host: "localhost",
  port: 3306,
  user: "root",
  password: "123456",
  database: "b2b",
}

// 资金
const funds = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: 'root',
  database: 'phase4_db',
}

module.exports = {
  sale,
  setting,
  procurement,
  reportForm,
  funds
  // otherPool
}
