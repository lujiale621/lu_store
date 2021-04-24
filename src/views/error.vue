<template>
  <div>
    <van-empty description="出错了">
      <van-button
        round
        type="danger"
        class="bottom-button"
        :to="{ path: '/home' }"
        >返回首页</van-button
      >
    </van-empty>
  </div>
</template>
<style>
.bottom-button {
  width: 160px;
  height: 40px;
}
</style>