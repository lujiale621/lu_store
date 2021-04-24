<template>
  <div class="layout">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import { Notify } from "vant";
export default {
  name: "login",
  data() {
    return {
      username: "",
      password: "",
      show: false,
      timer: null, //首先我在data函数里面进行定义定时器名称：

    };
  },
  created() {},
  beforeDestroy() {
    //页面关闭前关闭定时器 （这个才有用）
    clearInterval(this.timer);
  },
  methods: {
    ...mapActions(["setUser"]),

    onClickLeft() {
      this.$router.go(-1);
    },
    showNotify() {
      this.show = true;
      setTimeout(() => {
        this.show = false;
      }, 2000);
    },
    onSubmit(values) {
      this.login();
      console.log("submit", values);
    },

    login() {
      {
        this.$axios
          .post("/api/users/login", {
            userName: this.username,
            password: this.password,
          })
          .then((res) => {
            // “001”代表登录成功，其他的均为失败
            if (res.data.code === "001") {
              console.log("success");
              // 登录信息存到本地
              let user = JSON.stringify(res.data.user);
              localStorage.setItem("user", user);
              // 登录信息存到vuex
              this.setUser(res.data.user)
              // 成功通知
              Notify({ type: "success", message: "登录成功后自动跳转" });
             
                this.$router.push('/mine/userinform');
            
            } else {
              console.log("fail");
              // 危险通知
              Notify({ type: "danger", message: "登录失败" });
            }
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }
    },
  },
  components: {
    [Notify.Component.name]: Notify.Component,
  },
};
</script>
<style scoped>
.bottom-button {
  width: 160px;
  height: 40px;
}
.layout {
  margin: 20px 0px;
}
</style>