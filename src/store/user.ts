import { StoreOptions } from "vuex";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    getLoginUser({ commit, state }, payload) {
      commit("updateUser", { userName: "艾伦" }); // 提交出发 updateUser函数
    },
  },
  mutations: {
    updateUser(state, payload) {
      // payload 用于外部传入参数
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
