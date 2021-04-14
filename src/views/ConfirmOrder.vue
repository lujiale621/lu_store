<template>
  <div class="confirmOrder">
    <div>
      <van-nav-bar title="我的订单" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <!-- 头部 -->
    <div class="confirmOrder-header">
      <div class="header-content">
        <p>
          <i class="el-icon-s-order">收货地址：</i>
        </p>

        <router-link to></router-link>
      </div>
    </div>
    <!-- 头部END -->

    <!-- 主要内容容器 -->
    <div class="content">
      <van-address-list
        v-model="chosenAddressId"
        :list="list"
        :disabled-list="disabledList"
        disabled-text="以下地址超出配送范围"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
      />
      <!-- 头部 -->
      <div class="confirmOrder-header">
        <div class="header-content">
          <p>
            <i class="el-icon-s-order">商品及优惠券</i>
          </p>

          <router-link to></router-link>
        </div>
      </div>
      <!-- 头部END -->
      <!-- 商品及优惠券 -->
      <div class="section-goods">
        <div class="goods-list">
          <ul>
            <li v-for="item in getCheckGoods" :key="item.id">
              <img :src="$target + item.productImg" />
              <span class="pro-name sspan">{{item.productName}}</span>
              <span class="pro-price sspan">{{item.price}}元 x {{item.num}}</span>
              <span class="pro-status sspan"></span>
              <span class="pro-total sspan">{{item.price * item.num}}元</span>
            </li>
          </ul>
        </div>
      </div>
      <!-- 商品及优惠券END -->
      <Card :bordered="false">
        <!-- 配送方式 -->
        <div class="section-shipment">
          <Row>
            <Col span="5">
              <p class="title">配送方式:</p>
            </Col>
            <Col span="4">
              <p class="shipment">包邮</p>
            </Col>
          </Row>
        </div>
        <!-- 配送方式END -->

        <!-- 发票 -->
        <div class="section-invoice">
          <Row>
            <Col span="3">
              <p class="title">发票:</p>
            </Col>
            <Col span="4">
              <p class="shipment">电子发票</p>
            </Col>
          </Row>
          <p class="invoice">商品明细</p>
        </div>
        <!-- 发票END -->

        <!-- 结算列表 -->
        <div class="section-count">
          <div class="money-box">
            <ul>
              <li>
                <span class="title">商品件数：</span>
                <span class="value">{{getCheckNum}}件</span>
              </li>
              <li>
                <span class="title">商品总价：</span>
                <span class="value">{{getTotalPrice}}元</span>
              </li>
              <li>
                <span class="title">活动优惠：</span>
                <span class="value">-0元</span>
              </li>
              <li>
                <span class="title">优惠券抵扣：</span>
                <span class="value">-0元</span>
              </li>
              <li>
                <span class="title">运费：</span>
                <span class="value">0元</span>
              </li>
              <li class="total">
                <span class="title">应付总额：</span>
                <span class="value">
                  <span class="total-price">{{getTotalPrice}}</span>元
                </span>
              </li>
            </ul>
          </div>
        </div>
        <!-- 结算列表END -->

        <!-- 结算导航 -->
        <div class="section-bar">
          <div class="btn">
            <Row>
              <Col span="8">
                <router-link to="/shoppingCart" class="btn-base btn-return">
                  <van-button type="primary">返回购物车</van-button>
                </router-link>
              </Col>
              <Col span="8">
                <div class="btn2">
                  <van-button type="info" @click="addOrder">结算</van-button>
                </div>
              </Col>
            </Row>
          </div>
        </div>
        <!-- 结算导航END -->
      </Card>
    </div>
    <!-- 主要内容容器END -->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
export default {
  name: "ConfirmOrder",
  data() {
    return {
      chosenAddressId: "1",
      list: [
        {
          id: "1",
          name: "张三",
          tel: "13000000000",
          address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
          isDefault: true,
        },
        {
          id: "2",
          name: "李四",
          tel: "1310000000",
          address: "浙江省杭州市拱墅区莫干山路 50 号",
        },
      ],
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
    };
  },
  created() {
    // 如果没有勾选购物车商品直接进入确认订单页面,提示信息并返回购物车
    if (this.getCheckNum < 1) {
      this.notifyError("请勾选商品后再结算");
      this.$router.push({ path: "/shoppingCart" });
    }
  },
  computed: {
    // 结算的商品数量; 结算商品总计; 结算商品信息
    ...mapGetters(["getCheckNum", "getTotalPrice", "getCheckGoods"]),
  },
  methods: {
    onAdd() {
      console.log("新增地址");
    },
    onEdit(item, index) {
      console.log("编辑地址:" + index);
    },
    onClickLeft() {
      this.$router.push("/home");
    },
    ...mapActions(["deleteShoppingCart"]),
    addOrder() {
       this.notifySucceed("购买成功");
    //   this.$axios
    //     .post("/api/user/order/addOrder", {
    //       user_id: this.$store.getters.getUser.user_id,
    //       products: this.getCheckGoods,
    //     })
    //     .then((res) => {
    //       let products = this.getCheckGoods;
    //       switch (res.data.code) {
    //         // “001”代表结算成功
    //         case "001":
    //           for (let i = 0; i < products.length; i++) {
    //             const temp = products[i];
    //             // 删除已经结算的购物车商品
    //             this.deleteShoppingCart(temp.id);
    //           }
    //           // 提示结算结果
    //           this.notifySucceed(res.data.msg);
    //           // 跳转我的订单页面
    //           this.$router.push({ path: "#" });
    //           break;
    //         default:
    //           // 提示失败信息
    //           this.notifyError(res.data.msg);
    //       }
    //     })
    //     .catch((err) => {
    //       return Promise.reject(err);
    //     });
    // },
  },}
};
</script>
<style scoped>
img {
  width: 60px;
  height: 60px;
}
.el-icon-s-order {
  size: 100px;
  color: cornflowerblue;
  text-align: center;
}
.van-address-list__bottom {
  display: none;
}
.sspan {
  margin: 10px 10px;
  padding: auto;
  padding-bottom: 10px;
}
.btn2 {
  padding-right: 30px;
}
.btn {
  font-size: 30px;
  padding-right: 30px;
}
i{
  font-size: 20px!important;
}
</style>