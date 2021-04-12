<style scoped>
.ms {
  margin-bottom: 0px;
  color: #ffffff;
  font-size: 12px;
  position: absolute;
  /*position: relative;*/
  border-bottom-right-radius: 6px;
  border-top-left-radius: 6px;
  bottom: 5px;
  right: 0;
  width: 80%;
  height: 10%;
  background: #505b4c;
  opacity: 0.8;
  filter: alpha(opacity=60);
  -moz-opacity: 0.8;
}
.con_img {
  position: relative;
  width: auto;
  height: auto;
}
.image {
  height: 140px;
  width: 100px;
}
.text {
  overflow: hidden;
  text-align: center;
  width: 200px;
  height: 60px;
  line-height: auto;
  margin-top: 20px;
}
</style>

<template>
  <div>
    <Row>
      <Col span="8">
        <div style="width:100px;">
          <div class="con_img">
            <!-- <img class="image right-radius left-radius" src="@/static/demo.jpg" id="scenic_img" /> -->
            <div class="image">
              <van-image
                radius="6"
                lazy-load
                style="height: 140px"
                :src="this.$target+this.sortattrs.product_picture"
                @click="todetail(sortattrs.url)"
              ></van-image>
            </div>
            <p class="ms van-ellipsis">{{ sortattrs.product_price }}元</p>
          </div>
          <div class="van-ellipsis">{{ sortattrs.product_name }}</div>
        </div>
      </Col>
      <Col span="8">
        <Row>
          <Col span="24">
            <div class="text">{{sortattrs.product_intro}}</div>
          </Col>
        </Row>


      </Col>
    </Row>
  </div>
</template>
<script>
export default {
  name: "sortcard",
  props: ["sortattrs"],
  mounted() {
    console.log("this:", this);
  },
  methods: {
    todetail: function (value) {
      this.$router.push({
        path: "/detail",
        query: {
          url: value,
          textsize: this.sortattrs.textsize,
        },
      });
    },
  },
};
</script>