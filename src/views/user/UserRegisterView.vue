<template>
  <div class="userRegister">
    <h2>用户注册</h2>
    <a-form
      :model="form"
      @submit="handleSubmit"
      auto-label-width
      style="max-width: 480px; margin: 0 auto"
    >
      <a-form-item
        field="name"
        label="账户"
        show-colon="true"
        hide-asterisk="true"
      >
        <a-input v-model="form.userAccount" placeholder="请输入账户" />
      </a-form-item>
      <a-form-item
        field="post"
        label="密码"
        show-colon="true"
        hide-asterisk="true"
      >
        <a-input-password
          v-model="form.userPassword"
          placeholder="请输入密码"
        />
      </a-form-item>
      <a-form-item
        field="post"
        label="确认密码"
        show-colon="true"
        hide-asterisk="true"
      >
        <a-input-password
          v-model="form.checkPassword"
          placeholder="请再次输入密码"
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-row class="button-row" justify="space-around">
            <a-col :span="16">
              <div>
                <a-button
                  type="primary"
                  size="large"
                  style="width: 128px"
                  status="success"
                  href="/user/login"
                  >返回登录
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
                  >注册
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
import { UserControllerService, UserRegisterRequest } from "../../../generated";
import { useRouter } from "vue-router";
import message from "@arco-design/web-vue/es/message";

/**
 * 表单信息
 */
const form = reactive({
  userAccount: "",
  userPassword: "",
  checkPassword: "",
} as UserRegisterRequest);

const router = useRouter();
/**
 * 提交注册表单
 */
const handleSubmit = async () => {
  const res = await UserControllerService.userRegisterUsingPost(form);
  if (res.code == 0) {
    // 注册成功，跳转登录页
    router.push({
      path: "/user/login",
      replace: true,
    });
    message.success("注册成功");
  } else {
    message.error("注册失败，" + res.message);
  }
};
</script>
