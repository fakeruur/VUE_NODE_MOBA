<template>
  <div>
    <swiper ref="mySwiper" :options="swiperOptions">
      <swiper-slide :options="swiperOptions">
        <img class="w-100" src="../assets/img/lb1.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img/lb2.jpeg" alt />
      </swiper-slide>
      <swiper-slide>
        <img class="w-100" src="../assets/img/lb3.jpeg" alt />
      </swiper-slide>
      <div class="swiper-pagination pagination-home text-right px-3 pb-2" slot="pagination"></div>
    </swiper>
    <!-- end of weiper -->

    <div class="nav-icons bg-white mt-3 text-center pt-4 text-dark">
      <div class="d-flex flex-wrap">
        <div class="nav-item mb-4 fs-sm" v-for="n of 13" :key="n">
          <i class="sprite sprite-news"></i>
          <div class="py-1">爆料站</div>
        </div>
      </div>

      <div class="bg-light py-2 fs-sm">
        <i class="sprite sprite-arrow mr-1"></i>
        <span>收起</span>
      </div>
    </div>
    <!-- end of nav icons -->

    <!-- 新闻 -->
    <mListCard icon="cc-menu-circle" title="新闻资讯" :categories="newsCats">
      <!-- 这个是作用域插槽,可以让插槽访问子组件的数据,vue2.6 之前是 slot-scope 语法,
      2.6 之后被 v-slot 代替, v-slot 简写 #,具体内容看官方文档作用域插槽和动态插槽这块-->
      <!-- v-for:iteems="{category}" -->
      <template #items="{category}">
        <router-link
          tag="div"
          :to="`/articles/${news._id}`"
          class="content py-2 fs-lg d-flex"
          v-for="(news,i) in category.newsList"
          :key="i"
        >
          <span class="a text-info">[{{news.categoryName}}]</span>
          <span class="b text-dark-1 px-1 text-ellipsis">{{news.title}}</span>
          <span class="text-grey-1 fs-sm">{{news.createdAt | date}}</span>
        </router-link>
      </template>
    </mListCard>

    <!-- 英雄 -->
    <mListCard icon="icon_hero" title="英雄列表" :categories="heroCats">
      <template #items="{category}">
        <div class="d-flex flex-wrap" style="margin: 0 -0.5rem">
          <router-link
            tag="div"
            :to="`/heroes/${hero._id}`"
            class="content p-2 text-center"
            style="width:20%"
            v-for="(hero,i) in category.heroList"
            :key="i"
          >
            <img :src="hero.avatar" class="w-100" />
            <div>{{hero.name}}</div>
          </router-link>
        </div>
      </template>
    </mListCard>

    <m-card icon="desVideoplaye" title="精彩视频"></m-card>
  </div>
</template>

<script>
import mCard from "../components/Card";
import mListCard from "../components/ListCard";

import dayjs from "dayjs";
export default {
  filters: {
    date(val) {
      return dayjs(val).format("MM/DD");
    }
  },
  data() {
    return {
      swiperOptions: {
        pagination: {
          el: ".swiper-pagination"
        },
        autoplay: {
          delay: 2500,
          disableOnInteraction: false
        }
      },
      newsCats: [],
      heroCats: []
    };
  },

  methods: {
    async fetchNewsCats() {
      const res = await this.$http.get("news/list");
      this.newsCats = res.data;
    },
    async fetchHeroesCats() {
      const res = await this.$http.get("heroes/list");
      this.heroCats = res.data;
    }
  },
  created() {
    this.fetchNewsCats();
    this.fetchHeroesCats();
  },

  components: {
    mCard,
    mListCard
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/variables";
@import "../assets/iconfont/iconfont.css";

.pagination-home {
  .swiper-pagination-bullet {
    background: #fff;
    border-radius: 2px;
    opacity: 1;
    &.swiper-pagination-bullet-active {
      background: map-get($colors, "info");
    }
  }
}

.nav-icons {
  border-top: 1px solid $border-color;
  border-bottom: 1px solid $border-color;
  .nav-item {
    width: 25%;
    border-right: 1px solid $border-color;
    &:nth-child(4n) {
      border-right: none;
    }
  }
}

.content {
  .a {
    flex-shrink: 0;
  }
  .b {
    flex-grow: 1;
  }
}
</style>