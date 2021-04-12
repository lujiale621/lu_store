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
.image{
  height: 140px;
  width:100px;
}
</style>

<template>
  <div style="width:100px;">
    <div class="con_img">
      <!-- <img class="image right-radius left-radius" src="@/static/demo.jpg" id="scenic_img" /> -->
      <div class="image">
        <van-image
          radius="6"
          lazy-load
          style="height: 140px"
          :src="this.$target+this.nvattrs.product_picture"
        >
        </van-image>
      </div>
      <p class="ms van-ellipsis">{{ nvattrs.product_price }}元</p>
    </div>
    <div class="van-ellipsis">{{ nvattrs.product_name }}</div>
  </div>
</template>
<script>

export default {
  name: "novelcard",
  props: ["nvattrs"],
  data(){
    return{
    }
  },
  mounted() {
   // console.log("this",this)
   
  },
  methods: {

  }
  
};
</script>