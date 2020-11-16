<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav"></detail-nav-bar>
    <scroll class="content" ref="scroll">
      <detail-swiper :top-images="topImages"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :param-info="paramInfo"></detail-param-info>
      <detail-comment-info :comment-info="commentInfo"></detail-comment-info>
      <goods-list :goods="recommends"></goods-list>
    </scroll>
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

import Scroll from "../../components/common/scroll/Scroll";
import GoodsList from "../../components/content/goods/GoodsList";

import {getDetail,Goods,Shop,GoodsParam,getRecommend} from "../../network/detail";
import {ItemImgListenerMinxin} from '../../common/mixin'
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
  },
  mixins:[ItemImgListenerMinxin],
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