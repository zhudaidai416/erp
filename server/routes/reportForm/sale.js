var express = require('express')
var router = express.Router()

const saleCtrl = require('../../controller/reportForm/saleCtrl')

// 获取销售明细表
router.post('/getSale', saleCtrl.getSale)

module.exports = router
