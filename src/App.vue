<template>
  <div id="app">
    <div v-if="route.fullPath.startsWith('/user')">
      <router-view />
    </div>
    <div v-else>
      <BasicLayout />
    </div>
  </div>
</template>

<style>
#app {
}
</style>
<script setup lang="ts">
import BasicLayout from "@/layouts/BasicLayout.vue";
import { useRoute } from "vue-router";
import { onMounted } from "vue";

const route = useRoute();

/**
 * 全局初始化函数，有全局单次调用的代码，都可以写在这里
 */
const doInit = () => {
  console.log("hello 欢迎来到我的i昂木");
};

onMounted(() => {
  doInit();
});
</script>
