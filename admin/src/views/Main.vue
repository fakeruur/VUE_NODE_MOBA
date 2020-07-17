<template>
  <el-container style="height: 100vh;">
    <el-aside width="230px" style="background-color: #545c64">
      <router-link to="/" tag="div" class="title">
        <h1 class="sidebar-title">王者荣耀后台</h1>
      </router-link>

      <el-scrollbar wrap-class="scrollbar-wrapper">
        <el-menu
          router
          :default-active="$route.path"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>内容管理
            </template>

            <el-menu-item-group>
              <template slot="title">物品</template>
              <el-menu-item index="/items/create">新建物品</el-menu-item>
              <el-menu-item index="/items/list">物品列表</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">英雄</template>
              <el-menu-item index="/heroes/create">新建英雄</el-menu-item>
              <el-menu-item index="/heroes/list">英雄列表</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">文章</template>
              <el-menu-item index="/articles/create">新建文章</el-menu-item>
              <el-menu-item index="/articles/list">文章列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-menu"></i>运营管理
            </template>

            <el-menu-item-group>
              <template slot="title">广告位</template>
              <el-menu-item index="/ads/create">新建广告位</el-menu-item>
              <el-menu-item index="/ads/list">广告位列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-menu"></i>后台管理
            </template>

            <el-menu-item-group>
              <template slot="title">分类</template>
              <el-menu-item index="/categories/create">新建分类</el-menu-item>
              <el-menu-item index="/categories/list">分类列表</el-menu-item>
            </el-menu-item-group>

            <el-menu-item-group>
              <template slot="title">管理员</template>
              <el-menu-item index="/admin_users/create">新建管理员</el-menu-item>
              <el-menu-item index="/admin_users/list">管理员列表</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-scrollbar>
    </el-aside>

    <el-container>
      <el-header style="text-align: right;">
        <el-dropdown>
          <i class="el-icon-setting" style="margin-right: 15px"></i>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item @click.native="$router.push('/admin_users/list')">查看</el-dropdown-item>
            <el-dropdown-item @click.native="$router.push('/admin_users/create')">新增</el-dropdown-item>
            <el-dropdown-item class="logout" @click.native="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
        <span>{{admin}}</span>
      </el-header>

      <el-main>
        <!-- 两个页面用了同一个组件，因此不能用路由的组件来区分，要用路由的路径来区分 -->
        <router-view :key="$route.path"></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>



<script>
export default {
  data() {
    return {
      admin: this.$route.query.username
    };
  },
  methods: {
    // 退出账号
    logout() {
      // sessionStorage.token = "";
      window.sessionStorage.clear();
      this.$router.push("/login");
    }
  },
  created() {
    console.log(this.admin);
  }
};
</script>

<style lang="scss" scoped>
.el-containe {
  background-color: #333;
}

.el-header {
  background-color: #06242b66;
  color: #333;
  line-height: 60px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.9);
  z-index: 999;
}

.el-aside {
  .title {
    width: 230px;
    height: 100;
    text-align: center;
    color: #fff;
  }
  .el-menu {
    border-right: none;
  }
}

.el-submenu {
  .is-active {
    width: 230px;
  }
}
.el-main {
  background-color: #fff;
}

.el-scrollbar {
  width: 230px;
}
</style>