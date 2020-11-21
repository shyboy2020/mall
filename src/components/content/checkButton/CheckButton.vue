<template>
    <div class="check-button" :class="{check: isChecked}">
        <img src="../../../assets/img/cart/tick.svg" alt="">
    </div>
</template>

<script>
    export default {
        name: "CheckButton",
        props:{
            isChecked:{
                type:Boolean,
                default:false
            }
        }
    }
</script>

<style scoped>
    .check-button {
        /*background-color: #42b983;*/
        border-radius: 50%;
        border: 2px solid #999999;
    }
    .check {
        border-color: #42b983;
        background-color: #42b983;
    }

</style>