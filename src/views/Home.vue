<template>
  <div>
    <div class="title">
      <van-nav-bar left-arrow :border="false">
        <template #title>
          <van-search shape="round" v-model="value" placeholder="请输入搜索关键词" @search="search"></van-search>
        </template>
        <template #left>
          <img class="icon-avatar" src="../assets/av.png" alt="Smiley face" width="30" height="30" />
        </template>
        <template #right>
          <van-icon :size="25" class="iconfont icon-email-fill" name="sixin" />
          <van-icon :size="25" class="iconfont icon-clock-fill" name="lishijilu" />
        </template>
      </van-nav-bar>
    </div>
    <div class="body"></div>
    <div class="footer"></div>
  </div>
</template>
<script>
export default {
  name: "home",
  components: {},
};
</script>
<style scoped>
</style>