const query = require('../../utils/query')
const { setting } = require('../../config/dbConfig')

module.exports = {
  /* ----- staff 员工管理 ------ */
  getAllData() {
    const sql = `SELECT COUNT(ID) as total FROM staff_manage`
    return query(sql, [], setting)
  },
  getStaffData(data) {
    const sql = `SELECT * FROM staff_manage LIMIT ?,?;`
    return query(sql, data, setting)
  },
  changeStatus(data) {
    const sql = `UPDATE staff_manage SET staff_status=? WHERE ID=?`
    return query(sql, data, setting)
  },
  conditionFindData(sql, data) {
    return query(sql, data, setting)
  },
  getConditionAllData(sql, data) {
    return query(sql, data, setting)
  },
  delStaffData(sql) {
    return query(sql, [], setting)
  },
  AddStaff(data) {
    const sql = `INSERT INTO staff_manage VALUES(NULL,?,?,?,?,?,?,?,?,?,?)`
    return query(sql, data, setting)
  },
  getStaffByIDData(data) {
    const sql = `SELECT * FROM staff_manage WHERE id=?`
    return query(sql, data, setting)
  },
  AlterOneStaffData(data) {
    const sql = `UPDATE staff_manage SET account=? , name=? , store=? , role=? , staff_status=? , phone=? , time=? , jobNumber=? , password=? , head_photo=? WHERE id=? `
    return query(sql, data, setting)
  },

    /* ----- firm 企业管理 ------ */
    firmData(data){
        const sql = `SELECT * FROM firm_message`;
        return query(sql,data,setting)
    },
    changeFirmData(data){
        const sql = `UPDATE firm_message SET firm_name=? , firm_account=? , firm_industry=? , firm_datedTime=? , contact_name=? , contact_phone=? , firm_address=? , firm_logo=? , firm_note=? WHERE id=? `
        return query(sql,data,setting)
    },

    /* ------ 短信充值 -------- */
    getRemainNum(data){
        const sql = `SELECT * FROM users WHERE user_id=?`
        return query(sql,data,setting)
    },
    RechargeRecord(data){
        const sql = `INSERT INTO note_recharge values(NULL,?,?,?,?,?,?)`
        return query(sql,data,setting)
    },
    changeNoteRemain(data){
        const sql = `UPDATE users SET user_noteRemain=user_noteRemain+? WHERE user_id=?`
        return query(sql,data,setting)
    },
    getRechargeRecordData(data){
        const sql = `SELECT note_number,note_time,note_count,note_money,user_noteRemain,note_payMethod,note_status FROM users RIGHT JOIN note_recharge ON user_id=note_userId`
        return query(sql,data,setting)
    },

    /* --------- 打印模板 --------- */

    getPrintData(data,sql){
      return query(sql,data,setting)
    },
    changePrintStatus(data){
      const sql = `UPDATE template SET template_status=? WHERE id=?`;
      return query(sql,data,setting)
    },
    getTemplateMessageById(data){
      const sql = `SELECT * FROM template WHERE id=?`
      return query(sql,data,setting)
    },
    changeTemplateData(data){
      const sql = `UPDATE template SET template_name=? , template_type=? , template_store=? , template_status=? , template_time=? , template_field=? , template_remark=? WHERE id=? `
      return query(sql,data,setting)
    },

    /* -------- 操作日志 -------- */
    getOperationLogData(data,sql){
      return query(sql,data,setting)
    },
    delLogDataById(data){
      const sql = `UPDATE operation_log SET isDead=0 WHERE log_id=?`
      return query(sql,data,setting)
    }
}
