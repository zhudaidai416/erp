var express = require('express')
var router = express.Router()

const users_contr = require('../../controller/users/users_contr')

// login
router.post('/Login', users_contr.Login)
// Menu
router.get('/getMenuList', users_contr.getMenuList)

module.exports = router
