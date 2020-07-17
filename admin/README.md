# admin
## 插件
- 安装 element ui，vue add element
- vue add router
- element-ui
- npm i axios
- npm i vue2-editor //富文本编辑器，编辑文章



## 细节知识点
- height: vh,撑满屏幕的高度
- this.model = Object.assign({},this.model.res.data) //防止服务器端数据完全替换本地数据
- this.model = {...this.model,...res.data}; 扩展运算符
- 富文本编辑器图片上传

- 获取页面上的 新闻资讯 文本
  - $$('.news_list .title')
  - $$('.news_list .title').map(el => el.innerHTML)


## 流程重点
- 多层级的 
- 重置html body样式
- 登录页面，保存token，验证是否登录
  - 添加http请求拦截器，为请求头对象添加token验证的Authorization字段，保证拥有获取数据的权限。
- main：el-menu
  -  <!-- 两个页面用了同一个组件，因此不能用路由的组件来区分，要用路由的路径来区分 -->
  - <router-view :key="$route.path"></router-view>
  - 退出，清除token
- 管理员页面：
  - list
    - el-table
    - 按需绑定数据
  - edit
    - el-form
    - 编辑？新建，用同一个组件通过是否存在id来判断
    - 编辑界面或通过url传id过来，用 props 形式
- 分类界面
  - list
    - el-table 都类似
    - 通过id来编辑或删除
  - edit
    - el-from + el-select(选择父级分类)
    - 先获取父级分类，添加到select选择器中
- 物品界面
  - list
    - 同
  - edit-重点（upload）
    - el-upload 用的是原生ajax上传，所以需要自己添加 headers，利用Vue.mixin添加全局方法
    - actiong 添加上传路径，成功后返回图片的路径,表单保存路径
    - this.$set(this.model, "icon", res.url); $set响应式赋值
    - 由于受JavaScript的限制，vue.js不能监听对象属性的添加和删除，因为在vue组件初始化的过程中，会调用getter和setter方法，所以该属性必须是存在在data中，视图层才会响应该数据的变化
- 英雄界面
  - edit
    - el-tabs 分为不同的 pane
    - 图片上传，选择器，打分(el-rate)
    - 添加属性，通过向属性列表中push技能对象，渲染添加技能的表单项，el-row布局
    - 有的绑定的对象属性值，需要在data中定义出来，特别是多层级的变量
    - 难点：
      - this.model = Object.assign({},this.model,res.data) ======this.model = { ...this.model, ...res.data };
- 文章界面
  - edit
    - vue-edit富文本编辑器，
    - 富文本编辑器上传图片，
- 广告位/首页轮播图
  - 同上面那些内容
  - push对象渲染添加页面，图片上传
