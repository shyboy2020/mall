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
    console.log('mixin ..');
  }
}