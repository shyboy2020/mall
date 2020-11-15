<template>
  <div class="wrapper" ref="out">
    <ul class="content">
      <li><h2>这次你离开了没有说再见，再见也他妈的只是再见</h2>
        ——《 山阴路的夏天 》</li>
      <li><h2>再见吧，再见，我的爱人，今夜不要和我说话</h2>
        ——《 冬妮娅 》</li>
      <li><h2>我整夜整夜地失眠，不是为了和谁再相见</h2>
        ——《 寻找 》</li>
      <li><h2>莫名其妙的情绪从山顶上飘过来</h2>
        ——《 尽头 》</li>
      <li><h2>港岛妹妹，你献给我的西班牙馅饼甜蜜地融化了我，天空之城在哭泣</h2>
        ——《 天空之城 》</li>
      <li><h2>什么时候遇见你，什么时候失去你，我就像喝多了酒十八岁的忧愁</h2>
        ——《 铅笔 》</li>
      <li><h2>妈妈，我居然爱上了她，像歌唱一样就爱上了她</h2>
        ——《 山阴路的夏天 》</li>
      <li><h2>多想和你一样臭不要脸，墨镜和表情都挂在脸上</h2>
        ——《 定西 》</li>
<!--      1.无论是否设置click:false,button都可以点击-->
      <button @click="btnClick">自由</button>
<!--      2.必须设置click:true,div才能监听-->
      <div @click="divClick">民主</div>
      <div>test</div>
    </ul>
  </div>

</template>

<script>
import BScroll from 'better-scroll'

export default {
  name: "Category",
  data() {
    return {
      scroll:null
    }
  },
  mounted() {
    // console.log(this.$refs.out)
    // console.log(document.querySelector('.wrapper'))
    //probeType侦测滑动
    //默认0，1不侦测实时位置，2滑动离开后不侦测，3一直侦测
    this.scroll = new BScroll('.wrapper',{
      probeType:3,
      pullUpLoad:true,
      click:true  //使content中的div能被点击监听
    })
    this.scroll.on('scroll',(position) => {
      // console.log(position);
    })
    this.scroll.on('pullingUp',() => {
      console.log('上拉');
    })
  },
  methods:{
    btnClick(){
      console.log('btn');
    },
    divClick(){
      console.log('div');
    },
  }
}
</script>

<style scoped>
  .wrapper {
    height: 400px;
    background-color: darkorange;
    color: white;
    overflow: hidden;
    /*overflow: scroll;*/
  }
</style>
