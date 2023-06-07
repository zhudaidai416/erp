const othersMod = require("../../modules/funds/othersMod");

module.exports = {
  // ========================== 条件渲染数据 ==========================
  async getOthers(req, res) {
    // console.log('获取到的数据', req.query);
    let { pageNum, pageSize, pay_type, keywords, create_time } = req.query;

    if (!pageNum || !pageSize) {
      return res.json({
        code: "1001",
        msg: "参数错误",
      });
    }

    // ========================== sql语句改造 ==========================
    let sqlAll = `select * from others where 1 = 1`
    let sqlTotal = `select count(others_id) as total from others where 1 = 1`;

    let sql = '';
    let sqlVar = [];

    if (pay_type) {
      pay_type = `%${pay_type}%`
      sql = sql + ' and pay_type like ?'
      sqlVar.push(pay_type)
    }
    if (create_time) {
      sql = sql + ' and create_time >= ? and create_time <= ?'
      sqlVar.push(create_time[0], create_time[1])
    }
    if (keywords) {
      keywords = `%${keywords}%`
      sql = sql + ' and (cost_num like ?'
      sqlVar.push(keywords)
      sql = sql + ' or cost_type like ?'
      sqlVar.push(keywords)
      sql = sql + ' or pay_way like ?'
      sqlVar.push(keywords)
      sql = sql + ' or money like ?'
      sqlVar.push(keywords)
      sql = sql + ' or notes like ?'
      sqlVar.push(keywords)
      sql = sql + ' or accessory like ? )'
      sqlVar.push(keywords)
    }

    sqlAll = sqlAll + sql + ' limit ?,?';
    sqlTotal = sqlTotal + sql;

    const total = await othersMod.getList(sqlTotal, sqlVar);

    sqlVar.push(parseInt((pageNum - 1) * pageSize), parseInt(pageSize));
    const data = await othersMod.getList(sqlAll, sqlVar);
    // console.log(total)

    res.json({
      code: "200",
      msg: "ok",
      data,
      total: total[0].total
    });

  },

  // ========================== 删除 ==========================
  async delOthers(req, res) {
    // console.log('获取到的数据', req.body);
    let { cost_num } = req.body;

    if (!cost_num) {
      return res.json({
        code: "1001",
        msg: "参数错误"
      })
    }

    const data = await othersMod.del(cost_num);

    res.json({
      code: "200",
      msg: "ok"
    })
  },

  // ========================== 图片上传 ==========================
  async uploadFiles(req, res) {
    // console.log('获取到的数据', req.body);

    const url = 'http://localhost:3060/funds/others_uploads/' + req.file.filename

    res.json({
      code: "200",
      msg: "ok",
      url
    })
  },

  // ========================== 添加 ==========================
  async addOthers(req, res) {
    // console.log('获取到的数据', req.body);
    let { cost_num, pay_type, cost_type, pay_way, money, create_time, notes, accessory } = req.body;
    console.log(accessory);
    let temp = '';
    for (let i = 0; i < accessory.length; i++) {
      temp += accessory[i] + ','
    }
    let dataList = [
      cost_num,
      pay_type,
      cost_type,
      pay_way,
      money,
      create_time,
      notes,
      temp
    ]

    await othersMod.add(dataList);

    res.json({
      code: "200",
      msg: "ok"
    })
  }
}