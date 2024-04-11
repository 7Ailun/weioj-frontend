<template>
  <div id="globalHeader">
    <a-row class="grid-demo" style="margin-bottom: 16px" align="center">
      <a-col flex="auto">
        <a-menu
          mode="horizontal"
          :selected-keys="selectedKeys"
          @menu-item-click="doMenuClick"
        >
          <a-menu-item
            key="0"
            :style="{ padding: 0, marginRight: '38px' }"
            disabled
          >
            <div class="title-bar">
              <img class="logo" src="../assets/oj-logo.svg" alt="失败" />
              <div class="title">艾伦OJ判题平台</div>
            </div>
          </a-menu-item>
          <a-menu-item v-for="item in routes" :key="item.path">
            {{ item.name }}
          </a-menu-item>
        </a-menu>
      </a-col>
      <div>
        {{ store.state.user?.loginUser?.userName ?? "未登录" }}
      </div>
      <a-col flex="100px"></a-col>
    </a-row>
  </div>
</template>
<script setup lang="ts">
import { routes } from "@/router/routes";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const router = useRouter();

// 默认主页
const selectedKeys = ref(["/"]);

// 设置 三秒后自动更新用户数据
/*setTimeout(() => {
  store.dispatch("user/getLoginUser", {
    userName: "艾伦",
    role: "admin",
  });
}, 3000);*/

// 路由跳转后，更新路由
router.afterEach((to, from, failure) => {
  selectedKeys.value = [to.path];
});
const doMenuClick = (key: string) => {
  router.push({
    path: key,
  });
};
</script>
<style scoped>
.title-bar {
  display: flex;
  align-items: center;
}

.title {
  font-size: large;
  color: #444;
  margin-left: 16px;
}

.logo {
  height: 48px;
}
</style>
