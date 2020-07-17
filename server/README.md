# server
## mongodb 
- 
## 初始化
- 初始化npm init -y，自己写
- 直接用express脚手架生成
  - npm install express-generator -g  (脚手架)
  - express 名字 （生成模板）
  - npm install  （安装）
  - npm start  （运行）
## 插件
- 需要nodemon（已经全局），运行nodejs
- 安装3个必要的模块（express5.0、mongoose[连接数据库]、cors[允许跨域请求]）:
  - npm i express@next mongoose cors
- npm i inflection 处理通用curd，变换单复数，大小写
- npm i multer express用来获取上传文件的中间件
- npm i bcryptjs 用来给存入数据库的密码加密
- npm i jsonwebtoken 用来做token验证的
- npm i http-assert 此模块的 API 被设计为和 Node.js 的 assert 模块相似。当断言失败时，每个函数都会抛出一个 http-errors 模块下的 HttpError 实例。
- npm i require-all 把某一文件夹下文件引用过来使用一遍


## 流程
### 使用express搭建框架
- 需要设置
  - 跨域cors
  - 处理json，express.json
  - assert 断言模块 模块引入http-assert可以抛出错误处理信息
- 主要的curd路由
  - 注册路由
  - 模块化编写curd路由
  - app.use(主动态路径 '/admin/api/rest/:resource'，中间件(处理一些函数)，router)
    - 子路由(子路径，事件)
    - 新建---create(参数req.body,通过请求体传递过来对象，存入数据库(数据库中相同参数)，返回)
  - 通过不同的url，动态选择不同的controller，进行不同模块的curd
- 单独上传图片路由
  - 静态文件托管----express.static
  - multer模块实现上传，还可以使用formidable, multiparty等
  - 设置图片路径传递会客户端
- 单独设置登录路由
  - 通过req.body得到用户名和密码
  - 密码是加密存在数据库中的
  - 通过用户名查找用户，校验密码（比较明文和密文）
  - 通过jsonwebtoken模块来设置token（根据用户id+秘钥生成）
  - 返回客户端，设置sessionStorage，通过请求拦截器（http.interceptors.request）设置客户端请求拦截，把token赋值给headers，给服务端判断是否登录
  - 没有登录返回401状态码
- 登录验证
  - 前端
    - 通过客户端是否有token字段，和路由导航守卫设置login路由的meta对象来判断是否登录，没有直接跳转到登录页面
    - 服务端通过登录返回token，客户端设置请求头token对后台进行验证登录
- 错误处理，捕获异常
  - 返回错误状态码和错误信息
  - 客户端通过响应拦截器处理错误信息，