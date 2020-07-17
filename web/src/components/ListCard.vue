<template>
  <m-card :icon="icon" :title="title">
    <!-- 导航栏 -->
    <div class="nav d-flex jc-between">
      <div
        class="nav-item"
        :class="{active:active === i}"
        v-for="(category,i) of categories"
        :key="i"
        @click="$refs.listSwiper.swiper.slideTo(i)"
      >
        <div class="nav-link">{{category.name}}</div>
      </div>
    </div>

    <!-- 根据swiper的active的index，设置导航栏的标签active -->
    <!-- 内容部分  设置自动高度 -->
    <div class="pt-3">
      <swiper
        ref="listSwiper"
        :options="{autoHeight:true}"
        @slide-change="() => (active = $refs.listSwiper.swiper.realIndex)"
      >
        <swiper-slide v-for="(category,i) of categories" :key="i">
          <!-- 具名作用域插槽 -->
          <slot name="items" :category="category"></slot>
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
import mCard from "./Card";
export default {
  props: {
    title: { type: String, require: true },
    icon: { type: String, require: true },
    categories: { type: Array, require: true }
  },
  data() {
    return {
      active: 0
    };
  },
  components: {
    mCard
  }
};
</script>

<style>
</style>