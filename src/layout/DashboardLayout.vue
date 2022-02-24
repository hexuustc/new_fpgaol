<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
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
            path: '/icons',
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
            path: '/program',
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
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>
      <div @click="toggleSidebar">
        <!-- your content here -->
        <router-view></router-view>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
import DashboardNavbar from "./DashboardNavbar.vue";
import ContentFooter from "./ContentFooter.vue";

export default {
  components: {
    DashboardNavbar,
    ContentFooter,
  },
  data() {
    return {
      sidebarBackground: "vue", //vue|blue|orange|green|red|primary
    };
  },
  methods: {
    toggleSidebar() {
      if (this.$sidebar.showSidebar) {
        this.$sidebar.displaySidebar(false);
      }
    },
  },
};
</script>
<style lang="scss"></style>
