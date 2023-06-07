const receiptMod = require("../../modules/funds/receiptMod");

module.exports = {
  async getReceipt(req, res) {
    // console.log('获取到的数据', req.query);
    let { pageNum, pageSize, pay_name, keywords, receipt_time } = req.query;

    if (!pageNum || !pageSize) {
      return res.json({
        code: "1001",
        msg: "参数错误",
      });
    }

    // ========================== sql语句改造 ==========================
    let sqlSum = '(select receipt_time, receipt_num, pay_name, pay_way, sum(receipt_money) as receipt_money, sum(discount_money) as discount_money, sum(real_money) as real_money from receipt group by receipt_num) as receipt'
    let sqlAll = `select * from ${sqlSum} where 1 = 1`
    let sqlTotal = `select count(receipt_num) as total from ${sqlSum} where 1 = 1`;

    let sql = '';
    let sqlVar = [];

    if (pay_name) {
      pay_name = `%${pay_name}%`
      sql = sql + ' and (pay_name like ?'
      sqlVar.push(pay_name)
      sql = sql + ' or receipt_num like ? )'
      sqlVar.push(pay_name)
    }
    if (receipt_time) {
      sql = sql + ' and receipt_time >= ? and receipt_time <= ?'
      sqlVar.push(receipt_time[0], receipt_time[1])
    }
    if (keywords) {
      keywords = `%${keywords}%`
      sql = sql + ' and (pay_way like ?'
      sqlVar.push(keywords)
      sql = sql + ' or receipt_money like ?'
      sqlVar.push(keywords)
      sql = sql + ' or discount_money like ?'
      sqlVar.push(keywords)
      sql = sql + ' or real_money like ? )'
      sqlVar.push(keywords)
    }

    sqlAll = sqlAll + sql + ' group by receipt_num limit ?,?';
    sqlTotal = sqlTotal + sql + ' group by receipt_num';

    const total = await receiptMod.getList(sqlTotal, sqlVar);

    sqlVar.push(parseInt((pageNum - 1) * pageSize), parseInt(pageSize));
    const data = await receiptMod.getList(sqlAll, sqlVar);

    res.json({
      code: "200",
      msg: "ok",
      data,
      total: total.length
    });

  },

  async detailReceipt(req, res) {
    // console.log('获取到的数据', req.query);
    let { receipt_num } = req.query;

    if (!receipt_num) {
      return res.json({
        code: "1001",
        msg: "参数错误",
      });
    }

    const data = await receiptMod.detail(receipt_num);
    // console.log(data)

    res.json({
      code: "200",
      msg: "ok",
      data: data,
      detailPublic: {
        receipt_num: data[0].receipt_num,
        pay_name: data[0].pay_name,
        handled_person: data[0].handled_person,
        receipt_time: data[0].receipt_time,
        notes: data[0].notes,
        accessory: data[0].accessory,
        prepared_person: data[0].prepared_person,
        prepared_time: data[0].prepared_time
      }
    });

  }
}