<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
    </base-header>

    <div class="container-fluid mt--7 px-0">
      <!--Charts-->
      <div class="row justify-content-center">
        <div class="col-xl-6 mb-5 mb-xl-0" v-if="false">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted ls-1 mb-1">Submit</h6>
                  <h3 class="nav-link-text text-center ls-1 mb-1 h3">
                    提交编译
                  </h3>
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
                  <label class="form-control-label"> FPGA Chip </label>
                </div>
                <select
                  class="form-control form-control-alternative"
                  v-model="fpga"
                >
                  <option value="xc7a100tcsg324-1">xc7a100tcsg324-1</option>
                  <option disabled>not supported</option>
                </select>
              </div>

              <div class="form-group col-12">
                <center>
                  <div>
                    <label class="form-control-label"> File Select </label>
                  </div>

                  <div>
                    <span class="btn form-control form-control-alternative">
                      <span>点击上传</span>
                      <input
                        class="form-control form-control-alternative"
                        :style="lll"
                        accept=".zip"
                        type="file"
                        ref="file"
                        @change="selectFile"
                      />
                    </span>
                  </div>
                  <div>
                    <div class="form-control-label">
                      {{ filename }}
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
                        <h6 class="form-control-label text-center ls-1 mb-1 h6">
                          返回信息
                        </h6>
                      </div>
                    </div>
                  </template>
                  <div class="row">
                    <p class="text-center col-12">
                      {{ submit_message }}
                    </p>
                  </div>
                </card>
              </div>
            </div>
          </card>
        </div>

        <div class="col-xl-8">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted ls-1 mb-1">Status</h6>
                  <h3 class="nav-link-text text-center ls-1 mb-1 h3">
                    编译状态
                  </h3>
                </div>
              </div>
            </template>
            <div class="row">
              <div
                class="col-12"
                v-for="(site, index) in joblist"
                :key="site[0]"
              >
                <card
                  header-classes="bg-transparent"
                  v-if="index >= 5 * (value - 1) && index < 5 * value"
                >
                  <div class="row">
                    <div class="col-12 form-control-label">
                      {{ site[0] }}
                    </div>
                    <center class="col-12 text-info" v-if="site[1] == 1">
                      Running
                    </center>
                    <center
                      class="col-12 text-primary"
                      v-else-if="site[1] == 2"
                    >
                      Pending
                    </center>
                    <center
                      class="col-12 text-success"
                      v-else-if="site[1] == 3"
                    >
                      Success
                    </center>
                    <center class="col-12 text-danger" v-else-if="site[1] == 4">
                      Failed
                    </center>
                    <div class="form-control-label col-7">
                      提交时间：{{ site[2] }}
                    </div>
                    <div class="col text-right">
                      <base-button
                        size="sm"
                        type="info"
                        class="row"
                        :disabled="site[1] != 3"
                        @click="
                          downloadEvt(
                            'http://202.38.79.96:18887/' +
                              site[0] +
                              '/results/top.bit'
                          )
                        "
                        outline
                        title="下载比特流"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-box-arrow-down"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"
                          />
                          <path
                            fill-rule="evenodd"
                            d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
                          />
                        </svg>
                        bit</base-button
                      >
                    </div>
                    <div class="col text-right">
                      <base-dropdown
                        tag="base-button"
                        position="left"
                        size="sm"
                        type="info"
                        class="row"
                        outline
                      >
                        <template v-slot:title>
                          <div title="下载日志及时间资源报告">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              fill="currentColor"
                              class="bi bi-box-arrow-down"
                              viewBox="0 0 16 16"
                            >
                              <path
                                fill-rule="evenodd"
                                d="M3.5 10a.5.5 0 0 1-.5-.5v-8a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 0 0 1h2A1.5 1.5 0 0 0 14 9.5v-8A1.5 1.5 0 0 0 12.5 0h-9A1.5 1.5 0 0 0 2 1.5v8A1.5 1.5 0 0 0 3.5 11h2a.5.5 0 0 0 0-1h-2z"
                              />
                              <path
                                fill-rule="evenodd"
                                d="M7.646 15.854a.5.5 0 0 0 .708 0l3-3a.5.5 0 0 0-.708-.708L8.5 14.293V5.5a.5.5 0 0 0-1 0v8.793l-2.146-2.147a.5.5 0 0 0-.708.708l3 3z"
                              />
                            </svg>
                            log
                          </div>
                        </template>
                        <a
                          class="dropdown-item"
                          :href="
                            'http://202.38.79.96:18887/' +
                            site[0] +
                            '/compiling.log'
                          "
                          >compiling.log</a
                        >
                        <a
                          class="dropdown-item"
                          :href="
                            'http://202.38.79.96:18887/' +
                            site[0] +
                            '/error.log'
                          "
                          v-if="site[1] == 4"
                          >error.log</a
                        >
                        <a
                          class="dropdown-item"
                          :href="
                            'http://202.38.79.96:18887/' +
                            site[0] +
                            '/results/timing.rpt'
                          "
                          v-if="site[1] == 3"
                          >timing.rpt</a
                        >
                        <a
                          class="dropdown-item"
                          :href="
                            'http://202.38.79.96:18887/' +
                            site[0] +
                            '/results/util.rpt'
                          "
                          v-if="site[1] == 3"
                          >util.rpt</a
                        >
                      </base-dropdown>
                    </div>
                    <div class="col text-right">
                      <base-button size="sm" type="danger" class="row" outline disabled title="删除编译记录，暂不可用">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          fill="currentColor"
                          class="bi bi-x-square"
                          viewBox="0 0 16 16"
                        >
                          <path
                            d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"
                          />
                          <path
                            d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"
                          />
                        </svg>
                        del</base-button
                      >
                    </div>
                  </div>
                </card>
              </div>

              <div class="col-12 mt-2">
                <base-pagination
                  align="center"
                  :total="this.joblist.length"
                  :perPage="5"
                  :value="value"
                  @input="receive"
                ></base-pagination>
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

import axios from "axios";
var form = new FormData();

export default {
  components: {},
  data() {
    return {
      JobId: "0000",
      fpga: "xc7a100tcsg324-1",
      submit_message: "no submit",
      filename: "未选择文件",
      selectFileobj: null,
      lll: {
        position: "absolute",
        left: "0px",
        top: "0px",
        opacity: 0,
      },
      pagination: {
        default: 1,
      },
      hhh: 0,
      value: 1,
      hideArrow: false,
      joblist: [[]],
    };
  },
  mounted() {
    this.updateJobList();
  },
  methods: {
    updateJobList() {
      let token = localStorage.getItem('Authorization');
      var form = new FormData();
      form.append('token', token);
      axios.post("http://202.38.79.96:18888/api_joblist", form).then((response) => {
        if (response.data["code"]==1){
          const joblist_resp = response.data["data"];
          console.log(joblist_resp)
          joblist_resp.sort(function (a, b) {
            return a[2] < b[2] ? 1 : -1;
          });
          this.joblist = joblist_resp;
          console.log(this.joblist);
        }
        else if (response.data["code"]==0){
          this.$router.push('/login');
        }
        else{
          this.joblist = [[]];
        }
      }).catch((error) => {
      console.error("请求失败:", error);
      });
    },
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
    submit() {//need to update
      form.append("inputJobId", this.JobId),
        form.append("inputFPGA", this.fpga);
      if (this.selectFileobj == null) {
        this.submit_message = "Please select a zip file!";
      } else {
        form.append("inputZipFile", this.selectFileobj),
          axios
            .post("http://202.38.79.96:18888/submit", form)
            .then((response) => (this.submit_message = response.data["msg"]));
      }
      this.updateJobList();
    },
    receive(val) {
      this.value = val;
    },
    downloadEvt(url) {
      window.open(url, "_self");
    },
  },
};
</script>
<style></style>
