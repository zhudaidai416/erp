const saleDao = require('../../modules/reportForm/saleDao')

module.exports = {
  getSale: async (req, res) => {
    let result = []
    let total = 0
    if (req.body.payload.time.length) {
      result = await saleDao.getSaleByTime(req.body.payload)
      total = await saleDao.getSaleAllByTime(req.body.payload)
    } else {
      result = await saleDao.getSale(req.body.payload)
      total = await saleDao.getSaleAll(req.body.payload)
    }
    console.log(result)
    result && result.length
      ? res.json({
          code: 200,
          msg: '查询成功',
          data: result,
          total: total[0].total,
        })
      : res.json({
          code: 1060,
          msg: '无数据',
        })
  },
}
