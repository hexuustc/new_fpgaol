<template>
  <div class="row justify-content-center">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent pb-5">
          <div class="text-muted text-center mt-2 mb-3">
            <small>Sign in with</small>
          </div>
          <div class="btn-wrapper text-center">
            <a :href="login_href"  class="btn btn-neutral btn-icon">
              <span class="btn-inner--icon"
                ><img src="img/icons/common/fpgaol.svg"
              /></span>
              <span class="btn-inner--text">统一认证登录</span>
            </a>
          </div>
        </div>
        <!-- <div class="card-body px-lg-5 py-lg-5">
          <div class="text-center text-muted mb-4">
            <small>Or 游客访问</small>
          </div>
          <div class="btn-wrapper text-center">
            <a :href="login_href"  class="btn btn-neutral btn-icon">
              <i class="ni ni-single-02"></i>
              <span class="btn-inner--text">游客访问</span>
            </a>
          </div>
          <form role="form">
            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Email"
              addon-left-icon="ni ni-email-83"
              v-model="model.email"
            >
            </base-input>

            <base-input
              formClasses="input-group-alternative mb-3"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            >
            </base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <base-button type="primary" class="my-4">Sign in</base-button>
            </div>
          </form>
        </div> -->
      </div>
      <!-- <div class="row mt-3">
        <div class="col-6">
          <a href="#" class="text-light"><small>Forgot password?</small></a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/register" class="text-light"
            ><small>Create new account</small></router-link
          >
        </div>
      </div> -->
    </div>
  </div>
</template>
<script>
export default {
  name: "login",
  data() {
    return {
      model: {
        email: "",
        password: "",
      },
      login_href:"#"
    };
  },
  mounted(){
    //this.login_href="http://cdacount.cdinfotech.top/admin/login?redirect="+window.location.origin+"#/caslogin"
    //this.login_href="http://202.38.79.96:9003/admin/login?redirect="+window.location.origin+"#/caslogin"
    this.login_href="https://fpgaol.ustc.edu.cn/uniauth/admin/login?redirect="+window.location.origin+"#/caslogin"
    let token = localStorage.getItem('Authorization');
    if(token) this.$router.push('/program2');
  }
};
</script>
<style></style>
