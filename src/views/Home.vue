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
     
   <div class="login">   
          <!-- 顶部导航栏 -->
                  <Dropdown>
        <a href="javascript:void(0)">
            菜单
            <Icon type="ios-arrow-down"></Icon>
        </a>
        <DropdownMenu slot="list">
            <DropdownItem>  <li v-if="!$store.getters.getUser">
              <el-button type="text" @click="login">登录</el-button>
              <span class="sep">|</span>
              <el-button type="text" @click="register = true">注册</el-button>
            </li>
            <li v-else>
              欢迎
              <el-popover placement="top" width="180" v-model="visible">
                <p>确定退出登录吗？</p>
                <div style="text-align: right; margin: 10px 0 0">
                  <el-button size="mini" type="text" @click="visible = false">取消</el-button>
                  <el-button type="primary" size="mini" @click="logout">确定</el-button>
                </div>
                <el-button type="text" slot="reference">{{$store.getters.getUser.userName}}</el-button>
              </el-popover>
            </li></DropdownItem>
            <DropdownItem>  <li>
              <router-link to="/order">我的订单</router-link>
            </li></DropdownItem>
            <DropdownItem>   <li>
              <router-link to="/collect">我的收藏</router-link>
            </li></DropdownItem>
            <DropdownItem divided><li :class="getNum > 0 ? 'shopCart-full' : 'shopCart'">
              <router-link to="/shoppingCart">
                <i class="el-icon-shopping-cart-full"></i> 购物车
                <span class="num">({{getNum}})</span>
              </router-link>
            </li></DropdownItem>
        </DropdownMenu>
    </Dropdown>

       
         </div>
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
         <MyLogin class="mylogin"></MyLogin>
         <MyRegister class="myregister" :register="register" @fromChild="isRegister"></MyRegister> 
   
      <!-- 文字较短时，通过设置 scrollable 属性开启滚动播放 -->
      <van-notice-bar scrollable text="技术是开发它的人的共同灵魂。" />
        <div class="nav">
          <van-grid>
            <van-grid-item :to="{ path: '/showrank2' }">
              <div class="itcon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-jinrongketang" />
                </svg>
                <h4 class="font">推荐</h4>
              </div>
            </van-grid-item>
            <van-grid-item :to="{ path: '/showrank' }">
              <div class="itcon">
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-bangdan" />
                </svg>
                <h4 class="font">排行榜</h4>
              </div>
            </van-grid-item>
            <van-grid-item />
            <van-grid-item />
          </van-grid>
        </div>
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
      <van-tabbar v-model="active_bar">
        <van-tabbar-item icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item icon="search" :to="{ path: '/sort' }">分类</van-tabbar-item>
        <van-tabbar-item icon="friends-o">购物车</van-tabbar-item>
        <van-tabbar-item icon="setting-o">我的</van-tabbar-item>
      </van-tabbar>
    </div>
  </div>
</template>
<script>

import Mylist from "@/components/Mylist.vue"
import MyRegister from '@/components/MyRegister';
import MyLogin from '@/components/MyLogin';
import { mapActions } from "vuex";
import { mapGetters } from "vuex";
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
      active_bar:'',
      active:'',
      searchvalue:'',
       register: false, // 是否显示注册组件
          visible: false // 是否退出登录
    };
  },
    computed: {
    ...mapGetters(["getUser", "getNum"])
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
     ...mapActions(["setUser", "setShowLogin", "setShoppingCart"]),
     // 退出登录
    logout() {
      this.visible = false;
      // 清空本地登录信息
      localStorage.setItem("user", "");
      // 清空vuex登录信息
      this.setUser("");
      this.notifySucceed("成功退出登录");
    },
       // 接收注册子组件传过来的数据
    isRegister(val) {
      this.register = val;
    },
       login() {
      // 点击登录按钮, 通过更改vuex的showLogin值显示登录组件
      this.setShowLogin(true);
    },
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
    Mylist,MyRegister,MyLogin
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
.login{
  padding: 0px;
  margin-left: 50px;
  width: 90px;
  height: 100%;
  text-align: center;
  line-height: 46px;
}
.mylogin{
  background: blue;
    padding: 0px;
  margin: 0px;
  width: 50px;
  height: 100%;
  color: black;

}
.van-nav-bar__left {
  height: 35px;
  left: 8px !important;
}
.van-nav-bar__title {
  margin-left: 40px !important;
  max-width: 65% !important;
}
.van-nav-bar__right {
  height: 40px;
  right: 8px !important;
}

.iconfont {
  margin-left: 8px;
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 70%;
  text-align: center;
  background-color: #39a9ed;
}
.tab {
  margin: 15px 0px !important;
}
.bannerimage {
  width: 100%;
  height: 100%;
}
.center {
  text-align: center;
}
.top {
  padding: 5px;
  background: rgba(78, 80, 82, 0.39);
  color: #fff;
  text-align: center;
  border-radius: 2px;
}
.nav {
  margin: 5px 0px;
  
}
.home {
  background-color: #f6f7f9;
}
.itcon {
  text-align: center;
  align-items: center;
}
.font {
  font-size: 12px;
}
</style>