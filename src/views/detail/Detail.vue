<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick"></detail-nav-bar>
    <scroll class="content" ref="scroll"  :probe-type="3" @positionScroll="positionScroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop" ></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info ref="param" :param-info="paramInfo"></detail-param-info>
      <detail-comment-info ref="comment" :comment-info="commentInfo"></detail-comment-info>
      <goods-list ref="recommend" :goods="recommends"></goods-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
import DetailNavBar from "./childComponents/DetailNavBar";
import DetailSwiper from "./childComponents/DetailSwiper";
import DetailBaseInfo from "./childComponents/DetailBaseInfo";
import DetailShopInfo from "./childComponents/DetailShopInfo";
import DetailGoodsInfo from "./childComponents/DetailGoodsInfo";
import DetailParamInfo from "./childComponents/DetailParamInfo";
import DetailCommentInfo from "./childComponents/DetailCommentInfo";
import BackTop from '@/components/content/backTop/BackTop'

import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
import {ItemImgListenerMinxin,BBackTop} from '../../common/mixin'
import {debounce} from "../../common/utils";

export default {
  name: "Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    GoodsList,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    BackTop
  },
  mixins:[ItemImgListenerMinxin,BBackTop],
  data(){
    return {
      iid:null,
      topImages:[],
      goods:{},
      shop:{},
      detailInfo:{},
      paramInfo:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[]
    }
  },
  created() {
    // console.log(this.$route.params);
    //保存传入的iid
    this.iid = this.$route.params.iid
    //根据iid请求详细数据
    getDetail(this.iid).then(res => {
      //获取顶部轮播图数据
      // console.log(res);
      const data = res.result
      this.topImages = data.itemInfo.topImages

      //获取商品信息
      this.goods = new Goods(data.itemInfo,data.columns,data.shopInfo)

      //获取商家信息
      this.shop = new Shop(data.shopInfo)

      //保存商品的详细数据
      this.detailInfo = data.detailInfo
      //获取参数的信息

      this.paramInfo = new GoodsParam(data.itemParams.info,data.itemParams.rule)

      //获取评论信息
      if (data.rate.cRate != 0){
        this.commentInfo = data.rate.list[0]
      }
      //获取完所有详细数据后的下一帧，将参数，评论的相对位置传给themeTopYs
      // this.$nextTick(() => {
      //   //DOM已经渲染完成，但是图片没有加载完成，导致获取的相对位置有误差
      //   // this.themeTopYs = []
      //   this.themeTopYs.push(0)
      //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      //   this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      //   // console.log(this.themeTopYs);
      // })
    })

    //请求推荐数据
    getRecommend().then(res => {
      console.log(res);
      this.recommends = res.data.list
    })
  },
  mounted() {

  },
  destroyed() {
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  },
  methods:{
    imageLoad(){
      this.$refs.scroll.refresh()
      this.themeTopYs = []
      this.themeTopYs.push(0)
      this.themeTopYs.push(this.$refs.param.$el.offsetTop)
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
      console.log(this.themeTopYs)
    },
    titleClick(index){
      // console.log(index);
      // 1.用switch方法
      // switch (index){
      //   case 0:
      //     this.$refs.scroll.scrollTo(0,0,300)
      //     break
      //   case 1:
      //     this.$refs.scroll.scrollTo(0,-this.$refs.param.$el.offsetTop,300)
      //     console.log(this.$refs.param.$el.offsetTop);
      //     break
      //   case 2:
      //     this.$refs.scroll.scrollTo(0,-this.$refs.comment.$el.offsetTop,300)
      //     console.log(this.$refs.comment.$el.offsetTop);
      //     break
      //   case 3:
      //     this.$refs.scroll.scrollTo(0,-this.$refs.recommend.$el.offsetTop,300)
      //     console.log(this.$refs.recommend.$el.offsetTop);
      // }
      this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],300)
    }
  }
}
</script>

<style scoped>
  #detail {
    height: 100vh;
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .detail-nav {
    position: relative;
    z-index: 10;
    background-color: #fff;
  }

  .content {
    height: calc(100% - 44px);
  }
</style>