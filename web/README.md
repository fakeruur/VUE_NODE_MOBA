# web
## 插件
- npm i -D sass sass-loader
- vue add router
- "swiper": "^4.0.7", "vue-awesome-swiper": "^3.1.3" 老版本
- npm i axios
- npm i dayjs 格式化时间

## 
-  { path: '/articles/:id', name: 'article', component: Article, props: true } 路由通过props传递参数
- 创建css工具类，
  - 设置用到的公共类，例如颜色，字体，
  - 通过类设置css
```js
$colors: (
  "primary": #db9e3f,
  "info": #4b67af,
  "black": #000,
);
@each $colorKey, $color in $colors {
  .text-#{$colorKey} {
    color: $color;
  }

  .bg-#{$colorKey} {
    background-color: $color;
  }
}
```
- 页面
  - 初始化格式
```css
* {
  box-sizing: border-box;
  outline: none;
}
html {
  font-size: 13px;
}
body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1.2em;
  background: #f1f1f1;
}
```
  - 每一个组件都要组好用div包裹
  - main 顶栏多页面固定，其他为其子路由，显示区域为router-view
  - home 
    - 轮播图，VueAwesomeSwiper
    - 雪碧图设置的图片列表
      - 循环渲染多个页面图标
      - 2倍图
      - http://www.spritecow.com/ 网站可以直接测量尺寸和位置
    - 新闻列表 英雄列表 视频列表
      - 通过相同组件进行设置
    - filters过滤器，用来格式化时间
  - Card
    - 设置一样的样式
    - 通过props传递不同的参数，动态渲染
    - slot 通过插槽渲染组件中不同的部分
  - listCard
    - swiper部分不同组件引用，渲染不同的内部样式，使用作用域slot
    - 父组件通过props传递组件要用参数，在通过作用域slot拿到子组件中的量，
  - 这个是作用域插槽,可以让插槽访问子组件的数据,vue2.6 之前是slot-scope 语法,2.6 之后被 v-slot 代替, v-slot 简写 #,例如v-for:iteems="{category}"
    - elementui中的作用域插槽就是这个原理
    - 自定义插槽中样式
  - Hero
    - 根据计算属性，通过技能索引展示技能文字说明