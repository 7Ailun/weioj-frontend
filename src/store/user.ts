import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
      role: "notLogin",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      // todo 修改为远程登录 从远程请求获取登录信息
      commit("updateUser", { userName: "艾伦" }); // 提交触发 updateUser函数
    },
  },
  mutations: {
    updateUser(state, payload) {
      // payload 用于外部传入参数
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
