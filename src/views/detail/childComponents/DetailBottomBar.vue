<template>
    <div class="bottom-bar">
        <div class="bar-item bar-left">
            <div>
                <i class="icon service"></i>
                <span class="text">客服</span>
            </div>
            <div>
                <i class="icon shop"></i>
                <span class="text">店铺</span>
            </div>
            <div>
                <i class="icon select"></i>
                <span class="text">收藏</span>
            </div>
        </div>
        <div class="bar-item bar-right">
            <div class="cart" @click="cartClick">加入购物车</div>
            <div class="buy">购买</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBottomBar",
        methods:{
            cartClick(){
                this.$emit('cartClick')
            }
        }
    }
</script>

<style scoped>
    .bottom-bar {
        height: 49px;
        background-color: #ffffff;

        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        /*bottom: 49px;*/

        display: flex;
        text-align: center;
    }
    .bar-item {
        flex: 1;
        display: flex;
    }

    .bar-item>div {
        flex: 1;
    }

    .bar-left .text {
        font-size: 13px;
    }

    .bar-left .icon {
        display: block;
        width: 20px;
        height: 20px;
        margin: 6px auto 3px;
        background: url("../../../assets/img/detail/detail_bottom.png") 0 0/100%;
    }

    .bar-left .service {
        background-position: 0 88px;
    }
    .bar-left .shop {
        background-position: 0 -90px;
    }
    .bar-right {
        font-size: 15px;
        color: #ffffff;
        line-height: 53px;
    }

    .bar-right .cart {
        background-color: #ffe817;
        color: #333333;
    }
    .bar-right .buy {
        background-color: #f69;
    }
</style>