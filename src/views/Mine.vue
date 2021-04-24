<template>
  <div>
    <div>
      <van-nav-bar
        title="用户信息"
        left-text="返回"
        left-arrow
        @click-left="onClickLeft"
      />
    </div>
    <div>
    </div>
    <div>
         <router-view></router-view>
    </div>
  </div>
</template>
<script>

export default {
  name: "mine",
  data() {
    return {
      mydata: "",
      isdisplay:true
    };
  },
  created() {
         // 判断是否登录,没有登录则显示登录组件
      if (!this.$store.getters.getUser) {
        this.$router.push('/mine/login')
        return;
      }else{
            this.$router.push('/mine/userinform')
        return;
      }
    //   let user =this.$store.getters.getUser
    //   console.log(user)
    // // 向后端发起更新购物车的数据库信息请求
    // this.$axios.post("/api2/user/getuserbyname", {
    //     username:this.user.userName
    // }).then((res) => {
    //   this.mydata = res.data;
    // });
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