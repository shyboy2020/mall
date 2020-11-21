import Vue from 'vue'
import Vuex from 'vuex'
import mutations from "./mutations";
import actions from "./actions";
import getters from "./getters";
//1.安装插件
Vue.use(Vuex)

//2.创建stroe对象

const state = {
    cartList:[]
}
const store = new Vuex.Store({
    state,
    mutations, //mutations是为了修改state的状态,m中的方法要尽量单一,不要有太多逻辑代码,用commit传
    actions, //actions中放异步,逻辑性强的方法,尽量不修改state,用dispatch传
    getters
})

export default store