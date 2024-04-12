<template>
  <div class="userLogin">
    <h2>用户登录</h2>
    <a-form
      :model="form"
      @submit="handleSubmit"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
    >
      <a-form-item field="name" label="账户" show-colon="true">
        <a-input v-model="form.userAccount" placeholder="请输入账户" />
      </a-form-item>
      <a-form-item field="post" label="密码" show-colon="true">
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-row class="grid-demo" justify="space-around">
            <a-col :span="16">
              <div>
                <a-button
                  type="primary"
                  size="large"
                  style="width: 128px"
                  status="success"
                  href="/user/register"
                  >注册
                </a-button>
              </div>
            </a-col>
            <a-col :span="4">
              <div>
                <a-button
                  type="primary"
                  size="large"
                  style="width: 128px"
                  status="success"
                  html-type="submit"
                  >登录
                </a-button>
              </div>
            </a-col>
          </a-row>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
</template>
<style></style>
<script setup lang="ts">
import { reactive } from "vue";
import { UserControllerService, UserLoginRequest } from "../../../generated";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";
import { useStore } from "vuex";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
} as UserLoginRequest);

const router = useRouter();
const store = useStore();
/**
 * 提交表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userLoginUsingPost(form);
  if (res.code == 0) {
    // 记录登录态
    await store.dispatch("user/getLoginUser");
    // 登录成功，跳转到主页
    router.push({
      path: "/",
      replace: true,
    });
    message.success("登录成功");
  } else {
    message.error("登录失败，" + res.message);
  }
};
</script>
