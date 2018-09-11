import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);
const state = {
    signIn: false, // 是否登录
    personData:{}, //个人信息
    appId:''
}
export default new Vuex.Store({
    state,
    getters: {
        isSignIn: state => {
            return state.signIn
        },
        getAppId:state =>{
            return state.appId
        },
        getPersonData: state => {
            return state.personData
        },
    },
    mutations: {
        setPersonData(state,value) {
            console.log(value);
            state.personData = value;
        },
        setAppId(state, value) {
            state.appId = value;
        }
    },
    actions: {
        AppId(context,value) {
            context.commit('setAppId',value)
        }
    }

});