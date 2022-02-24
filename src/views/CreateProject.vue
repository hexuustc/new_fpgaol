<template>
  <div >
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
    </base-header>

    <div class="container-fluid mt--7 px-0 ">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted ls-1 mb-1">Create</h6>
                  <h3 class="nav-link-text text-center ls-1 mb-1 h3">建立工程</h3>
                </div>
              </div>
            </template>
            <div class="row">
                <div class="col-6">
                    <base-input
                          label="JobID"
                          placeholder="0000"
                          input-classes="form-control-alternative"
                          v-model="JobId"
                        />
                </div>
                <div class="col-6">
                    <div>
                        <label class="form-control-label">
                            FPGA Chip
                        </label>
                    </div>
                    <select class="form-control form-control-alternative" v-model="fpga">
                        <option value="xc7a100tcsg324-1">xc7a100tcsg324-1</option>
                        <option disabled>not supported</option>
                    </select>
                </div>
            
                <div class="form-group col-12">
                    <center>
                        <div>
                                <label class="form-control-label">
                                    File Select
                                </label>
                        </div>
        
                    <div>
                    <span class="btn form-control form-control-alternative">
                    <span>点击上传</span>
                        <input class="form-control form-control-alternative" :style="lll" accept=".zip" type="file" ref="file" @change="selectFile" />
                    </span>
                    </div>
                    <div>
                            <div class="form-control-label">
                                {{filename}}
                            </div>
                    </div>
        
        
                    </center>
                </div>
            
            <div class="col-12">
            <center>
                <base-button size="lg" type="info" @click="submit"
                    >submit</base-button
                >
            </center>
            </div> 
            <div class="col-xl-6 mb-4 mb-xl-0 mt-4">
                <card header-classes="bg-transparent">
                  <template v-slot:header>
                    <div class="row align-items-center">
                      <div class="col">
                        <h6 class="form-control-label text-center ls-1 mb-1 h6">返回信息</h6>
                      </div>
                    </div>
                  </template>
                  <div class="row">
                  <p class="text-center col-12">
                     {{submit_message}}
                  </p>
                  </div>
                </card>
            </div>
            
            </div>
          </card>
        </div>

           
        
      </div>
      <!-- End charts-->

    </div>
  </div>
</template>
<script>
// Charts


import axios from 'axios';
var form = new FormData();

export default {
  components: {
  },
  data() {
    return {
        JobId: "0000",
        fpga: 'xc7a100tcsg324-1',
        submit_message: 'no submit',
        filename: '未选择文件',
        selectFileobj: null,
        lll: {
            position: "absolute",
            left: "0px",
            top: "0px",
            opacity: 0
        },
        pagination: {
        default: 1
        },
        hhh: 0,
        value: 2,
        hideArrow: false,
        joblist:[[]]
      };
  },
  mounted(){
    axios
    .get('http://202.38.79.96:18888/api_joblist')
    .then(response => (
    this.joblist = (response.data['data'])
    ))
    },
  methods: {
      selectFile() {
       console.log(this.$refs["file"].files);
       console.log(this.$refs["file"].files[0]);
       if (this.$refs["file"].files[0]) {
         this.filename = this.$refs["file"].files[0].name;
         this.selectFileobj = this.$refs["file"].files[0];
       } else {
         this.filename = "";
       }
     },
      submit(){
        form.append('inputJobId', this.JobId),
        form.append('inputFPGA', this.fpga);
        if (this.selectFileobj == null){
            this.submit_message = "Please select a zip file!"
        }
        else {
        form.append('inputZipFile', this.selectFileobj),
            axios
            .post('http://202.38.79.96:18888/submit', form)
            .then(response => (
                this.submit_message = (response.data)['msg']
              ))};
        axios
    .get('http://202.38.79.96:18888/api_joblist')
    .then(response => (
    this.joblist = (response.data['data'])
    ))
      },
      receive(val){
          this.value=val
      },
      downloadEvt(url) {
      window.open(url, '_self');
    }
    
  }
};
</script>
<style></style>
