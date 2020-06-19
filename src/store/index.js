/*引用vue和vuex*/
import Vue from 'vue'
import Vuex from 'vuex';
Vue.use(Vuex)

/*设置state参数*/
const state = {
    childText2: '',
    childText: "",
    txtArr: []
}

const mutations = {
    changeChildText(state, str) {
        state.childText = str;
        state.txtArr.push(str)
    }

}
const actions = {
    increment(context) {
        context.commit('increment')
    }
}
const store = new Vuex.Store({
    state: state,
    mutations: mutations,
    actions: actions
})

export default store;    