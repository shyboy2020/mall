<template>
<!--  所有的item抖展示同一个图片，同一个文字-->
  <div class="tab-bar-item" @click="itemClick">
<!--    <img src="../../assets/IMG/tabbar/home.svg" alt="">-->
<!--    <div>首页</div>-->
    <div v-if="!isActive"><slot  name="item-icon"></slot></div>
    <div v-else><slot   name="item-icon-active"></slot></div>
    <div :style="activeStyle"><slot name="item-text"></slot></div>

  </div>
</template>

<script>
export default {
  name: "TabBarItem",
  props:{
    path:String,
    activecolor:{
      type: String,
      default: 'blue'
    }
  },
  data(){
    return {
      // isActive: true
    }
  },
  computed:{
    isActive() {
      return this.$route.path.indexOf(this.path) !==-1
    },
    activeStyle(){
      return this.isActive ? {color:this.activecolor} : {}
    }
  },
  methods: {
    itemClick (){
      this.$router.replace(this.path)
    }
  }
}


</script>

<style scoped>

.active {
  color: red;
}
.tab-bar-item {
  flex: 1;      /*均等分*/
  text-align: center;  /* 居中*/
  height: 40px;  /*高度*/
  font-size: 10px;  /*字体大小*/
}
.tab-bar-item img {
  width: 20px;
  height: 20px;
  margin-top: 3px;  /*上下移动*/
  vertical-align: center; /*图片垂直对齐*/
}
</style>


