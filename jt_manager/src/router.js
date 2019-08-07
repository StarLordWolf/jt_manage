import Vue from 'vue'
import Router from 'vue-router'
//管理员的引入
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: () => import('@/views/AdminLogin')
    },
    {
      path:"/sign",
      name:"sign",
      component:()=>import("@/views/ShopSign"),
    }
    // {
    //   path: "/main",
    //   component: () => import('@/views/AdminMain'),
    //   name: "main",
    //   children: [
    //     {
    //       path: "admin",
    //       meta: { title: "管理员管理" },
    //       name: "admin",
    //       component: () => import("@/views/admin/admin"),
    //       children: [
    //         {
    //           path: "passwordchange",
    //           name: "passwordChange",
    //           meta: { title: "修改密码" },
    //           component: () => import("@/views/admin/passwordChange")
    //         },
    //         {
    //           path: "adminmanage",
    //           meta: { title: "账号管理" },
    //           name: "adminManage",
    //           component: () => import("@/views/admin/adminManage")
    //         },
    //         {
    //           path: "secretmanage",
    //           name: "secretManage",
    //           meta: { title: "隐私管理" },
    //           component: () => import("@/views/admin/secretManage")
    //         }
    //       ]
    //     },
    //     {
    //       path: "shop",
    //       meta: { title: "店铺管理" },
    //       name: "shop",
    //       component: () => import("@/views/shop/shop"),
    //       children: [
    //         {
    //           path: "businessmanage",
    //           name: "businessManage",
    //           meta:{title:"商家管理"},
    //           component: () => import("@/views/shop/businessManage")
    //         },
    //         {
    //           path:"watermanage",
    //           name:"waterManage",
    //           meta:{title:"水司管理"},
    //           component:()=>import("@/views/shop/waterManage")
    //         }
    //       ]
    //     }
    //   ]
    // },
   
  ]
})

// [{path: "/main",component: () => import('@/views/AdminMain'),name: "main",children: [{path: "admin",meta: { title: "管理员管理" },name:"amain",component: () => import("@/views/admin/admin"),children: [{path: "passwordchange",name: "passwordchange",meta: { title: "修改密码" },component: () => import("@/views/admin/passwordChange")},{path: "adminmanage",meta: { title: "账号管理" },name: "adminmanage",component: () => import("@/views/admin/adminManage")},{path: "secretmanage",name: "secretmanage", meta: { title: "隐私管理" }, component: () => import("@/views/admin/secretManage")}]}] }]