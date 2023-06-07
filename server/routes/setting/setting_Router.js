var express = require('express');
var router = express.Router();

//图片上传工具函数
const file_load = require('../../utils/file_load')

const setting_contr = require('../../controller/setting/setting_contr')


/* 企业管理 */
router.get('/firmManage/getFirmData', setting_contr.getFirmData)
router.post('/firmManage/changeFirmData', setting_contr.changeFirmData)


/* 员工管理 */
router.get('/staffManage/getStaffData', setting_contr.getStaffData)
router.get('/staffManage/changeStatus', setting_contr.changeStatus)
router.post('/staffManage/conditionFindData', setting_contr.conditionFindData)
router.get('/staffManage/delStaffData', setting_contr.delStaffData)
router.post('/staffManage/AddStaff', setting_contr.AddStaff)
router.get('/staffManage/getStaffByIDData', setting_contr.getStaffByIDData)
router.post('/staffManage/AlterOneStaffData', setting_contr.AlterOneStaffData)


/* 短信充值 */
router.get('/noteRecharge/getRemainNum', setting_contr.getRemainNum)
router.post('/noteRecharge/RechargeRecord', setting_contr.RechargeRecord)
router.get('/noteRecharge/getRechargeRecordData', setting_contr.getRechargeRecordData)


/* 打印模板 */
router.get('/noteRecharge/getPrintData', setting_contr.getPrintData)
router.get('/noteRecharge/changePrintStatus', setting_contr.changePrintStatus)
router.get('/noteRecharge/getTemplateMessageById', setting_contr.getTemplateMessageById)
router.post('/noteRecharge/changeTemplateData', setting_contr.changeTemplateData)


/* 操作日志 */
router.get('/operationLog/getOperationLogData', setting_contr.getOperationLogData)
router.get('/operationLog/delLogDataById', setting_contr.delLogDataById)



/* 配置存储位置 */
const upload = file_load.file_load()
router.post('/avatar_photo',upload.single('img'),setting_contr.avatar_photo)

module.exports = router;