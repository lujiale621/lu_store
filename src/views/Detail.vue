<template>
  <div>
    <div>
      <van-nav-bar
        :title="this.productDetails.product_name"
        left-text="返回"
  
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-swipe :autoplay="3000" class="bannerimage">
        <van-swipe-item v-for="item in productPicture" :key="item.id" height="auto">
          <img class="image" :src="$target + item.product_picture" :alt="item.product_intro" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div>
      <!-- 优惠券单元格 -->
      <van-coupon-cell :coupons="coupons" :chosen-coupon="chosenCoupon" @click="showList = true" />
      <!-- 优惠券列表 -->
      <van-popup v-model="showList" round position="bottom" style="height: 90%; padding-top: 4px;">
        <van-coupon-list
          :coupons="coupons"
          :chosen-coupon="chosenCoupon"
          :disabled-coupons="disabledCoupons"
          @change="onChange"
          @exchange="onExchange"
        />
      </van-popup>
    </div>
    <div>
      <vue-scroll :ops="ops">
        <div>
          <Row>
            <Col span="24">
              <Card>
                <p
                  class="price"
                  slot="title"
                >￥{{this.productDetails.product_price}} 卷后{{(this.productDetails.product_price)-10}}</p>
                <p>{{this.productDetails.product_intro}}</p>
              </Card>
            </Col>
          </Row>
        </div>

        <div>
          <Row>
            <Col span="24">
              <Card>
                <p slot="title">
                  <van-tag class="tag" type="primary">{{this.productDetails.product_title}}</van-tag>
                  <van-tag class="tag" type="success">满5000减100</van-tag>
                  <van-tag class="tag" type="danger">免运费</van-tag>
                </p>
                <div>
                  <Row>
                    <Col span="24">
                      <Row>
                        <Col class="first" span="3">发货：</Col>
                        <Col span="4">北京</Col>
                        <Col span="3">快递：</Col>
                        <Col span="4">免运费</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <Row>
                        <Col span="3">保障：</Col>
                        <Col span="21">假一赔十·极速退款·七天无理由退换</Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span="24">
                      <Row>
                        <Col span="3">权益：</Col>
                        <Col span="21">凭积分先用后付，确认收货再付</Col>
                      </Row>
                    </Col>
                  </Row>
                   <Row>
                    <Col span="24">店铺预售，付款后120天内发货</Col>
                  </Row>
                </div>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col span="24">
              <Card>
                <Row>
                  <Col span="24">
                    客服:
                    <Rate icon="ios-heart" allow-half v-model="valueHalf" />
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    物流:
                    <Rate icon="ios-heart" allow-half v-model="valueHalf2" />
                  </Col>
                </Row>
                <Row>
                  <Col span="24">
                    <Rate icon="ios-heart" allow-half v-model="valueHalf2" />
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </div>
      </vue-scroll>
    </div>
    <div>
      <van-goods-action>
        <van-goods-action-icon icon="chat-o" text="客服" color="#ee0a24" />
        <van-goods-action-icon icon="cart-o" text="购物车" />
        <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
        <van-goods-action-button type="warning" text="加入购物车" />
        <van-goods-action-button type="danger" text="立即购买" />
      </van-goods-action>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
const coupon = {
  available: 1,
  condition: "无使用门槛\n最多优惠12元",
  reason: "",
  value: 0,
  name: "优惠券名称",
  startAt: 1489104000,
  endAt: 1514592000,
  valueDesc: "10",
  unitDesc: "元",
};
export default {
  data() {
    return {
      valueHalf: 4,
      valueHalf2: 5,
      dis: false, // 控制“加入购物车按钮是否可用”
      productID: "", // 商品id
      productDetails: "", // 商品详细信息
      productPicture: "", // 商品图片
      chosenCoupon: -1,
      coupons: [coupon],
      disabledCoupons: [coupon],
      showList: false,
      ops: {
        vuescroll: {},
        scrollPanel: {
          initialScrollY: false,
          initialScrollX: false,
          scrollingX: true,
          scrollingY: true,
          speed: 300,
          easing: undefined,
          verticalNativeBarPos: "right",
          maxHeight: undefined,
          maxWidth: undefined,
        },
        rail: {},
        bar: {},
      },
    };
  },

  // 通过路由获取商品id
  activated() {
    if (this.$route.query.productID != undefined) {
      this.productID = this.$route.query.productID;
    }
  },
  watch: {
    // 监听商品id的变化，请求后端获取商品数据
    productID: function (val) {
      this.getDetails(val);
      this.getDetailsPicture(val);
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onChange(index) {
      this.showList = false;
      this.chosenCoupon = index;
    },
    onExchange(code) {
      this.coupons.push(coupon);
      console.log(code);
    },
    ...mapActions(["unshiftShoppingCart", "addShoppingCartNum"]),
    // 获取商品详细信息
    getDetails(val) {
      this.$axios
        .post("/api/product/getDetails", {
          productID: val,
        })
        .then((res) => {
          this.productDetails = res.data.Product[0];
          console.log("this", this);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 获取商品图片
    getDetailsPicture(val) {
      this.$axios
        .post("/api/product/getDetailsPicture", {
          productID: val,
        })
        .then((res) => {
          this.productPicture = res.data.ProductPicture;
          console.log("this", this);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 加入购物车
    addShoppingCart() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios
        .post("/api/user/shoppingCart/addShoppingCart", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: this.productID,
        })
        .then((res) => {
          switch (res.data.code) {
            case "001":
              // 新加入购物车成功
              this.unshiftShoppingCart(res.data.shoppingCartData[0]);
              this.notifySucceed(res.data.msg);
              break;
            case "002":
              // 该商品已经在购物车，数量+1
              this.addShoppingCartNum(this.productID);
              this.notifySucceed(res.data.msg);
              break;
            case "003":
              // 商品数量达到限购数量
              this.dis = true;
              this.notifyError(res.data.msg);
              break;
            default:
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    addCollect() {
      // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$store.dispatch("setShowLogin", true);
        return;
      }
      this.$axios
        .post("/api/user/collect/addCollect", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: this.productID,
        })
        .then((res) => {
          if (res.data.code == "001") {
            // 添加收藏成功
            this.notifySucceed(res.data.msg);
          } else {
            // 添加收藏失败
            this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
</script>
<style scoped>
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 150px;
  text-align: center;
  background-color: #39a9ed;
}
.price {
  color: rgb(233, 39, 39);
}
.tag {
  margin-right: 10px;
}
.image {
  height: 200px;
  text-align: center;
  margin: 0px 100px;
}
.first{
    color: rgb(80, 73, 73);
    size: 30px;
}
</style>