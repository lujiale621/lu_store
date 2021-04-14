<!--
 * @Description: 我的购物车页面组件
 * @Author: hai-27
 * @Date: 2020-02-20 01:55:47
 * @LastEditors: hai-27
 * @LastEditTime: 2020-02-27 13:36:42
 -->

<template>
  <div class="shoppingCart">
    <div>
      <van-nav-bar title="购物车" left-text="返回" left-arrow @click-left="onClickLeft" />
    </div>
    <Row>
      <Col span="24">
        <!-- 购物车头部 -->
        <div class="cart-header">
          <div class="cart-header-content">
            <p>
              <i class="el-icon-shopping-cart-full" style="color:#ff6700; "></i>
              我的购物车
            </p>
            <span>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</span>
          </div>
        </div>
        <!-- 购物车头部END -->
      </Col>
    </Row>

    <Row>
      <Col span="24">
        <!-- 购物车主要内容区 -->
        <div class="content" v-if="getShoppingCart.length>0">
          <ul>
            <!-- 购物车表头 -->
            <li class="header">
              <Row>
                <Col span="1">
                  <div class="pro-check">
                    <el-checkbox v-model="isAllCheck">全选</el-checkbox>
                  </div>
                </Col>

                <Col span="3">
                  <div class="pro-img"></div>
                </Col>

                <Col span="4">
                  <div class="pro-name">商品名称</div>
                </Col>

                <Col span="3">
                  <div class="pro-price">单价</div>
                </Col>

                <Col span="3">
                  <div class="pro-num">数量</div>
                </Col>

                <Col span="3">
                  <div class="pro-num">
                    <div class="pro-total">小计</div>
                  </div>
                </Col>

                <Col span="3">
                  <div class="pro-num">
                    <div class="pro-action">操作</div>
                  </div>
                </Col>
              </Row>
            </li>
            <!-- 购物车表头END -->

            <!-- 购物车列表 -->
            <li class="product-list" v-for="(item,index) in getShoppingCart" :key="item.id">
              <Row>
                <Col span="1">
                  <div class="pro-check">
                    <el-checkbox :value="item.check" @change="checkChange($event,index)"></el-checkbox>
                  </div>
                </Col>
                <Col span="4">
                  <div class="pro-img">
                    <router-link :to="{ path: '/details', query: {productID:item.productID} }">
                      <img :src="$target + item.productImg" />
                    </router-link>
                  </div>
                </Col>
     

                <Col span="3">
                  <div class="pro-price">{{item.price}}元</div>
                </Col>
                <Col span="10">
                  <div class="pro-num">
                    <el-input-number
                      class="button"
                      size="small"
                      :value="item.num"
                      @change="handleChange($event,index,item.productID)"
                      :min="1"
                      :max="item.maxNum"
                    ></el-input-number>
                  </div>
                </Col>
                <Col span="3">
                  <div class="pro-total pro-total-in">{{item.price*item.num}}元</div>
                </Col>
                <Col span="3">
                  <div class="pro-action">
                    <el-popover placement="right">
                      <p>确定删除吗？</p>
                      <div style="text-align: right; margin: 10px 0 0">
                        <el-button
                          type="primary"
                          size="mini"
                          @click="deleteItem($event,item.id,item.productID)"
                        >确定</el-button>
                      </div>

                      <i class="el-icon-error" slot="reference" style="font-size: 18px;"></i>
                    </el-popover>
                  </div>
                </Col>
              </Row>
            </li>

            <!-- 购物车列表END -->
          </ul>
          <div style="height:20px;background-color: #f5f5f5"></div>
          <!-- 购物车底部导航条 -->
          <div class="cart-bar">
            <div class="cart-bar-left">
              <span>
                <router-link to="/sort">继续购物</router-link>
              </span>
              <span class="sep">|</span>
              <span class="cart-total">
                共
                <span class="cart-total-num">{{getNum}}</span> 件商品，已选择
                <span class="cart-total-num">{{getCheckNum}}</span> 件
              </span>
            </div>
            <div class="cart-bar-right">
              <span>
                <span class="total-price-title">合计：</span>
                <span class="total-price">{{getTotalPrice}}元</span>
              </span>
              <router-link :to="getCheckNum > 0 ? '/confirmOrder' : ''">
                <div :class="getCheckNum > 0 ? 'btn-primary' : 'btn-primary-disabled'">去结算</div>
              </router-link>
            </div>
          </div>
          <!-- 购物车底部导航条END -->
        </div>
        <!-- 购物车主要内容区END -->
        <!-- 购物车为空的时候显示的内容 -->
        <div v-else class="cart-empty">
          <div class="empty">
            <h2>您的购物车还是空的！</h2>
            <p>快去购物吧！</p>
          </div>
        </div>
      </Col>
    </Row>

    <!-- 购物车为空的时候显示的内容END -->
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    ...mapActions(["updateShoppingCart", "deleteShoppingCart", "checkAll"]),
    // 修改商品数量的时候调用该函数
    handleChange(currentValue, key, productID) {
      // 当修改数量时，默认勾选
      this.updateShoppingCart({ key: key, prop: "check", val: true });
      // 向后端发起更新购物车的数据库信息请求
      this.$axios
        .post("/api/user/shoppingCart/updateShoppingCart", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: productID,
          num: currentValue,
        })
        .then((res) => {
          switch (res.data.code) {
            case "001":
              // “001”代表更新成功
              // 更新vuex状态
              this.updateShoppingCart({
                key: key,
                prop: "num",
                val: currentValue,
              });
              // 提示更新成功信息
              this.notifySucceed(res.data.msg);
              break;
            default:
              // 提示更新失败信息
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    checkChange(val, key) {
      // 更新vuex中购物车商品是否勾选的状态
      this.updateShoppingCart({ key: key, prop: "check", val: val });
    },
    // 向后端发起删除购物车的数据库信息请求
    deleteItem(e, id, productID) {
      this.$axios
        .post("/api/user/shoppingCart/deleteShoppingCart", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: productID,
        })
        .then((res) => {
          switch (res.data.code) {
            case "001":
              // “001” 删除成功
              // 更新vuex状态
              this.deleteShoppingCart(id);
              // 提示删除成功信息
              this.notifySucceed(res.data.msg);
              break;
            default:
              // 提示删除失败信息
              this.notifyError(res.data.msg);
          }
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
  computed: {
    ...mapGetters([
      "getShoppingCart",
      "getCheckNum",
      "getTotalPrice",
      "getNum",
    ]),
    isAllCheck: {
      get() {
        return this.$store.getters.getIsAllCheck;
      },
      set(val) {
        this.checkAll(val);
      },
    },
  },
};
</script>
<style scoped>
/* 购物车为空的时候显示的内容CSS END */
.pro-img img {
  height: 80px;
  width: 80px;
}

a{
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
}
li{
  text-align: center;
}
.shoppingCart .cart-bar .cart-bar-right .total-price-title {
  color: #ff6700;
  font-size: 14px;
}
.shoppingCart .cart-bar .cart-bar-right .total-price {
  color: #ff6700;
  font-size: 30px;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #ff6700;
  color: #fff;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary-disabled {
  float: right;
  width: 200px;
  text-align: center;
  font-size: 18px;
  margin-left: 50px;
  background: #e0e0e0;
  color: #b0b0b0;
}
.shoppingCart .cart-bar .cart-bar-right .btn-primary:hover {
  background-color: #f25807;
}
</style>