const express = require('express')
const app = express()
const path = require('path')

// jwt 秘钥
app.set('secret','lihui##$$%%123')

//跨域
app.use(require('cors')())

//json
app.use(express.json())


//静态文件托管路由
app.use('/uploads',express.static(path.join(__dirname, '/uploads')))


//链接db
require('./plugins/db')(app)

//admin路由
require('./routes/admin')(app)

//web 路由
require('./routes/web')(app)


app.listen(3000, () => {
  console.log(`http://localhost:3000`)
})