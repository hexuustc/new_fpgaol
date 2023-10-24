<template>
 <div>
    <!-- hhhhhh -->
 </div>
 <!-- <div>
    {{con}}
 </div> -->
 <!-- <div>
    {{username}}
 </div> -->
</template>

<script>
import axios from 'axios';
var form = new FormData();


  export default {
      data() {
    return {
      con : "hhh",
      username:"test",
      token: "",
      code:0,
      data:{}
    };
  },
      mounted:function () {  //默认执行函数
      this.casLogin()
    },
    methods: {
        casLogin () {
            let queryString=window.location.search
            console.log("queryStringhhhh: ")
            console.log("queryString: ",queryString)
            let params = new URLSearchParams(queryString);
            let ticket = params.get("ticket")
            console.log(ticket)
            this.con=params.get("ticket")
            form.append('ticket', ticket),
            axios
             .post('http://202.38.79.96:9001/login',form)
             .then(response => (
                 console.log(response.data),
                 this.username = (response.data['code']==1)?response.data['data']['username']:"no_user",
                 this.token = (response.data['code']==1)?response.data['token']:"",
                 this.code = response.data['code'],
                 this.data = response.data['data'],
                 this.test()
             ))
             

        },
        test(){ if (this.code==1) {
                    localStorage.setItem('Authorization', this.token)
                    localStorage.setItem('userdata', this.data)
                    window.location.href=window.location.origin
                }
                else this.$router.push('/login')
        }
      // cas登录
    //   casLogin () {
    //       axios
    //         .get('http://202.38.79.96:18888/api_joblist')
    //         .then(response => (
    //         this.joblist = (response.data['data'])
    //         ))
    //     }
    
        //   this.$http({
        //       url: this.$http.adornUrl('/sys/caslogin'),
        //       method: 'get',
        //       params: this.$http.adornParams()
        //     }).then(({data}) => {
        //       if (data && data.code === 0) {
        //         this.$cookie.set('token', data.token)  //将token放入cookie
        //         this.$router.replace({ name: 'home' }) //跳转系统首页面
        //       } else {
        //         this.$message.error(data.msg)
        //       }
        //     })
 
      }
    }
      
</script>