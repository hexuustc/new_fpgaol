<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
    </base-header>

    <!-- Modal -->
    <div class="modal fade" :class="{ 'show': showModal }" tabindex="-1" role="dialog" v-if="showModal" style="display: block;">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Warning</h5>
            <button type="button" class="close" @click="showModal = false">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            {{ modalMessage }}
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" @click="showModal = false">Close</button>
          </div>
        </div>
      </div>
    </div>
    <div class="modal-backdrop fade" :class="{ 'show': showModal }" v-if="showModal"></div>


    <div class="container-fluid mt--7 px-0">
      <!--Charts-->
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <div class="row align-items-center">
                <div class="col">
                  <h6 class="text-muted ls-1 mb-1">Create</h6>
                  <h3 class="nav-link-text text-center ls-1 mb-1 h3">
                    建立工程
                  </h3>
                </div>
              </div>
            </template>
            <div class="row">
              <!-- <div class="col-6">
                <base-input
                  label="工程名"
                  placeholder="0000"
                  input-classes="form-control-alternative"
                  v-model="ProjectName"
                />
              </div> -->
              <div class="col-12">
                <div>
                  <label class="form-control-label"> 布局 </label>
                </div>
              </div>

              <div class="col-12">
                <card header-classes="bg-transparent">
                  <div class="row">
                    <!-- <div class="col-3"></div>
                    <div class="col-6 text-center">
                      <center>
                        <div>
                          <label class="form-control-label"> 已有布局 </label>
                        </div>
                        <select
                          class="form-control form-control-alternative"
                          v-model="layout"
                        >
                          <option value="默认">默认</option>
                          <option disabled>not supported</option>
                        </select>
                      </center>
                    </div>
                    <div class="col-3"></div> -->
                    <div class="mt-5 row col-12">
<!-- ----------------------------LED------------------------------------------------------------>
                      <div class="col-lg-4 row">
                        <div class="text_padding">LED:</div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="decrease('LED')"
                          >
                            -
                          </base-button>
                        </div>
                        <div class="input_padding text-center">
                          <center>
                            <base-input
                              placeholder="0"
                              input-classes="form-control-alternative"
                              :value="LED"
                              @input="validateInput($event,'LED')"
                            />
                          </center>
                        </div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="increase('LED')"
                          >
                            +
                          </base-button>
                        </div>
                      </div>
<!-- ----------------------------SW------------------------------------------------------------>
                      <div class="col-lg-4 row">
                        <div class="text_padding">SW:</div>
                        <div>
                          <base-button size="sm" type="info" @click="decrease('SW')">
                            -
                          </base-button>
                        </div>
                        <div class="input_padding text-center">
                          <center>
                            <base-input
                              placeholder="0"
                              input-classes="form-control-alternative"
                              :value="SW"
                              @input="validateInput($event,'SW')"
                            />
                          </center>
                        </div>
                        <div>
                          <base-button size="sm" type="info" @click="increase('SW')">
                            +
                          </base-button>
                        </div>
                      </div>
<!-- ----------------------------BTN------------------------------------------------------------>
                      <div class="col-lg-4 row">
                        <div class="text_padding">BTN:</div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="decrease('BTN')"
                          >
                            -
                          </base-button>
                        </div>
                        <div class="input_padding text-center">
                          <center>
                            <base-input
                              placeholder="0"
                              input-classes="form-control-alternative"
                              :value="BTN"
                              @input="validateInput($event,'BTN')"
                            />
                          </center>
                        </div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="increase('BTN')"
                          >
                            +
                          </base-button>
                        </div>
                      </div>  
                    </div>

                    <div class="mt-1 row col-12">
<!-- ----------------------------SEG------------------------------------------------------------>
                      <!-- <div class="col-lg-4 row">
                        <div class="text_padding">SEG:</div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="SEG = SEG - 1"
                          >
                            -
                          </base-button>
                        </div>
                        <div class="input_padding text-center">
                          <center>
                            <base-input
                              placeholder="0"
                              input-classes="form-control-alternative"
                              v-model="SEG"
                            />
                          </center>
                        </div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="SEG = SEG + 1"
                          >
                            +
                          </base-button>
                        </div>
                      </div> -->
<!-- ----------------------------HEX------------------------------------------------------------>
                      <div class="col-lg-4 row">
                        <div class="text_padding">HEX:</div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="decrease('HEX')"
                          >
                            -
                          </base-button>
                        </div>
                        <div class="text-center input_padding">
                          <center>
                            <base-input
                              placeholder="0"
                              input-classes="form-control-alternative"
                              :value="HEX"
                              @input="validateInput($event,'HEX')"
                            />
                          </center>
                        </div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="increase('HEX')"
                          >
                            +
                          </base-button>
                        </div>
                      </div>
<!-- ----------------------------UART------------------------------------------------------------>
                      <div class="col-lg-4 row">
                        <div class="text_padding">UART:</div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="decrease('UART')"
                          >
                            -
                          </base-button>
                        </div>
                        <div class="input_padding text-center">
                          <center>
                            <base-input
                              placeholder="0"
                              input-classes="form-control-alternative"
                              :value="UART"
                              @input="validateInput($event,'UART')"
                            />
                          </center>
                        </div>
                        <div>
                          <base-button
                            size="sm"
                            type="info"
                            @click="increase('UART')"
                          >
                            +
                          </base-button>
                        </div>
                      </div>
                    </div>

                    <div class="col-12">
                      可用管脚数：{{ available_pin }}/{{ total_pin }}
                    </div>

                    <div class="col-5"></div>
                    <div class="col-2">
                      <base-button size="md" type="info" @click="genPeriph()"
                        >保存</base-button
                      >
                    </div>
                  </div>
                </card>
              </div>
              <div class="col-2 mt-3">
                <base-button size="md" type="info" @click="hasxdc = !hasxdc">
                  查看xdc
                </base-button>
              </div>
              <div class="col-12 mt-3" v-if="hasxdc">
                <textarea
                  class="form-control form-control-alternative"
                  :rows="20"
                  v-model="xdc"
                  :placeholder="xdc"
                ></textarea>
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
  components: {},
  mounted() {
    // emitter.on("dispatch-xdc", (payload) => {
    //   this.xdc = payload;
    // });
    // 从 localStorage 中查询 LED, SW, BTN, SEG, UART, HEX
    // 如果有，则覆盖（需要转换为 number）
    // 如果没有，则保持 默认值
    this.LED = Number(localStorage.getItem("LED")) || 8;
    this.SW = Number(localStorage.getItem("SW")) || 8;
    this.BTN = Number(localStorage.getItem("BTN")) || 1;
    this.SEG = Number(localStorage.getItem("SEG")) || 0;
    this.UART = Number(localStorage.getItem("UART")) || 1;
    this.HEX = Number(localStorage.getItem("HEX")) || 1;
    this.genPeriph();
  },
  data() {
    return {
      showModal: false,
      modalMessage: '',
      ProjectName: "0000",
      layout: "默认",
      LED: 8,
      SW: 8,
      BTN: 1,
      SEG: 0,
      UART: 1,
      HEX: 1,
      total_pin: 31,
      xdc:
        "## This file is a general .xdc for FPGAOL2_BOARD (adopted from Nexys4 DDR Rev. C)\n\
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
      hasxdc: false,
      gpio_common: ["K17", "K18", "L14", "M14", "L18", "M18", "R12",  "M13",
                    "P14", "P18", "T10", "T9", "U13", "T13", "V14", "U14", 
                    "V11", "V12", "U12", "U11", "T11", "V17", "U16", "U18",
                    "U17", "V16",  "F3", "F4", "G6", "E7", "D8"],//任意使用的管脚
      gpio_uart: ["M17", "M16"]//串口专属管脚
    };
  },
  watch: {
    // LED, SW, BTN, SEG, UART, HEX 更新时，保存到 localStorage
    LED(newLED, oldLED) {
      localStorage.setItem("LED", newLED);
    },
    SW(newSW, oldSW) {
      localStorage.setItem("SW", newSW);
    },
    BTN(newBTN, oldBTN) {
      localStorage.setItem("BTN", newBTN);
    },
    SEG(newSEG, oldSEG) {
      localStorage.setItem("SEG", newSEG);
    },
    UART(newUART, oldUART) {
      localStorage.setItem("UART", newUART);
    },
    HEX(newHEX, oldHEX) {
      localStorage.setItem("HEX", newHEX);
    },
  },
  computed: {
    available_pin() {
      var is_seg = 0;
      var is_hex = 0;
      if (this.SEG > 0) is_seg = 1;
      else is_seg = 0;
      if (this.HEX > 0) is_hex = 1;
      else is_hex = 0;
      return (
        this.total_pin -
        this.LED -
        this.SW -
        this.BTN -
        8 * is_seg -
        7 * is_hex 
        // - 2 * this.UART
      );
    },
  },
  methods: {
    genPeriph() {
      var led_cnt = this.LED;
      var sw_cnt = this.SW;
      var btn_cnt = this.BTN;
      var uart_cnt = this.UART;
      var hexplay_cnt = this.HEX;

      var xdc_temp = "";
      var cnt_start = 0
      var j = 0;
      //生成clk管脚
      xdc_temp += "# FPGAOL AUTO GEN XDC V2.0\n\n"
      xdc_temp += "set_property -dict {PACKAGE_PIN B8 IOSTANDARD LVCMOS33} [get_ports {clk}];\n"
      xdc_temp += "create_clock -add -name sys_clk_pin -period 10.00 -waveform {0 5} [get_ports {clk}];\n\n"
      //生成led管脚
      for (let i = 0; i < led_cnt; i++) {
        xdc_temp += "set_property -dict {PACKAGE_PIN ";
        xdc_temp += this.gpio_common[i];
        xdc_temp += " IOSTANDARD LVCMOS33} [get_ports {led["+i+"]}];\n"
      }
      if (led_cnt) {xdc_temp +="\n"}
      //生成sw管脚
      cnt_start = led_cnt;
      for (let i = cnt_start; i < cnt_start+sw_cnt; i++) {
        xdc_temp += "set_property -dict {PACKAGE_PIN ";
        xdc_temp += this.gpio_common[i];
        xdc_temp += " IOSTANDARD LVCMOS33} [get_ports {sw["+(i-cnt_start)+"]}];\n"
      }
      if (sw_cnt) {xdc_temp +="\n"}
      //生成btn管脚
      cnt_start = cnt_start+sw_cnt;
      for (let i = cnt_start; i < cnt_start+btn_cnt; i++) {
        xdc_temp += "set_property -dict {PACKAGE_PIN ";
        xdc_temp += this.gpio_common[i];
        xdc_temp += " IOSTANDARD LVCMOS33} [get_ports {btn["+(i-cnt_start)+"]}];\n"
      }
      if (btn_cnt) {xdc_temp +="\n"}
      //生成uart管脚
      if (uart_cnt>0) {
        xdc_temp += "set_property -dict {PACKAGE_PIN "
        xdc_temp += this.gpio_uart[0]
        xdc_temp += " IOSTANDARD LVCMOS33} [get_ports {uart_rx}];\n"
        xdc_temp += "set_property -dict {PACKAGE_PIN "
        xdc_temp += this.gpio_uart[1]
        xdc_temp += " IOSTANDARD LVCMOS33} [get_ports {uart_tx}];\n"
      }
      if (uart_cnt) {xdc_temp +="\n"}
      //生成hexplay管脚
      cnt_start = cnt_start+btn_cnt;
      for (let i = cnt_start; i < cnt_start+hexplay_cnt*7; i++) {
        j = (i-cnt_start)%7
        if (j<3){
          xdc_temp += "set_property -dict {PACKAGE_PIN ";
          xdc_temp += this.gpio_common[i];
          xdc_temp += " IOSTANDARD LVCMOS33} [get_ports {hexplay"+parseInt((i-cnt_start)/7)+"_an["+j+"]}];\n"
        }
        else {
          xdc_temp += "set_property -dict {PACKAGE_PIN ";
          xdc_temp += this.gpio_common[i];
          xdc_temp += " IOSTANDARD LVCMOS33} [get_ports {hexplay"+parseInt((i-cnt_start)/7)+"_d["+(j-3)+"]}];\n"
        }
      }

      this.xdc = xdc_temp


      j = { id: -2, periphs: [] };
      for (let i = 0; i < led_cnt; i++) {
        j.periphs.push({
          type: "LED",
          idx: i,
        });
      }
      for (let i = 0; i < sw_cnt+btn_cnt; i++) {
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
      
      j["led"]=led_cnt;
      j["sw"]=sw_cnt;
      j["btn"]=btn_cnt;
      j["uart"]=uart_cnt;
      j["hexplay"]=hexplay_cnt;
      localStorage.setItem("periphs", JSON.stringify(j));
      // window.json = j;
      // emitter.emit("stop-notify");
      // emitter.emit("submit-json", JSON.stringify(j));
    },
    decrease(periph) {
      if (periph == "LED" || periph == "SW" || periph == "BTN" || periph == "HEX" || periph == "UART")
      {
        if (this[periph]>0) this[periph] -=1;
        else 
        {
          this.modalMessage = "外设数量不能小于0";
          this.showModal = true;
        }
      }
      else 
      {
        this.modalMessage = "未定义的外设";
        this.showModal = true;
      }
    },
    increase(periph) {
      if (periph == "LED" || periph == "SW" || periph == "BTN")
      {
        if (this.available_pin>0) this[periph] +=1;
        else 
        {
          this.modalMessage = "管脚数量不足";
          this.showModal = true;
        }
      }
      else if (periph == "HEX")
      {
        if (this[periph]==0 && this.available_pin>=7) this[periph] +=1;
        else 
        {
          if (this[periph]>0) this.modalMessage = "暂时最多只能有一个HEX数码管";
          else this.modalMessage = "管脚数量不足";
          this.showModal = true;
        }
      }
      else if (periph == "UART")
      {
        if (this[periph]==0) this[periph] +=1;
        else 
        {
          this.modalMessage = "暂时最多只能有一个UART串口";
          this.showModal = true;
        }
      }
    },
    validateInput(event,periph) {
      let value = parseInt(event.target.value);
      if (isNaN(value)) value = 0; // Handle non-number inputs
      if (periph == "LED" || periph == "SW" || periph == "BTN")
      {
        if (value > this.available_pin+this[periph]) this[periph]=this.available_pin+this[periph]
        else if (value >= 0) this[periph]=value
        else this[periph]=0
      }
      else if (periph == "HEX")
      {
        if (value>=1 && this.available_pin+7*this[periph]>7) this[periph]=1
        else this[periph]=0
      }
      else if (periph == "UART")
      {
        if (value>=1) this[periph]=1
        else this[periph]=0
      }
    }
  },
  // beforeUnmount() {
  //   emitter.off("dispatch-xdc");
  // },
}
</script>
<style>
@import "room.css";
.text_padding {
  padding: 0px 15px;
}
.input_padding {
  padding: 0px 15px;
  max-width: 100px;

}
</style>
