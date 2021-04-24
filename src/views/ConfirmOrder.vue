<template>
  <div>
    <div>
      <van-nav-bar
        title="订单"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
      <van-steps :active="active">
        <van-step>买家下单</van-step>
        <van-step>商家接单</van-step>
        <van-step>买家提货</van-step>
        <van-step>交易完成</van-step>
      </van-steps>
    </div>
    <div>
      <van-notice-bar color="#1989fa" background="#ecf9ff" left-icon="info-o">
        配送时间：承诺72小时送达
      </van-notice-bar>
    </div>
    <div><van-cell is-link>Lujiale的专卖店</van-cell></div>
    <div>
      <van-contact-card type="add" @click="onAdd" />
      <van-contact-card
        type="edit"
        :name="currentContact.name"
        :tel="currentContact.tel"
        @click="onEdit"
      />
    </div>
    <div>
      <div>
        <div class="body">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
          >
            <van-cell v-for="item in mydata" :key="item.id">
              <van-card
                :num="item.product_num"
                :price="item.product_price"
                :desc="item.product_intro"
                :title="item.product_title"
                :thumb="$target + item.product_picture"
              >
                <template #tags>
                  <van-tag plain type="danger">七天无理由</van-tag>
                  <van-tag plain type="danger">七天价保</van-tag>
                </template>
                <template #footer> </template>
              </van-card>
            </van-cell>
          </van-list>
        </div>
        <div class="foot">
          <van-submit-bar
            :price="carprice"
            button-text="购买"
            @submit="onSubmit"
          />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import qs from "qs";

export default {
  data() {
    return {
      mydata: "",
      active: 0,
      carprice: 120000,
      currentContact: {
        name: "张三",
        tel: "13000000000",
      },
    };
  },
  mounted() {
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
        console.log(this.mydata);
      });
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onSubmit() {
      // 主要通知
      this.$toast.success("购买成功");
    },
    onAdd() {
      this.$toast("新增");
    },
  },
};
</script>