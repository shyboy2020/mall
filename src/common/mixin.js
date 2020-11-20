import {debounce} from "./utils";
import BackTop from "@/components/content/backTop/BackTop";

export const ItemImgListenerMixin = {
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
export const BackTopMixin = {
  components: {
    BackTop
  },
  data(){
    return {
      isShowBackTop:false,
    }
  },
  methods: {
    backClick() {
      this.$refs.scroll.scrollTo(0,0,500)
    }
  }
}