import {ADD_COUNTER,ADD_TO_CART} from "./mutations-types";

export default {
    addCart(context,payload){
        //payload新添加的商品
        // let oldProduct = null;
        // for (let item of state.cartList){
        //     if (item.iid === payload.iid){
        //         oldProduct = item
        //     }
        // }
        return new Promise((resolve,reject) => {
            //1.判断store中是否存在
            let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)
            //2.判断oldProduct
            if (oldProduct){  //数量+1
                // oldProduct.count += 1
                context.commit(ADD_COUNTER,oldProduct)
                resolve('当前商品数量+1')
            }else {           // 添加新商品
                payload.count = 1
                // context.cartList.push(payload)
                context.commit(ADD_TO_CART,payload)
                resolve('添加新的商品')
            }
        })

    }
}