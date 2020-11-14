<template>
  <div id="tab-bar">
<!--    <div class="tab-bar-item">-->
<!--      <img src="../../assets/IMG/tabbar/home.svg" alt="">-->
<!--      <div>首页</div>-->
<!--    </div>-->
<!--    <div class="tab-bar-item">-->
<!--      <img src="../../assets/IMG/tabbar/category.svg" alt="">-->
<!--      <div>分类</div>-->
<!--    </div>-->
<!--    <div class="tab-bar-item">-->
<!--      <img src="../../assets/IMG/tabbar/shopcart.svg" alt="">-->
<!--      <div>购物车</div>-->
<!--    </div>-->
<!--    <div class="tab-bar-item">-->
<!--      <img src="../../assets/IMG/tabbar/profile.svg" alt="">-->
<!--      <div>我的</div>-->
<!--    </div>-->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "TabBar"
}
</script>

<style scoped>
#tab-bar {
  /*display: flex;*/
  /*background-color: #f6f6f6;   !*组件背景*!*/
  /*height: 49px;*/
  /*position: fixed;*/
  /*left: 0;*/
  /*right: 0;*/
  /*bottom: 0px;  !* 设置在界面下面*!*/
  /*box-shadow: 0px -3px 1px rgba(100,100,100,.1);*/
  /*z-index: 10;*/
  display: flex;
  text-align: center;
  position: fixed;
  bottom: 0px;
  right: 0;
  left: 0;
  padding-top: 5px;
  box-shadow: 0px -1px 1px rgba(100,100,100,0.2);
  /*background-color: rgba(100,100,100,0.1);*/
  z-index: 9;
  background-color: #fff;
  height: 49px;
}
/*.tab-bar-item {*/
/*  flex: 1;      !*均等分*!*/
/*  text-align: center;  !* 居中*!*/
/*  height: 49px;  !*高度*!*/
/*  font-size: 14px;  !*字体大小*!*/
/*}*/
/*.tab-bar-item img {*/
/*  width: 24px;*/
/*  height: 24px;*/
/*  margin-top: 3px;  !*上下移动*!*/
/*  vertical-align: center; !*图片垂直对齐*!*/
/*}*/
</style>
