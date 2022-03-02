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
                          label="工程名"
                          placeholder="0000"
                          input-classes="form-control-alternative"
                          v-model="ProjectName"
                        />
                </div>
                <div class="col-12">
                    <div>
                        <label class="form-control-label">
                            布局
                        </label>
                    </div>
                </div>
            
                <div class="col-12">
                        <card header-classes="bg-transparent">
                          <div class="row">
                              <div class="col-3">
                              </div>
                              <div class="col-6 text-center">
                                <center>
                                    <div>
                                        <label class="form-control-label">
                                            已有布局
                                        </label>
                                    </div>
                                    <select class="form-control form-control-alternative" v-model="layout">
                                        <option value="默认">默认</option>
                                        <option disabled>not supported</option>
                                    </select>
                                </center>
                              </div>
                              <div class="col-3">
                              </div>
                              <div class="mt-5 row col-12">



                                <div class="col-1 mr--4">
                                  LED:
                                </div>
                                <div class="col-1 mr--5">
                                  <base-button size="sm" type="info" @click="LED=LED-1"
                                  > - </base-button>
                                </div>
                                <div class="col-1 text-center mr--4">
                                  <center>
                                      <base-input
                                        placeholder="0"
                                        input-classes="form-control-alternative"
                                        v-model="LED"
                                      />
                                  </center>
                                </div>
                                <div class="col-1 mr">
                                  <base-button size="sm" type="info" @click="LED=LED+1"
                                  > + </base-button>
                                </div>



                                <div class="col-1 mr--4">
                                  SW:
                                </div>
                                <div class="col-1 mr--5">
                                  <base-button size="sm" type="info" @click="SW=SW-1"
                                  > - </base-button>
                                </div>
                                <div class="col-1 text-center mr--4">
                                  <center>
                                      <base-input
                                        placeholder="0"
                                        input-classes="form-control-alternative"
                                        v-model="SW"
                                      />
                                  </center>
                                </div>
                                <div class="col-1 mr">
                                  <base-button size="sm" type="info" @click="SW=SW+1"
                                  > + </base-button>
                                </div>



                                <div class="col-1 mr--4">
                                  BTN:
                                </div>
                                <div class="col-1 mr--5">
                                  <base-button size="sm" type="info" @click="BTN=BTN-1"
                                  > - </base-button>
                                </div>
                                <div class="col-1 text-center mr--4">
                                  <center>
                                      <base-input
                                        placeholder="0"
                                        input-classes="form-control-alternative"
                                        v-model="BTN"
                                      />
                                  </center>
                                </div>
                                <div class="col-1 mr">
                                  <base-button size="sm" type="info" @click="BTN=BTN+1"
                                  > + </base-button>
                                </div>
                              </div>


                              <div class="col-1 mr--4">
                                  SEG:
                                </div>
                                <div class="col-1 mr--5">
                                  <base-button size="sm" type="info" @click="SEG=SEG-1"
                                  > - </base-button>
                                </div>
                                <div class="col-1 text-center mr--4">
                                  <center>
                                      <base-input
                                        placeholder="0"
                                        input-classes="form-control-alternative"
                                        v-model="SEG"
                                      />
                                  </center>
                                </div>
                                <div class="col-1 mr">
                                  <base-button size="sm" type="info" @click="SEG=SEG+1"
                                  > + </base-button>
                                </div>
                              
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



export default {
  components: {
  },
  data() {
    return {
        ProjectName: "0000",
        layout: "默认",
        LED: 0,
        SW: 0,
        BTN: 0,
        SEG: 0,
        UART: 0,
        HEX: 0
      };
  },
  methods: {
  }
};
</script>
<style></style>
