import { StoreOptions } from "vuex";
import { UserControllerService } from "../../generated";
import ACCESS_ENUM from "@/access/accessEnum";

export default {
  namespaced: true,
  state: () => ({
    loginUser: {
      userName: "未登录",
    },
  }),
  actions: {
    async getLoginUser({ commit, state }, payload) {
      // 远程登录 从远程请求获取登录信息
      const res = await UserControllerService.getLoginUserUsingGet();
      if (res.code == 0) {
        commit("updateUser", res.data);
      } else {
        commit("updateUser", {
          ...state.loginUser,
          userRole: ACCESS_ENUM.NOT_LOGIN,
        });
      }
    },
  },
  mutations: {
    updateUser(state, payload) {
      // payload 用于外部传入参数
      state.loginUser = payload;
    },
  },
} as StoreOptions<any>;
