<template>
  <div class="login-container">
    <el-card header="请先登录" class="login-card">
      <el-form @submit.native.prevent="login">
        <el-form-item label="用户名" label-width="70px">
          <el-input v-model="model.username"></el-input>
        </el-form-item>

        <el-form-item label="密码" label-width="70px">
          <el-input type="password" v-model="model.password"></el-input>
        </el-form-item>

<!-- //@click="restloginForm" -->
        <el-form-item>
          <el-button type="primary" round native-type="submit" style="margin-left:15rem">登录</el-button>
          <el-button type="info" round >重置</el-button> 
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      model: {}
    };
  },
  methods: {
    async login() {
      const res = await this.$http.post("login",this.model);
      //设置sessionStorage
      sessionStorage.token = res.data.token
      // 使用路由 query  params传递参数
      this.$router.push({
        path:'/',
        query:{
          username:res.data.user.username
        }
      })
      this.$message({
        type:'success',
        message:`登录成功，欢迎用户: ${res.data.user.username}`
      })
      
    }
  }
};
</script>

<style>
.login-card {
  width: 30rem;
  margin: 15rem auto;
}
</style>