<template>
  <div class="tar-control">
    <div class="tar-control-item" v-for="(item,index) in titles"
    :class="{active: index === currentIndex}" @click="tarClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TarControl",
  props:{
    titles:{
      type:Array,
      default(){
        return []
      }
    }
  },
  data (){
    return {
      currentIndex:0
    }
  },
  methods:{
    tarClick(index){
      this.currentIndex = index
      this.$emit('tarClick',index)
    }
  }
}
</script>

<style scoped>

  .active {
    color: var(--color-high-text)
  }
  .active span {
    border-bottom: 3px solid var(--color-tint);
  }

  .tar-control {
    display: flex;
    text-align: center;
    font-size: 15px;
    height: 40px;
    line-height: 40px;
    background-color: white;
  }

  .tar-control-item {
    flex: 1;
  }
  .tar-control-item span {
    padding: 5px;
  }
</style>