<template>
  <div class="card p-3 bg-white mt-3">
    <div class="card-header d-flex ai-center pb-3">
      <i class="iconfont" :class="`icon-${icon}`"></i>
      <div class="fs-xl flex-grow-1 px-2">{{title}}</div>
      <i class="iconfont icon-menu"></i>
    </div>

    <div class="card-body pt-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: { type: String, require: true },
    icon: { type: String, require: true }
  }
};
</script>

<style lang="scss" scoped>
@import "../assets/scss/_variables.scss";
.card {
  border-bottom: 1px solid $border-color;
  .card-header {
    border-bottom: 1px solid $border-color;
  }
}
</style>