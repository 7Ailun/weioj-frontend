<template>
  <div id="userLayout">
    <a-layout style="min-height: 100vh">
      <a-layout-header class="header">
        <a-space>
          <img class="logo" src="../assets/oj-logo.svg" alt="图片加载失败" />
          <div class="title">艾伦OJ判题平台</div>
        </a-space>
      </a-layout-header>
      <a-layout-content class="content">
        <router-view />
      </a-layout-content>
      <a-layout-footer class="footer">
        <a href="https://www.yuque.com/yuhangyuan-vp13i" target="_blank">
          艾伦的语雀知识库
        </a>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
#userLayout {
  text-align: center;
  background: url("../assets/login.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}

#userLayout .logo {
  width: 64px;
  height: 64px;
}

#userLayout .title {
  font-size: 28px;
  color: #444444;
  font-family: 楷体, serif;
}

#userLayout .header {
  margin-bottom: 16px;
  text-align: center;
  margin-top: 16px;
}

#userLayout .content {
  margin-bottom: 16px;
  padding: 16px;
}

#userLayout .footer {
  padding: 16px;
  position: sticky;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
}
</style>
