<template>
  <div>
    <div>
      <van-nav-bar title="我的收藏" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      collectList: [],
    };
  },
  activated() {
    // 获取收藏数据
    this.$axios
      .post("/api/user/collect/getCollect", {
        user_id: this.$store.getters.getUser.user_id,
      })
      .then((res) => {
        if (res.data.code === "001") {
          this.collectList = res.data.collectList;
        }
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  },methods:{
      onClickLeft() {
      this.$router.go(-1);
    },
  }
};
</script>