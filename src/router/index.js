import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/home",
      component: () => import("@/pages/Home/Home")
    },
    {
      path: "/login",
      component: () => import("@/pages/Login/Login")
    },
    {
      path: "/menu",
      component: () => import("@/pages/Menu/Menu")
    },
    {
      path: "/menuadd",
      component: () => import("@/pages/Menu/Menuadd")
    },
    {
      path: "/menuedit",
      component: () => import("@/pages/Menu/Menuadd")
    },
    {
      path: "/role",
      component: () => import("@/pages/Role/Role")
    },
    {
      path: "/roleadd",
      component: () => import("@/pages/Role/Roleadd")
    },
    {
      path: "/roleedit",
      component: () => import("@/pages/Role/Roleadd")
    },
    {
      path: "/user",
      component: () => import("@/pages/User/User")
    },
    {
      path: "/useradd",
      component: () => import("@/pages/User/Useradd")
    },
    {
      path: "/useredit",
      component: () => import("@/pages/User/Useradd")
    },
    {
      path: "/cate",
      component: () => import("@/pages/Cate/Cate")
    },
    {
      path: "/cateadd",
      component: () => import("@/pages/Cate/Cateadd")
    },
    {
      path: "/cateedit",
      component: () => import("@/pages/Cate/Cateadd")
    },
    {
      path: "/specs",
      component: () => import("@/pages/Specs/Specs")
    },
    {
      path: "/specsadd",
      component: () => import("@/pages/Specs/Specsadd")
    },
    {
      path: "/specsedit",
      component: () => import("@/pages/Specs/Specsadd")
    },
    {
      path: "/goods",
      component: () => import("@/pages/Goods/Goods")
    },
    {
      path: "/goodsadd",
      component: () => import("@/pages/Goods/Goodsadd")
    },
    {
      path: "/goodsedit",
      component: () => import("@/pages/Goods/Goodsadd")
    }
  ]
})
