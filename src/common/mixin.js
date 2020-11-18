import {debounce} from "./utils";

export const ItemImgListenerMinxin = {
  methods:{

  },
  components:{

  },
  data(){
    return {
      itemImgListener:null
    }
  },
  mounted(){
    //监听item中图片加载完成
    const refresh = debounce(this.$refs.scroll.refresh,500)
    this.itemImgListener = () => {
      refresh()
    }
    this.$bus.$on('itemImgLoad',this.itemImgListener)
  }
}

//返回顶部
export const BBackTop = {
  data(){
    return {
      isShowBackTop:true,
      tabOffsetTop:0,
    }
  },
  methods:{
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
  }
}