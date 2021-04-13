<template>
  <div id="myList" class="myList">
    <div class="scrollcard">
      <van-row>
        <van-col span="2">
          <div class="imgdiv">
            <img
              class="icon-avatar"
              src="../assets/tv.png"
              alt="Smiley face"
              width="30"
              height="30"
            />
          </div>
        </van-col>
        <van-col span="10">
          <p class="list-title">{{this.nvtype}}</p>
        </van-col>
        <van-col span="12">
          <p class="list-update" @click="tonovelsort">更多></p>
        </van-col>
      </van-row>
      <div>
        <vue-scroll :ops="ops">
          <div style="display: flex;">
            <novelcard v-for="item of list" :key="item.id" :nvattrs="item" style="margin: 10px;"></novelcard>
          </div>
        </vue-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import novelcard from "@/components/novelcard.vue";
export default {
  name: "MyList",
  // list为父组件传过来的商品列表
  // isMore为是否显示“浏览更多”
  props: ["list", "isMore", "isDelete", "nvtype"],
  data() {
    return {
      ops: {
        vuescroll: {},
        scrollPanel: {},
        rail: {},
        bar: {
          disable: true,
        },
      },
    };
  },
  mounted() {
    // console.log("this:", this);
  },
  computed: {
    // 通过list获取当前显示的商品的分类ID，用于“浏览更多”链接的参数
    categoryID: function () {
      let categoryID = [];
      if (this.list != "") {
        for (let i = 0; i < this.list.length; i++) {
          const id = this.list[i].category_id;
          if (!categoryID.includes(id)) {
            categoryID.push(id);
          }
        }
      }
      return categoryID;
    },
  },
  methods: {
    tonovelsort() {
      this.$router.push({
        path: "/sort",
        query: {},
      });
    },
    deleteCollect(product_id) {
      this.$axios
        .post("/api/user/collect/deleteCollect", {
          user_id: this.$store.getters.getUser.user_id,
          product_id: product_id,
        })
        .then((res) => {
          switch (res.data.code) {
            case "001":
              // 删除成功
              // 删除删除列表中的该商品信息
              for (let i = 0; i < this.list.length; i++) {
                const temp = this.list[i];
                if (temp.product_id == product_id) {
                  this.list.splice(i, 1);
                }
              }
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
  components: { novelcard },
};
</script>
<style scoped>
.list-title {
  text-align: left;
  font-size: 16px;
  margin: 5px 5px;
}

.list-update {
  text-align: right;
  font-size: 16px;
  margin-top: 5px;
  margin-bottom: 5px;
  margin-right: 15px;
  color: burlywood;
}
.scrollcard {
  background: #ffffff;
}
.imgdiv {
  padding-left: 5px;
}
</style>