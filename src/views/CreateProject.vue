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
                <div class="fpgaled"><input type="checkbox" id="led7" disabled><label></label></div>
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

                              <div class="mt-1 row col-12">
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

                                <div class="col-1 mr--4">
                                  HEX:
                                </div>
                                <div class="col-1 mr--5">
                                  <base-button size="sm" type="info" @click="HEX=HEX-1"
                                  > - </base-button>
                                </div>
                                <div class="col-1 text-center mr--4">
                                  <center>
                                      <base-input
                                        placeholder="0"
                                        input-classes="form-control-alternative"
                                        v-model="HEX"
                                      />
                                  </center>
                                </div>
                                <div class="col-1 mr">
                                  <base-button size="sm" type="info" @click="HEX=HEX+1"
                                  > + </base-button>
                                </div>

                                <div class="col-1 mr--4">
                                  UART:
                                </div>
                                <div class="col-1 mr--5">
                                  <base-button size="sm" type="info" @click="UART=UART-1"
                                  > - </base-button>
                                </div>
                                <div class="col-1 text-center mr--4">
                                  <center>
                                      <base-input
                                        placeholder="0"
                                        input-classes="form-control-alternative"
                                        v-model="UART"
                                      />
                                  </center>
                                </div>
                                <div class="col-1 mr">
                                  <base-button size="sm" type="info" @click="UART=UART+1"
                                  > + </base-button>
                                </div>
                              </div>


                              <div class="col-12">
                            可用管脚数：{{available_pin}}/{{total_pin}}
                          </div>

                          <div class="col-5">
                          </div>
                          <div class="col-1">
                          <base-button size="md" type="info" @click="genPeriph()"
                                  > 保存 </base-button>
                          </div>
                          <div class="col-2">
                            <a href="https://fpgaol.ustc.edu.cn/download/fpgaol1.xdc" target="_blank">下载xdc</a>
                          </div>
                          </div>
                  
                        </card>
                </div>
                <div class="col-2">
                          <base-button size="md" type="info" @click="hasxdc=!hasxdc"
                                  > 查看xdc </base-button>
                          </div>
                <div class="col-12 mt-3" v-if="hasxdc">
                        <textarea class="form-control form-control-alternative" :rows="20" v-model="xdc" :placeholder="xdc"></textarea>
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
import emitter from "../components/websocket/event_bus";
export default {
  components: {
  },
  mounted() {
    emitter.on("dispatch-xdc", function (payload) {
      this.xdc = payload;
    });
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
        HEX: 0,
        total_pin: 42,
        xdc:"## This file is a general .xdc for FPGAOL2_BOARD (adopted from Nexys4 DDR Rev. C)\n\
## To use it in a project:\n\
## - uncomment the lines corresponding to used pins\n\
## - rename the used ports (in each line, after get_ports) according to the top level signal names in the project\n\
\n\
## Clock signal\n\
#set_property -dict { PACKAGE_PIN B8    IOSTANDARD LVCMOS33 } [get_ports { clk }]; #IO_L12P_T1_MRCC_35 Sch=clk100mhz\n\
#create_clock -add -name sys_clk_pin -period 10.00 -waveform {0 5} [get_ports { clk }];\n\
\n\
\n\
## FPGAOL2 LED (signle-digit-SEGPLAY)\n\
#set_property -dict { PACKAGE_PIN K17   IOSTANDARD LVCMOS33 } [get_ports { led[0] }]; #IO_L18P_T2_A24_15 Sch=led[0]\n\
#set_property -dict { PACKAGE_PIN K18   IOSTANDARD LVCMOS33 } [get_ports { led[1] }]; #IO_L24P_T3_RS1_15 Sch=led[1]\n\
#set_property -dict { PACKAGE_PIN L14   IOSTANDARD LVCMOS33 } [get_ports { led[2] }]; #IO_L17N_T2_A25_15 Sch=led[2]\n\
#set_property -dict { PACKAGE_PIN M14   IOSTANDARD LVCMOS33 } [get_ports { led[3] }]; #IO_L8P_T1_D11_14 Sch=led[3]\n\
#set_property -dict { PACKAGE_PIN L18   IOSTANDARD LVCMOS33 } [get_ports { led[4] }]; #IO_L7P_T1_D09_14 Sch=led[4]\n\
#set_property -dict { PACKAGE_PIN M18   IOSTANDARD LVCMOS33 } [get_ports { led[5] }]; #IO_L18N_T2_A11_D27_14 Sch=led[5]\n\
#set_property -dict { PACKAGE_PIN R12   IOSTANDARD LVCMOS33 } [get_ports { led[6] }]; #IO_L17P_T2_A14_D30_14 Sch=led[6]\n\
#set_property -dict { PACKAGE_PIN R13   IOSTANDARD LVCMOS33 } [get_ports { led[7] }]; #IO_L18P_T2_A12_D28_14 Sch=led[7]\n\
\n\
## FPGAOL2 SWITCH\n\
#set_property -dict { PACKAGE_PIN M13   IOSTANDARD LVCMOS33 } [get_ports { sw[0] }]; #IO_L24N_T3_RS0_15 Sch=sw[0]\n\
#set_property -dict { PACKAGE_PIN R18   IOSTANDARD LVCMOS33 } [get_ports { sw[1] }]; #IO_L3N_T0_DQS_EMCCLK_14 Sch=sw[1]\n\
#set_property -dict { PACKAGE_PIN T18   IOSTANDARD LVCMOS33 } [get_ports { sw[2] }]; #IO_L6N_T0_D08_VREF_14 Sch=sw[2]\n\
#set_property -dict { PACKAGE_PIN N14   IOSTANDARD LVCMOS33 } [get_ports { sw[3] }]; #IO_L13N_T2_MRCC_14 Sch=sw[3]\n\
#set_property -dict { PACKAGE_PIN P14   IOSTANDARD LVCMOS33 } [get_ports { sw[4] }]; #IO_L12N_T1_MRCC_14 Sch=sw[4]\n\
#set_property -dict { PACKAGE_PIN P18   IOSTANDARD LVCMOS33 } [get_ports { sw[5] }]; #IO_L7N_T1_D10_14 Sch=sw[5]\n\
#set_property -dict { PACKAGE_PIN U12   IOSTANDARD LVCMOS33 } [get_ports { sw[6] }]; #IO_L17N_T2_A13_D29_14 Sch=sw[6]\n\
#set_property -dict { PACKAGE_PIN U11   IOSTANDARD LVCMOS33 } [get_ports { sw[7] }]; #IO_L5N_T0_D07_14 Sch=sw[7]\n\
\n\
## FPGAOL2 HEXPLAY\n\
\n\
#set_property -dict { PACKAGE_PIN T10   IOSTANDARD LVCMOS33     } [get_ports { d[0] }]; #IO_L9N_T1_DQS_AD3N_15 Sch=xa_n[1]\n\
#set_property -dict { PACKAGE_PIN T9   IOSTANDARD LVCMOS33     } [get_ports { d[1] }]; #IO_L9P_T1_DQS_AD3P_15 Sch=xa_p[1]\n\
#set_property -dict { PACKAGE_PIN U13   IOSTANDARD LVCMOS33     } [get_ports { d[2] }]; #IO_L8N_T1_AD10N_15 Sch=xa_n[2]\n\
#set_property -dict { PACKAGE_PIN T13   IOSTANDARD LVCMOS33     } [get_ports { d[3] }]; #IO_L8P_T1_AD10P_15 Sch=xa_p[2]\n\
#set_property -dict { PACKAGE_PIN V14   IOSTANDARD LVCMOS33     } [get_ports { an[0] }]; #IO_L7N_T1_AD2N_15 Sch=xa_n[3]\n\
#set_property -dict { PACKAGE_PIN U14   IOSTANDARD LVCMOS33     } [get_ports { an[1] }]; #IO_L7P_T1_AD2P_15 Sch=xa_p[3]\n\
#set_property -dict { PACKAGE_PIN V11   IOSTANDARD LVCMOS33     } [get_ports { an[2] }]; #IO_L10N_T1_AD11N_15 Sch=xa_n[4]\n\
\n\
## FPGAOL2 BUTTON & SOFT_CLOCK\n\
\n\
#set_property -dict { PACKAGE_PIN V12   IOSTANDARD LVCMOS33     } [get_ports { BTN }]; #IO_L10P_T1_AD11P_15 Sch=xa_p[4]\n\
\n\
##USB-RS232 Interface\n\
\n\
#set_property -dict { PACKAGE_PIN M17    IOSTANDARD LVCMOS33 } [get_ports { rxd }]; \n\
#set_property -dict { PACKAGE_PIN M16    IOSTANDARD LVCMOS33 } [get_ports { txd }]; \n\
#set_property -dict { PACKAGE_PIN D3    IOSTANDARD LVCMOS33 } [get_ports { UART_CTS }]; #IO_L12N_T1_MRCC_35 Sch=uart_cts\n\
#set_property -dict { PACKAGE_PIN E5    IOSTANDARD LVCMOS33 } [get_ports { UART_RTS }]; #IO_L5N_T0_AD13N_35 Sch=uart_rts\n\
",
        hasxdc:false
              };
  },
  computed: {
    available_pin(){
      var is_seg=0;
      var is_hex=0;
      if (this.SEG>0) is_seg=1;
      else is_seg=0;
      if (this.HEX>0) is_hex=1;
      else is_hex = 0;
      return this.total_pin-this.LED-this.SW-this.BTN-8*is_seg-7*is_hex-2*this.UART;
    }
  },
  methods: {
    genPeriph() {
      var led_cnt = this.LED;
      var sw_cnt = this.SW;
      var uart_cnt = this.UART;
      var hexplay_cnt = this.HEX;

      var j = { id: -2, periphs: [] };
      for (let i = 0; i < led_cnt; i++) {
        j.periphs.push({
          type: "LED",
          idx: i,
        });
      }
      for (let i = 0; i < sw_cnt; i++) {
        j.periphs.push({
          type: "BTN",
          idx: i,
        });
      }
      for (let i = 0; i < uart_cnt; i++) {
        j.periphs.push({
          type: "UART",
          idx: i,
          baud: 115200,
        });
      }
      for (let i = 0; i < hexplay_cnt; i++) {
        j.periphs.push({
          type: "HEXPLAY",
          idx: i,
        });
      }

      emitter.emit("submit-json", JSON.stringify(j));
    },
  },
  beforeUnmount() {
    emitter.off("dispatch-xdc");
  },
};
</script>
<style>
@import "room.css";
</style>
