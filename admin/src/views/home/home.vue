<template>
  <p>hello:{{admin}}</p>
</template>

<script>
export default {
data(){
  return{
    admin:this.$route.query.username
  }
}
}
</script>

<style>

</style>