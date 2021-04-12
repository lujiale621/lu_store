<template>
  <div>
    <van-nav-bar title="标题" left-text="返回" right-text="按钮" left-arrow @click-left="onClickLeft" />
    <div>
      <van-sidebar v-model="activeKey">
        <van-sidebar-item
          v-for="item in categoryList"
          :key="item.category_id"
          :title="''+item.category_name"
        ></van-sidebar-item>
      </van-sidebar>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      activeKey: 0,
      categoryList: [], //分类列表
      categoryID: [], // 分类id
      product: "", // 商品列表
      productList: "",
      total: 0, // 商品总量
      pageSize: 15, // 每页显示的商品数量
      currentPage: 1, //当前页码
      activeName: "-1", // 分类列表当前选中的id
      search: "", // 搜索条件
    };
  },
  created() {
    // 获取分类列表
    this.getCategory();
  },
  activated() {
    this.activeName = "-1"; // 初始化分类列表当前选中的id为-1
    this.total = 0; // 初始化商品总量为0
    this.currentPage = 1; //初始化当前页码为1
    // 如果路由没有传递参数，默认为显示全部商品
    if (Object.keys(this.$route.query).length == 0) {
      this.categoryID = [];
      this.activeName = "0";
      return;
    }
    // 如果路由传递了categoryID，则显示对应的分类商品
    if (this.$route.query.categoryID != undefined) {
      this.categoryID = this.$route.query.categoryID;
      if (this.categoryID.length == 1) {
        this.activeName = "" + this.categoryID[0];
      }
      return;
    }
    // 如果路由传递了search，则为搜索，显示对应的分类商品
    if (this.$route.query.search != undefined) {
      this.search = this.$route.query.search;
    }
  },
  watch: {
    // 监听点击了哪个分类标签，通过修改分类id，响应相应的商品
    activeName: function (val) {
      if (val == 0) {
        this.categoryID = [];
      }
      if (val > 0) {
        this.categoryID = [Number(val)];
      }
      // 初始化商品总量和当前页码
      this.total = 0;
      this.currentPage = 1;
      // 更新地址栏链接，方便刷新页面可以回到原来的页面
      this.$router.push({
        path: "/goods",
        query: { categoryID: this.categoryID },
      });
    },
    // 监听搜索条件，响应相应的商品
    search: function (val) {
      if (val != "") {
        this.getProductBySearch(val);
      }
    },
    // 监听分类id，响应相应的商品
    categoryID: function () {
      this.getData();
      this.search = "";
    },
    // 监听路由变化，更新路由传递了搜索条件
    $route: function (val) {
      if (val.path == "/goods") {
        if (val.query.search != undefined) {
          this.activeName = "-1";
          this.currentPage = 1;
          this.total = 0;
          this.search = val.query.search;
        }
      }
    },
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    // 返回顶部
    backtop() {
      const timer = setInterval(function () {
        const top =
          document.documentElement.scrollTop || document.body.scrollTop;
        const speed = Math.floor(-top / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          top + speed;

        if (top === 0) {
          clearInterval(timer);
        }
      }, 20);
    },
    // 页码变化调用currentChange方法
    currentChange(currentPage) {
      this.currentPage = currentPage;
      if (this.search != "") {
        this.getProductBySearch();
      } else {
        this.getData();
      }
      this.backtop();
    },
    // 向后端请求分类列表数据
    getCategory() {
      this.$axios
        .post("/api/product/getCategory", {})
        .then((res) => {
          const val = {
            category_id: 0,
            category_name: "全部",
          };
          const cate = res.data.category;
          cate.unshift(val);
          cate.forEach((element) => {
            console.log(element);
            this.categoryList.push(element);
          });
          //   this.categoryList = cate;
          //console.log("this:", cate);
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 向后端请求全部商品或分类商品数据
    getData() {
      // 如果分类列表为空则请求全部商品数据，否则请求分类商品数据
      const api =
        this.categoryID.length == 0
          ? "/api/product/getAllProduct"
          : "/api/product/getProductByCategory";
      this.$axios
        .post(api, {
          categoryID: this.categoryID,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.product = res.data.Product;
          this.total = res.data.total;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
    // 通过搜索条件向后端请求商品数据
    getProductBySearch() {
      this.$axios
        .post("/api/product/getProductBySearch", {
          search: this.search,
          currentPage: this.currentPage,
          pageSize: this.pageSize,
        })
        .then((res) => {
          this.product = res.data.Product;
          this.total = res.data.total;
        })
        .catch((err) => {
          return Promise.reject(err);
        });
    },
  },
};
</script>
<style scoped>
</style>