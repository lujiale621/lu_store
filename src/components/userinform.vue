<template>
  <div>
    <div>
      <van-divider>{{ mydata.userName }}订单信息</van-divider>
    </div>
    <div>
        <van-list
  v-model="loading"
  :finished="finished"
  finished-text="没有更多了"
  @load="onLoad"
>
  <van-cell v-for="item in orders" :key="item.id"  >
      <van-card
  :num="item.product_num"
  :price="item.product_price"
  :desc="item.order_id"
  title="订单号："
  thumb=""
/>
  </van-cell>
</van-list>
    </div>
  </div>
</template>
<script>
import qs from "qs";
export default {
  name: "userinform",
  data() {
    return {
      mydata: "",
      orders: "",
      isdisplay: true,
      user: "",
    };
  },
  created() {
    clearInterval(this.timer);
    // 判断是否登录,没有登录则显示登录组件
    this.user = this.$store.getters.getUser;
    if (!this.user) {
      this.$router.push("/mine/login");
      return;
    } else {
      this.$router.push("/mine/userinform");
      console.log(this.user);
      this.mydata = this.user;
    }
  },
  mounted() {
    // 向后端发起更新购物车的数据库信息请求
    this.$axios
      .post(
        "/api2/order/getorderbyid",
        qs.stringify({
          user_id: parseInt(this.user.user_id),
        })
      )
      .then((res) => {
        this.orders = res.data;
        console.log(this.orders)
      });
  },
  methods: {
    onClickLeft() {
      this.$router.push('/home')
    },
  },
};
</script>
<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>