<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{length}})</div>
    </nav-bar>
    <scroll class="content" ref="scroll">
      <cart-list></cart-list>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import NavBar from "../../components/common/navbar/NavBar";
  import CartList from "./childComponents/CartList";
  import CartBottomBar from "./childComponents/CartBottomBar";

  import Scroll from "../../components/common/scroll/Scroll";
  import {mapGetters} from 'vuex'

  export default {
    name: "Cart",
    components:{
      NavBar,
      CartList,
      Scroll,
      CartBottomBar
    },
    computed:{
      //两种写法
      // ...mapGetters(["cartLength"])  映射getters中的属性
      ...mapGetters({
        length:'cartLength'
      })
    },
    activated() {
      this.$refs.scroll.refresh()
    }
  }
</script>

<style scoped>
  .cart {
    height: 100vh;
  }

  .nav-bar {
    background: #42b983;
    color: #ffffff;
  }
  .content{
    height: calc(100% - 133px);
    overflow: hidden;
  }
</style>
