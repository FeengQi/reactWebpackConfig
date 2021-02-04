module.exports = [
  {
    path: "/",
    component: require("@/pages/index").default,
  },
  {
    path: "/",
    exact: true,
    component: require("@/layouts/UserLayout").default,
    routes: [
      {
        name: "登录",
        path: "/user/login",
        component: require("@/pages/user/index").default,
      },
    ],
  },
];
