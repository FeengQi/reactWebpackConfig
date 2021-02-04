module.exports = [
  {
    path: "/", //路径
    component: require("@/pages/index").default,
  },
  {
    path: "/", //路径
    exact: true, //是否精确匹配
    component: require("@/layouts/UserLayout").default, //要渲染的组件 @ src路径别名
    routes: [
      {
        name: "登录",
        path: "/user/login",
        component: require("@/pages/user/index").default,
      },
    ],
  },
];
