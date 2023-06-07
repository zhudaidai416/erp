const query = require('../../utils/query')
const { reportForm } = require('../../config/dbConfig')

module.exports = {
  // ?+++++++++++++++++++++++++++++++++++++++++++++++ data @销售表数据
  // *--------------------------- 无查询条件
  getSale: (data) => {
    const start = (data.pageNum - 1) * data.pageSize
    const sd = `sale_details sd`
    const sa = `sale sa`
    const cu = `custom cu`
    const st = `store st`
    const g = `godown g`
    const c = `commodity c`
    const target = `saId,saCreateTime,saKey,cuName,stName,gName,sdType,sum(sdNum*cPrice) as sumIncome,sum(sdProfit) as sumProfit,sdOperator,sdRemark`
    const condition = `sd.sd_saId = sa.saId and sd.sd_cuId = cu.cuId and sd.sd_stId = st.stId and sd.sd_gId = g.gId and sd.sd_cId = c.cId`
    const sql = `select ${target} from ${sd}, ${sa}, ${cu}, ${st}, ${g}, ${c} where ${condition} group by sd.sd_saId limit ?,?`
    return query(sql, [start, parseInt(data.pageSize)], reportForm)
  },
  // *--------------------------- 有查询条件
  getSaleByTime: (data) => {
    const start = (data.pageNum - 1) * data.pageSize
    const sql = `select * from sale where saleTime>=? and saleTime<=? limit ?,?`
    return query(
      sql,
      [data.time[0], data.time[1], start, parseInt(data.pageSize)],
      reportForm,
    )
  },
  // ?+++++++++++++++++++++++++++++++++++++++++++++++ total @销售表数量
  // *--------------------------- 无查询条件
  getSaleAll: () => {
    const sql = `select count(*) as total from sale`
    return query(sql, [], reportForm)
  },
  // *--------------------------- 有查询条件
  getSaleAllByTime: (data) => {
    const sql = `select count(*) as total from sale where saleTime>=? and saleTime<=?`
    return query(sql, [data.time[0], data.time[1]], reportForm)
  },
}
