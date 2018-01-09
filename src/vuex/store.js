import Vue from 'vue';
import Vuex from 'vuex';
import cookie from  'vue-cookie'
Vue.use(Vuex);
Vue.use(cookie);
// 需要维护的状态
const state = {
  userInfo:{},
  adminLogin:''
};
var vm=this;
const mutations = {
  // 登陆
  LOG_IN(state, adminLogin){
    state.adminLogin=adminLogin;
  },
};
export default new Vuex.Store({
  state,
  mutations,
});