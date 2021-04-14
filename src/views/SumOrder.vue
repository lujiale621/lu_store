<template>
  <div class="order">
       <div>
      <van-nav-bar title="购物列表" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <!-- 我的订单头部 -->
    <div class="order-header">
      <div class="order-header-content">
        <p>
          <i class="el-icon-s-order" style="font-size: 30px;color: #ff6700;"></i>
          我的订单
        </p>
      </div>
    </div>
    <!-- 我的订单头部END -->

    <!-- 我的订单主要内容 -->
    <div class="order-content" v-if="orders.length>0">
      <div class="content" v-for="(item,index) in orders" :key="index">
        <ul>
          <!-- 我的订单表头 -->
          <li class="order-info">
            <div class="order-id">订单编号: {{item[0].order_id}}</div>
            <div class="order-time">订单时间: {{item[0].order_time | dateFormat}}</div>
          </li>
          <li class="header">
            <div class="pro-img"></div>
            <div class="pro-name">商品名称</div>
            <div class="pro-price">单价</div>
            <div class="pro-num">数量</div>
            <div class="pro-total">小计</div>
          </li>
          <!-- 我的订单表头END -->

          <!-- 订单列表 -->
          <li class="product-list" v-for="(product,i) in item" :key="i">
            <div class="pro-img">
              <router-link :to="{ path: '/goods/details', query: {productID:product.product_id} }">
                <img :src="$target + product.product_picture" />
              </router-link>
            </div>
            <div class="pro-name">
              <router-link
                :to="{ path: '/goods/details', query: {productID:product.product_id} }"
              >{{product.product_name}}</router-link>
            </div>
            <div class="pro-price">{{product.product_price}}元</div>
            <div class="pro-num">{{product.product_num}}</div>
            <div class="pro-total pro-total-in">{{product.product_price*product.product_num}}元</div>
          </li>
        </ul>
        <div class="order-bar">
          <div class="order-bar-left">
            <span class="order-total">
              共
              <span class="order-total-num">{{total[index].totalNum}}</span> 件商品
            </span>
          </div>
          <div class="order-bar-right">
            <span>
              <span class="total-price-title">合计：</span>
              <span class="total-price">{{total[index].totalPrice}}元</span>
            </span>
          </div>
          <!-- 订单列表END -->
        </div>
      </div>
      <div style="margin-top:-40px;"></div>
    </div>
    <!-- 我的订单主要内容END -->

    <!-- 订单为空的时候显示的内容 -->
    <div v-else class="order-empty">
      <div class="empty">
        <h2>您的订单还是空的！</h2>
        <p>快去购物吧！</p>
      </div>
    </div>
    <!-- 订单为空的时候显示的内容END -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      orders: [], // 订单列表
      total: [] // 每个订单的商品数量及总价列表
    };
  },
  activated() {
    // 获取订单数据
    this.$axios
      .post("/api/user/order/getOrder", {
        user_id: this.$store.getters.getUser.user_id
      })
      .then(res => {
        if (res.data.code === "001") {
          this.orders = res.data.orders;
        } else {
          this.notifyError(res.data.msg);
        }
      })
      .catch(err => {
        return Promise.reject(err);
      });
  },
  watch: {
    // 通过订单信息，计算出每个订单的商品数量及总价
    orders: function(val) {
      let total = [];
      for (let i = 0; i < val.length; i++) {
        const element = val[i];

        let totalNum = 0;
        let totalPrice = 0;
        for (let j = 0; j < element.length; j++) {
          const temp = element[j];
          totalNum += temp.product_num;
          totalPrice += temp.product_price * temp.product_num;
        }
        total.push({ totalNum, totalPrice });
      }
      this.total = total;
    }
  },methods:{
        onClickLeft() {
      this.$router.go(-1);
    },

  }
};
</script>