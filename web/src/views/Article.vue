<template>
  <div class="page-article" v-if="model">
    <div class="d-flex py-3 px-2 border-bottom">
      <div class="iconfont icon-fenxiang text-blue" @click="back()"></div>
      <strong class="flex-grow-1 text-blue text-ellipsis px-2">{{model.title}}</strong>
      <div class="text-grey fs-xs flex-time">2020-07-06</div>
    </div>

    <div v-html="model.body" class="px-3 article-body fs-lg"></div>

    <!-- 关联文章 -->
    <div class="px-2 border-top py-2">
      <div class="d-flex ai-center">
        <i class="iconfont icon-cc-menu-circle"></i>
        <strong class="text-blue fs-lg ml-2">相关资讯</strong>
      </div>

      <div class="pt-2">
        <router-link
          :to="`/articles/${item._id}`"
          class="py-1"
          v-for="item of model.related"
          tag="div"
          :key="item._id"
        >{{item.title}}</router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    id: { required: true }
  },
  data() {
    return {
      model: null
    };
  },
  // 点击关联文章用的是同一个组件，不会发生路由跳转，不会重新加载
  watch: {
    // id 变化之后执行fetch
    id() {
      this.fetch();
    }
  },
  methods: {
    async fetch() {
      const res = await this.$http.get(`articles/${this.id}`);
      this.model = res.data;
    },
    back() {
      if (window.history.length <= 1) {
        this.$router.push({ path: "/" });
        // this.$router.push( "/" );
        return false;
      } else {
        this.$router.go(-1);
      }
    }
  },
  created() {
    this.fetch();
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/iconfont/iconfont.css";
@import "../assets/scss/variables";

.flex-time {
  flex-shrink: 0;
}


</style>