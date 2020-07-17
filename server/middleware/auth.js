module.exports = options => async (req, res, next) => {

  // 用来生成token
  const jwt = require('jsonwebtoken')
  // 用户模型
  const AdminUser = require('../models/AdminUser')
  // assert 断言模块 模块引入http-assert可以抛出错误处理信息
  const assert = require('http-assert')


  // 校验用户是否登录
  // 获得headers中的token
  const token = String(req.headers.authorization || '').split(' ').pop() //小写authorization
  assert(token, 401, '请先登录') //当没有token时，返回后面信息
  const { id } = jwt.verify(token, req.app.get('secret')) // 根据token和秘钥解析出来用户id
  assert(id, 401, '请先登录')
  req.user = await AdminUser.findById(id) // 根据id查找是否有用户，挂载到 req.user 上
  assert(req.user, 401, '请先登录')
  next()
}