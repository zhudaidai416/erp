var express = require('express');
var router = express.Router();

// //图片上传工具函数
const file_load = require('../../utils/procure_file_load')

const procurement_contr = require('../../controller/procurement/procurement_contr');


// /* 企业管理 */
// router.get('/firmManage/getFirmData', setting_contr.getFirmData)
// router.post('/firmManage/changeFirmData', setting_contr.changeFirmData)


// /* 员工管理 */
// router.get('/staffManage/getStaffData', setting_contr.getStaffData)
// router.get('/staffManage/changeStatus', setting_contr.changeStatus)
// router.post('/staffManage/conditionFindData', setting_contr.conditionFindData)
// router.get('/staffManage/delStaffData', setting_contr.delStaffData)


// /* 配置存储位置 */
const upload = file_load.file_load()
router.post('/procurement/uploads',upload.single('zsl'),procurement_contr.uploads)

//模态框表拿取数据
router.get('/procurement/getmodaldata',procurement_contr.getModalData)
router.get('/procurement/getdata',procurement_contr.getData)
//给数据库数据
router.post('/procurement/updata',procurement_contr.UpData)
router.post('/procurement/upcdata',procurement_contr.UpcData)

//index主页拿取data数据
router.post('/procurement/getindexdata',procurement_contr.GetDataIndex)
//index主页删除data数据
router.post('/procurement/deldata',procurement_contr.DelData)
// detail页面拿取数据
router.get('/procurement/detailindex',procurement_contr.getDetail)
//detail页面表格
router.get('/procurement/detaildata',procurement_contr.DetailData)
//detail删除
router.post('/procurement/deldata',procurement_contr.DelDetail)



module.exports = router;