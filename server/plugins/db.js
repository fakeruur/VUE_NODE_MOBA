const { model } = require("mongoose");

module.exports = app => {
  const mongoose = require('mongoose')
  mongoose.connect('mongodb://127.0.0.1:27017/node-vue-moba', {
    useNewUrlParser: true,
    useUnifiedTopology:true
  })


  // 把文件引用一遍
  const path = require('path')
  require('require-all')(path.join(__dirname, '../', '/uploads'))
}