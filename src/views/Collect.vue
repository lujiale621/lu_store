<template>
    <div>
        我的收藏页面组件
    </div>
</template>
<script>
export default {
  data() {
    return {
      collectList: []
    };
  },
  activated() {
    // 获取收藏数据
    this.$axios
      .post("/api/user/collect/getCollect", {
        user_id: this.$store.getters.getUser.user_id
      })
      .then(res => {
        if (res.data.code === "001") {
          this.collectList = res.data.collectList;
        }
      })
      .catch(err => {
        return Promise.reject(err);
      });
  }
};
</script>