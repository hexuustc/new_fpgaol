<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
      v-if="expand_sidebar"
    >
      <template v-slot:links>
        <sidebar-item
          :link="{
            name: '建立工程',
            icon: 'ni ni-tv-2 text-primary',
            path: '/createproject',
          }"
        />

        <sidebar-item
          :link="{
            name: '文件编辑',
            icon: 'ni ni-planet text-blue',
            path: '/codeedit',
          }"
        />
        <sidebar-item
          :link="{
            name: '工程编译',
            icon: 'ni ni-pin-3 text-orange',
            path: '/compile',
          }"
        />
        <sidebar-item
          :link="{
            name: '工程烧写',
            icon: 'ni ni-single-02 text-yellow',
            path: '/program2',
          }"
        />
        <sidebar-item
          :link="{
            name: '文档',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/about',
          }"
        />
        <sidebar-item
          :link="{
            name: '下载',
            icon: 'ni ni-key-25 text-info',
            path: '/home',
          }"
        />
        <sidebar-item
          :link="{
            name: 'Register',
            icon: 'ni ni-circle-08 text-pink',
            path: '/register',
          }"
        />
        <sidebar-item
          :link="{
            name: 'dashboard',
            icon: 'fa fa-solid fa-arrow-right text-red',
            path: '/dashboard',
          }"
        /><sidebar-item
          :link="{
            name: 'icons',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/icons',
          }"
        /><sidebar-item
          :link="{
            name: 'maps',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/maps',
          }"
        /><sidebar-item
          :link="{
            name: 'tables',
            icon: 'ni ni-bullet-list-67 text-red',
            path: '/tables',
          }"
        />
        <button class="toggle-btn text-info" @click="toggleSidebar">
          <i class="ni ni-bold-left"></i> <!-- 使用 Font Awesome 的箭头图标 -->
        </button>
      </template>
    </side-bar>
<div v-if="!expand_sidebar" class="show-sidebar-btn text-info" @click="toggleSidebar">
  <i class="ni ni-bold-right"></i>
</div>
<div v-if="false" class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white">
    <el-radio-group  v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu  default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
      <el-submenu index="1">
        <template v-slot:title>
          <i class="el-icon-location"></i>
          <span >导航一</span>
        </template>
        <el-menu-item-group>
          <span >分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span >选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span >导航二</span>
      </el-menu-item>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document"></i>
        <span >导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting"></i>
        <span >导航四</span>
      </el-menu-item>
    </el-menu>
</div>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <div>
        <!-- your content here -->
        <router-view></router-view>
        <!-- <content-footer v-if="!$route.meta.hideFooter"></content-footer> -->
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
//import ContentFooter from "./ContentFooter.vue";
//import SideBar from "../components/SidebarPlugin/SideBar.vue";

export default {
  components: {
    DashboardNavbar,
    //ContentFooter,
    //SideBar,
  },
  data() {
    return {
      sidebarBackground: "red", //vue|blue|orange|green|red|primary
      expand_sidebar: true,
      isCollapse: true
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
      this.expand_sidebar = !this.expand_sidebar;
    },
    handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
  },
  rules: {
    'vue/no-deprecated-slot-attribute': 'off',
  }
};
</script>
<style lang="scss">
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
.toggle-btn, .show-sidebar-btn {
  position: fixed;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: rgba(225, 255, 255, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  outline: none;
  z-index: 1000;
}

.toggle-btn {
  left: 220px;
  top: 50%;
  transform: translateY(-50%);
}

.show-sidebar-btn {
  left: 0;
  top: 50%;
  transform: translateY(-50%);
}


</style>
