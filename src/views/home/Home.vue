
<template>
  <div id="home" class="wrapper">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control  :titles="['流行','新款','精选']"
                  @tabClick="tabClick"
                  ref="tabControl1"
                  class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content"
            ref="scroll"
            :probe-type="3"
            @positionScroll="positionScroll"
            :pull-up-load="true" @loadMore="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control  :titles="['流行','新款','精选']"
                    @tabClick="tabClick"
                    ref="tabControl2"></tab-control>
      <goods-list :goods="showGoods"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar";
import TabControl from "@/components/content/tabControl/TabControl";
import GoodsList from "@/components/content/goods/GoodsList";
import Scroll from "@/components/common/scroll/Scroll";
import BackTop from "@/components/content/backTop/BackTop";

import HomeSwiper from "@/views/home/childComponents/HomeSwiper";
import RecommendView from "@/views/home/childComponents/RecommendView";
import FeatureView from "@/views/home/childComponents/FeatureView";

import {getHomeMultidata,getHomeGoods} from "../../network/home";
import {ItemImgListenerMinxin} from '../../common/mixin'
import {debounce} from "../../common/utils";


export default {
  name: "Home",
  components: {
    NavBar,
    TabControl,
    GoodsList,
    HomeSwiper,
    RecommendView,
    FeatureView,
    Scroll,
    BackTop
  },
  mixins:[ItemImgListenerMinxin],
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
      isShowBackTop:true,
      tabOffsetTop:0,
      isTabFixed:false,
      saveY:0,
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
  },
  activated() {
    this.$refs.scroll.scrollTo(0,this.saveY,0)
    this.$refs.scroll.refresh()
  },
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  methods:{
    /**
     * 事件监听相关
     */

    tabClick(index){
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
      this.$refs.tabControl1.currentIndex = index
      this.$refs.tabControl2.currentIndex = index
    },
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    },
    positionScroll(position){
      // console.log(position)
      //1.判断BackTop是否显示
      this.isShowBackTop = (-position.y) > 1000
      //2.决定TabControl是否吸顶
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    loadMore(){
      // console.log('上拉');
      this.getHomeGoods(this.currentType)

    },
    swiperImageLoad(){
      //$el保存的是组件元素
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
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
        // this.$refs.scroll.finishPullUp()
        // this.$refs.scroll.refresh()
      })
    }

  }
}
</script>

<style scoped>
  /*scoped表示样式只作用于当前组件*/
  #home {
    /*margin-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: #42b983;
    color: white;
    /*position: fixed;*/
    /*left: 0;*/
    /*right: 0;*/
    /*top: 0;*/
    /*z-index: 10;*/
  }
  .tab-control {
    position: relative;
    z-index: 9;
  }

  /*.content {*/
  /*  height: 500px*/
  /*}*/
  .content {
    /*height: 500px;*/
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  /*.content {*/
  /*  height: calc(100% - 93px);*/
  /*  overflow: hidden;*/
  /*  margin-top: 44px;*/
  /*}*/
</style>
