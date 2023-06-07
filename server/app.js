var createError = require('http-errors')
var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')

var indexRouter = require('./routes/index')

/* --- setting router --- */
var setting_Router = require('./routes/setting/setting_Router')

/* ---- users router --- */
var user_Router = require('./routes/users/users_router')
// 采购
var procure_Router = require('./routes/procure_Router/router')

// 销售
var sale_Router = require('./routes/sale/sale')

// 资金
var funds_Router = require('./routes/funds/funds_router')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


/* 设置cors解决跨域 */
app.use('*', function (req, resp, next) {
  resp.header('Access-Control-Allow-Origin', '*') // 表示允许哪些网站访问，上线后应该直接指定ip而不应该 *
  resp.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
  resp.header(
    'Access-Control-Allow-Headers',
    'Content-Type,Content-Length, Authorization, Accept,X-Requested-With',
  )
  resp.header('Access-Control-Allow-Credentials', 'true') //和客户端对应，必须设置以后，才能接收cookie.
  next()
})

app.use('/setting',setting_Router)
app.use('/users',user_Router)

app.use('/caigou',procure_Router)

app.use('/sale',sale_Router)

app.use('/funds',funds_Router)

app.use('/', indexRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

app.listen(3060, () => {
  console.log('服务器启动中>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('启动成功')
})

module.exports = app
