const accountMod = require("../../modules/funds/accountMod");

module.exports = {
  async getAccount(req, res) {
    // console.log('获取到的数据', req.query);
    let { pageNum, pageSize, keywords, deal_time } = req.query;

    if (!pageNum || !pageSize) {
      return res.json({
        code: "1001",
        msg: "参数错误",
      });
    }

    // ========================== sql语句改造 ==========================
    let sqlAll = `select * from account where 1 = 1`
    let sqlTotal = `select count(account_id) as total from account where 1 = 1`;

    let sql = '';
    let sqlVar = [];

    if (deal_time) {
      sql = sql + ' and deal_time >= ? and deal_time <= ?'
      sqlVar.push(deal_time[0], deal_time[1])
    }
    if (keywords) {
      keywords = `%${keywords}%`
      sql = sql + ' and ( account_num like ?'
      sqlVar.push(keywords)
      sql = sql + ' or project_name like ?'
      sqlVar.push(keywords)
      sql = sql + ' or organize_name like ?'
      sqlVar.push(keywords)
      sql = sql + ' or shop like ?'
      sqlVar.push(keywords)
      sql = sql + ' or pay_way like ?'
      sqlVar.push(keywords)
      sql = sql + ' or money like ?'
      sqlVar.push(keywords)
      sql = sql + ' or now_money like ?'
      sqlVar.push(keywords)
      sql = sql + ' or notes like ? )'
      sqlVar.push(keywords)
    }

    sqlAll = sqlAll + sql + ' limit ?,?';
    sqlTotal = sqlTotal + sql;

    const total = await accountMod.getList(sqlTotal, sqlVar);

    sqlVar.push(parseInt((pageNum - 1) * pageSize), parseInt(pageSize));
    const data = await accountMod.getList(sqlAll, sqlVar);
    // console.log(total)

    res.json({
      code: "200",
      msg: "ok",
      data,
      total: total[0].total
    });

  }
}