module.exports = app => {
  const express = require('express')
  // 用来生成token
  const jwt = require('jsonwebtoken')

  // assert 断言模块 模块引入http-assert可以抛出错误处理信息
  const assert = require('http-assert')

  //子路由
  const router = express.Router({
    //合并url
    mergeParams: true
  })

  //新建
  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })
  //编辑
  router.put('/:id', async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })
  //删除
  router.delete('/:id', async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })
  //资源列表
  router.get('/', async (req, res) => {
    const queryOptions = {}
    // 获取分类
    if (req.Model.modelName === 'Category') {
      // 如果是category项，一并获取父级分类
      queryOptions.populate = 'parent'
    }
    const items = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(items)
  })
  //资源详情
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  // 判断登录的中间件
  const authMiddleware = require('../../middleware/auth')

  //动态路径
  app.use('/admin/api/rest/:resource', authMiddleware(), async (req, res, next) => {
    // 根据请求路径动态选择模型
    // 这个过程相当于一个中间件
    //小写复数单词转换为大写开头的单数
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)




  //两个独立路由 

  //上传图片的路由
  const path = require('path')
  //上传文件路由
  const multer = require('multer')
  //绝对地址，设置文件存储路径
  const upload = multer({ dest: path.join(__dirname, '../../', '/uploads') })
  // single单个文件(表单name属性)
  //array("表单name属性","这里填写最大支持的文件数目")
  app.post('/admin/api/upload', authMiddleware(), upload.single('file'), async (req, res) => {
    const file = req.file
    // 设置返回的图片的服务端路径
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })



  // 用户模型
  const AdminUser = require('../../models/AdminUser')

  //登录路由
  app.use('/admin/api/login', async (req, res) => {
    const { username, password } = req.body
    // 1.根据用户名找到用户
    const user = await AdminUser.findOne({ username }).select('+password') //强制取出password
    assert(user, 422, '用户不存在') // 抛出异常
    // if (!user) {
    //   return res.status(422).send({
    //     message: '用户不存在'
    //   })
    // }
    // 2.校验密码
    // 比较明文和密文
    const isVaild = require('bcryptjs').compareSync(password, user.password)
    assert(isVaild, 422, '密码错误')
    // 3.设置token
    const token = jwt.sign({ id: user._id }, app.get('secret')) // 根据用户id生成token
    res.send({ token, user })
  })


  //错误处理函数 捕获异常
  app.use(async (err, req, res, next) => {
    res.status(err.statusCode || 500).send({
      message: err.message
    })
  })
}