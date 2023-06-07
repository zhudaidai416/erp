var express = require('express');
var router = express.Router();

const receiptCtrl = require('../../controller/funds/receiptCtrl');
const othersCtrl = require('../../controller/funds/othersCtrl');
const accountCtrl = require('../../controller/funds/accountCtrl');

// ========================== 图片上传工具函数 ==========================
const file_load = require('../../utils/funds_load');


// ========================== 收款单 ==========================
router.get('/getReceipt', receiptCtrl.getReceipt)
router.get('/detailReceipt', receiptCtrl.detailReceipt)


// ========================== 付款单 ==========================


// ========================== 其他收支 ==========================
router.get('/getOthers', othersCtrl.getOthers)
router.post('/delOthers', othersCtrl.delOthers)
router.post('/addOthers', othersCtrl.addOthers)
// router.post('/editOthers', othersCtrl.editOthers)

const upload = file_load.file_load()
router.post('/uploadFiles', upload.single('file'), othersCtrl.uploadFiles)

// ========================== 资金流水 ==========================
router.get('/getAccount', accountCtrl.getAccount)


module.exports = router