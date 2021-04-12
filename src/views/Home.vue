<template>
  <div>
    <div class="title">
         <BackTop :height="100" :bottom="200">
        <div class="top">顶端</div>
      </BackTop>
      <van-nav-bar left-arrow :border="false">
        <template #title>
          <van-search shape="round" v-model="searchvalue" placeholder="请输入搜索关键词"></van-search>
        </template>
        <template #left>
          <img class="icon-avatar" src="../assets/av.png" alt="Smiley face" width="30" height="30" />
        </template>
        <template #right>
          <van-icon :size="5" class="iconfont icon-email-fill fontsize" name="sixin">登录|</van-icon>
          <van-icon :size="5" class="iconfont icon-clock-fill fontsize" name="lishijilu">注册</van-icon>
        </template>
      </van-nav-bar>
    </div>

    <div class="pare">
      <van-swipe :autoplay="3000" class="bannerimage">
        <van-swipe-item v-for="(image, index) in images" height="auto" :key="index">
          <img height="auto" class="bannerimage" v-lazy="image" />
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="body">
      <!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
      <van-notice-bar scrollable text="技术是开发它的人的共同灵魂。" />
     <van-tabs v-model="active" scrollspy sticky>
        <van-tab title="手机" class="tab">
          <div class="list">
            <Mylist nvtype='手机' :list="phoneList" :isMore="true"> </MyList>
          </div>
        </van-tab>
                     <van-tab title="电视" class="tab">
           <div class="list">
           <Mylist nvtype='电视'  :list="miTvList" :isMore="true"></MyList>
        </div>
        </van-tab>  
            <van-tab title="家电" class="tab">
          <div class="list">
           <Mylist nvtype='家电' :list="applianceList" :isMore="true"></MyList>   </div>
        </van-tab>
            <van-tab title="配件" class="tab">
           <div class="list">
           <Mylist nvtype='配件'  :list="accessoryList" :isMore="true"></MyList>
        </div>
        </van-tab>   
             <van-tab title="充电器" class="tab">
           <div class="list">
           <Mylist nvtype='充电器'  :list="chargerList" :isMore="true"></MyList>
        </div>
        </van-tab>  
              <van-tab title="保护套" class="tab">
           <div class="list">
           <Mylist nvtype='保护套'  :list="protectingShellList" :isMore="true"></MyList>
        </div>
        </van-tab>  
       </van-tabs>
    </div>
    <div class="footer">
      <van-tabbar v-model="active">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search">分类</van-tabbar-item>
        <van-tabbar-item icon="friends-o">购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>
import Mylist from "@/components/Mylist.vue"
export default {
  name: "home",
  data() {
    return {
      images: [
        "https://img01.yzcdn.cn/vant/apple-1.jpg",
        "https://img01.yzcdn.cn/vant/apple-2.jpg",
      ],
      carousel: "", // 轮播图数据
      phoneList: "", // 手机商品列表
      miTvList: "", // 小米电视商品列表
      applianceList: "", // 家电商品列表
      applianceHotList: "", //热门家电商品列表
      accessoryList: "", //配件商品列表
      accessoryHotList: "", //热门配件商品列表
      protectingShellList: "", // 保护套商品列表
      chargerList: "", //充电器商品列表
      applianceActive: 1, // 家电当前选中的商品分类
      accessoryActive: 1, // 配件当前选中的商品分类
      active:'',
      searchvalue:''
    };
  },
  watch: {
    // 家电当前选中的商品分类，响应不同的商品数据
    applianceActive: function (val) {
      // 页面初始化的时候把applianceHotList(热门家电商品列表)直接赋值给applianceList(家电商品列表)
      // 所以在切换商品列表时判断applianceHotList是否为空,为空则是第一次切换,把applianceList赋值给applianceHotList
      if (this.applianceHotList == "") {
        this.applianceHotList = this.applianceList;
      }
      if (val == 1) {
        // 1为热门商品
        this.applianceList = this.applianceHotList;
        return;
      }
      if (val == 2) {
        // 2为电视商品
        this.applianceList = this.miTvList;
        return;
      }
    },
    accessoryActive: function (val) {
      // 页面初始化的时候把accessoryHotList(热门配件商品列表)直接赋值给accessoryList(配件商品列表)
      // 所以在切换商品列表时判断accessoryHotList是否为空,为空则是第一次切换,把accessoryList赋值给accessoryHotList
      if (this.accessoryHotList == "") {
        this.accessoryHotList = this.accessoryList;
      }
      if (val == 1) {
        // 1为热门商品
        this.accessoryList = this.accessoryHotList;
        return;
      }
      if (val == 2) {
        // 2为保护套商品
        this.accessoryList = this.protectingShellList;
        return;
      }
      if (val == 3) {
        //3 为充电器商品
        this.accessoryList = this.chargerList;
        return;
      }
    },
  },
  created() {
    // 获取轮播图数据
    this.$axios
      .post("/api/resources/carousel", {})
      .then((res) => {
        this.carousel = res.data.carousel;
      })
      .catch((err) => {
        return Promise.reject(err);
      });
    // 获取各类商品数据
    this.getPromo("手机", "phoneList");
    this.getPromo("电视机", "miTvList");
    this.getPromo("保护套", "protectingShellList");
    this.getPromo("充电器", "chargerList");
    this.getPromo(
      ["电视机", "空调", "洗衣机"],
      "applianceList",
      "/api/product/getHotProduct"
    );
    this.getPromo(
      ["保护套", "保护膜", "充电器", "充电宝"],
      "accessoryList",
      "/api/product/getHotProduct"
    );
  },
  methods: {
    // 获取家电模块子组件传过来的数据
    getChildMsg(val) {
      this.applianceActive = val;
    },
    // 获取配件模块子组件传过来的数据
    getChildMsg2(val) {
      this.accessoryActive = val;
    },
    // 获取各类商品数据方法封装
    getPromo(categoryName, val, api) {
      api = api != undefined ? api : "/api/product/getPromoProduct";
      this.$axios
        .post(api, {
          categoryName,
        })
        .then((res) => {
          this[val] = res.data.Product;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
  components:{
    Mylist
  }
};
</script>
<style scoped>
.fontsize {
  font-size: 35px;
}

.pare {
  height: 160px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 10%;
  text-align: center;
  background-color: #39a9ed;
}
.bannerimage {
  width: 100%;
  height: auto;
}
.title {
  height: 46px;
  text-align: center;
}
.van-search {
  height: 46px;
}
.top {
  padding: 5px;
  background: rgba(78, 80, 82, 0.39);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
</style>