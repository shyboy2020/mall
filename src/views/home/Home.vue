
<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @positionScroll="positionScroll"
            :pull-up-load="true" @loadMore="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tar-control class="tar-control"  :titles="['流行','新款','精选']" @tarClick="tarClick"></tar-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TarControl from "@/components/content/tabControl/TarControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "@/views/home/childComponents/HomeSwiper";
import RecommendView from "@/views/home/childComponents/RecommendView";
import FeatureView from "@/views/home/childComponents/FeatureView";

import {getHomeMultidata,getHomeGoods} from "../../network/home";



export default {
  name: "Home",
  components: {
    NavBar,
    TarControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop
  },
  data(){
    return {
      banners:[],
      recommends:[],
      goods:{
        'pop':{page:0 ,list:[]},
        'new':{page:0 ,list:[]},
        'sell':{page:0 ,list:[]}
      },
      currentType:'pop',
      isShowBackTop:true
    }
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //3.监听item中图片加载完成
    this.$bus.$on('itemImageLoad',() => {
      this.$refs.scroll.refresh()
    })
  },
  methods:{
    /**
     * 事件监听相关
     */
    tarClick(index){
      switch (index){
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    positionScroll(position){
      // console.log(position)
      this.isShowBackTop = (-position.y) > 1000
    },
    loadMore(){
      // console.log('上拉');
      this.getHomeGoods(this.currentType)

    },
    /**
     * 网络请求相关
     */
    getHomeMultidata () {
      getHomeMultidata().then(res => {
      // console.log(res);
      this.banners = res.data.banner.list
      this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods (type) {
      const page = this.goods[type].page + 1
      getHomeGoods(type,page).then(res => {
        // console.log(res);
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //监听下拉加载完成
        this.$refs.scroll.finishPullUp()
        // this.$refs.scroll.refresh()
      })
    }

  }
}
</script>

<style scoped>
  /*scoped表示样式只作用于当前组件*/
  #home {
    margin-top: 44px;
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: #42b983;
    color: white;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 10;
  }

  .tar-control {
    position: sticky; /* 粘性定位 */
    top: 44px;
    z-index: 10;
  }

  /*.content {*/
  /*  height: 500px*/
  /*}*/
  /*.content {*/
  /*  !*height: 500px;*!*/
  /*  overflow: hidden;*/
  /*  position: absolute;*/
  /*  top: 44px;*/
  /*  bottom: 49px;*/
  /*  left: 0;*/
  /*  right: 0;*/
  /*}*/
  .content {
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  }
</style>
