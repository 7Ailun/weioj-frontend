import { RouteRecordRaw } from "vue-router";
import UserLayout from "@/layouts/UserLayout.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import ExampleView from "@/views/ExampleView.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import ManageQuestionView from "@/views/question/ManageQuestionView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    meta: {
      hideInMenu: true,
    },
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/add/question",
    name: "新增题目",
    component: AddQuestionView,
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: ManageQuestionView,
  },
  {
    path: "/update/question",
    name: "更新题目",
    component: AddQuestionView,
  },
  {
    path: "/",
    name: "浏览题目",
    component: ExampleView,
  },
  {
    path: "/hide",
    name: "隐藏页面",
    component: ExampleView,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/admin",
    name: "管理员页面",
    component: AdminView,
    meta: {
      access: "admin",
    },
  },
  {
    path: "/noAuth",
    name: "无权限",
    component: NoAuthView,

    meta: {
      hideInMenu: true,
    },
  },
  {
    path: "/about",
    name: "关于我的",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },
];
