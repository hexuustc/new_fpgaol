<template>
  <base-nav
    class="navbar-top navbar-dark"
    id="navbar-main"
    :show-toggle-button="false"
    expand
  >
  
    <form
      class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto"
    >
      <div class="form-group mb-0">
        <base-input
          placeholder="Search"
          class="input-group-alternative"
          alternative=""
          addon-right-icon="fas fa-search"
        >
        </base-input>
      </div>
    </form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <template v-slot:title>
            <div class="media align-items-center">
              <span class="avatar avatar-sm rounded-circle">
                <img
                  alt="Image placeholder"
                  src="img/theme/FPGAOL_LOGO.png"
                />
              </span>
              <div class="media-body ml-2 d-none d-lg-block">
                <span class="mb-0 text-sm font-weight-bold">{{username}}</span>
              </div>
            </div>
          </template>
          <div class="dropdown-header noti-title">
            <h6 class="text-overflow m-0">Welcome!</h6>
          </div>
          <!-- <router-link to="/profile" class="dropdown-item">
            <i class="ni ni-single-02"></i>
            <span>My profile</span>
          </router-link> -->
          <!-- <router-link to="/profile" class="dropdown-item">
            <i class="ni ni-settings-gear-65"></i>
            <span>Settings</span>
          </router-link>
          <router-link to="/profile" class="dropdown-item">
            <i class="ni ni-calendar-grid-58"></i>
            <span>Activity</span>
          </router-link>
          <router-link to="/profile" class="dropdown-item">
            <i class="ni ni-support-16"></i>
            <span>Support</span>
          </router-link> -->
          <div class="dropdown-divider"></div>
          <div class="dropdown-item" @click="logout">
            <i class="ni ni-user-run"></i>
            <span>Logout</span>
          </div>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<script>

import axios from 'axios';
var form = new FormData();

export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      res:{},
      username:"Jessica Jones"
    };
  },
  mounted () {
    let token = localStorage.getItem('Authorization');
    let userdata = localStorage.getItem('userdata');
    form.append('token', token)
    axios
     .post('http://202.38.79.96:9001/profile',form)
     .then(response => (
         console.log(response.data),
         this.res = response.data,
         this.test()
     ))
  },
  methods: {
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },
    logout(){
      localStorage.removeItem('Authorization');
      localStorage.removeItem('userdata');
      this.$router.push('/login');
      axios
     .get('http://202.38.79.96:9003/sso/logout?username='+this.username)
     .then(response => (
         console.log("logout: ",response.data)
         //this.$router.push('/login')
     ))
    },
    test(){
        if (this.res['code']==1){
          this.username=this.res['username'];
          this.$store.commit('setusername', this.username);
        }
        else{
          this.logout()
        }
    }
  },
};
</script>
