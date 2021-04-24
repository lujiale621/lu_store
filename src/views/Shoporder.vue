<template>
  <div>
    <div class="title">
       <van-nav-bar
        title="购物车"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div class="body">
        <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in mydata" :key="item.id"  >
<van-card
  :num="item.product_num"
  :price="item.product_price"
  :desc="item.product_intro"
  :title="item.product_title"
  :thumb="$target+item.product_picture"
>
  <template #tags>
    <van-tag plain type="danger">标签</van-tag>
    <van-tag plain type="danger">标签</van-tag>
  </template>
  <template #footer>
    <van-button size="mini">移除</van-button>
  </template>
</van-card>
  </van-cell>
</van-list>
    </div>
    <div class="foot">
      <van-submit-bar :price="carprice" button-text="提交订单" @submit="onSubmit" />
    </div>
  </div>
</template>
<script>

import qs from "qs";
export default {
  
  data() {
    return {
      mydata:'',
      carprice:120000
    };
  },
  mounted(){
      // 判断是否登录,没有登录则显示登录组件
    this.user = this.$store.getters.getUser;
  
      console.log(this.user);
      this.mydata = this.user;
    
      // 向后端发起更新购物车的数据库信息请求
    this.$axios
      .post(
        "/api2/shop/getshop",
        qs.stringify({
          user_id: parseInt(this.user.user_id),
        })
      )
      .then((res) => {
        this.mydata = res.data;
        console.log(this.mydata)
      });
  
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit(){
  this.$router.push({path: '/confirmOrder',query:{ price: this.carprice}});
    }
  }
};
</script>
<style scoped>

</style>