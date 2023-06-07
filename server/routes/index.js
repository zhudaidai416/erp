var express = require('express')
var router = express.Router()

const saleRouter = require('./reportForm/sale')

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' })
})

router.use('/sale', saleRouter)

module.exports = router
