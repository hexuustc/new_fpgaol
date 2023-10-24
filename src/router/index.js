import { createRouter, createWebHashHistory } from "vue-router";

import DashboardLayout from "@/layout/DashboardLayout";
import AuthLayout from "@/layout/AuthLayout";

import Dashboard from "../views/Dashboard.vue";
import Icons from "../views/Icons.vue";
import Maps from "../views/Maps.vue";
import Profile from "../views/UserProfile.vue";
import Tables from "../views/Tables.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";
import Program from "../views/Program.vue";
import Program2 from "../views/Program2.vue";
import Compile from "../views/Compile.vue";
import CreateProject from "../views/CreateProject.vue";
import CodeEdit from "../views/CodeEdit.vue";


import Login from "../views/Login.vue";
// import Register from "../views/Register.vue";
import Caslogin from "../views/Caslogin.vue";

const routes = [
  {
    path: "/",
    redirect: "/program2",
    component: DashboardLayout,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        components: { default: Dashboard },
      },
      {
        path: "/icons",
        name: "icons",
        components: { default: Icons },
      },
      {
        path: "/maps",
        name: "maps",
        components: { default: Maps },
      },
      {
        path: "/profile",
        name: "profile",
        components: { default: Profile },
      },
      {
        path: "/tables",
        name: "tables",
        components: { default: Tables },
      },
      {
        path: "/about",
        name: "about",
        components: { default: About },
      },
      {
        path: "/home",
        name: "home",
        components: { default: Home },
      },
      {
        path: "/program",
        name: "program",
        components: { default: Program },
      },
      {
        path: "/program2",
        name: "program2",
        components: { default: Program2 },
      },
      {
        path: "/compile",
        name: "compile",
        components: { default: Compile },
      },
      {
        path: "/createproject",
        name: "createproject",
        components: { default: CreateProject },
      },
      {
        path: "/codeedit",
        name: "codeedit",
        components: { default: CodeEdit },
      },
    ],
  },
  {
    path: "/",
    redirect: "login",
    component: AuthLayout,
    children: [
      {
        path: "/login",
        name: "login",
        components: { default: Login },
      },
      // {
      //   path: "/register",
      //   name: "register",
      //   components: { default: Register },
      // },
    ],
  },
  {
    path: "/caslogin",
    name: "caslogin",
    components: { default: Caslogin },
  },

];


const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: "active",
  routes,
});

router.beforeEach((to, from, next) => {
  if ((to.path == '/login') || (to.path == '/caslogin')) {
    console.log("I am in this");
    next();
  } else {
    let token = localStorage.getItem('Authorization');
 
    if (token == null || token == '') {
      console.log(window.location.search)
      if (window.location.search) next("/caslogin");
      else next('/login');
    } else {
      next();
    }
  }
})

export default router;
