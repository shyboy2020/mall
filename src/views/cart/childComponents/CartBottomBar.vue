<template>
    <div class="bottom-bar">
        <div class="check-all">
            <check-button class="check-button"
                          :is-checked="isCheckAll" @click.native="checkClick"/>
            <span>全选</span>
        </div>
        <span class="price">合计:{{totalPrice}}</span>
        <div class="calculate" @click="calcClick">
            结算:{{checkLength}}
        </div>
    </div>
</template>

<script>
    import CheckButton from "../../../components/content/checkButton/CheckButton";
    import {mapGetters} from 'vuex'
    export default {
        name: "CartBottomBar",
        components:{
            CheckButton
        },
        computed:{
            ...mapGetters(["cartList"]),
            totalPrice(){
                return '￥' + this.cartList.filter(item => {
                    return item.checked
                }).reduce((preValue,item) => {
                    return preValue + item.price * item.count
                },0).toFixed(2)
            },
            checkLength(){
                return this.cartList.filter(item => item.checked).length
            },
            isCheckAll(){
                if (!this.cartList.length) return false
                return !this.cartList.find(item => !item.checked)
            }
        },
        methods:{
            checkClick(){
                if (this.isCheckAll){
                    this.cartList.map(item => item.checked = false)
                } else {this.cartList.map(item => item.checked = true)}
            },
            calcClick(){
                if (!this.checkLength){
                    this.$toast.show('请先添加商品！！')
                }
            }
        }
    }
</script>

<style scoped>
    .bottom-bar {
        display: flex;
        position: relative;
        background-color: #cccccc;
        height: 40px;
        line-height: 40px;
        font-size: 15px;
    }
    .check-all {
        display: flex;
        align-items: center;
        margin-left: 10px;
    }
    .check-button {
        width: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }
    .price {
        margin-left: 20px;
    }

    .calculate {
        background-color:#42b983;
        width: 100px;
        margin-left: auto;
        text-align: center;
        color: #f2f5f8;
    }
</style>