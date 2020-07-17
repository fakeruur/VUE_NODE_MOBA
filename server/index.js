const express = require('express')
const app = express()
const path = require('path')

// jwt 秘钥
app.set('secret','lihui##$$%%123')

//跨域
app.use(require('cors')())

//json
// 处理post data，直接f赋值给body---解析json格式
app.use(express.json())


//静态文件托管路由
app.use('/uploads',express.static(path.join(__dirname, '/uploads')))


//注册路由
//链接db
require('./plugins/db')(app)

//admin路由
require('./routes/admin')(app)

//web 路由
require('./routes/web')(app)


// //未找到路由，404错误处理
// app.use(async(req,res,next)=>{
//   res.status(404).send('404,您访问的路由不存在！')
// })


app.listen(3000, () => {
  console.log(`http://localhost:3000`)
})