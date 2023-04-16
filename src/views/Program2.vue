<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
    </base-header>

    <div class="container-fluid mt--7">
      <!--Tables-->
      <div class="card shadow" :class="type === 'dark' ? 'bg-default' : ''">
        <div
          class="card-header border-0"
          :class="type === 'dark' ? 'bg-transparent' : ''"
        >
          <div class="row align-items-center">
            <div class="col">
              <h3 class="mb-0" :class="type === 'dark' ? 'text-white' : ''">
                PROGRAM2
              </h3>
            </div>
          </div>
        </div>

        <div class="row align-items-center">
          <div class="col-2 text-center">none</div>
          <div class="col-5 text-center">状态：未烧写</div>
          <div class="col-5 text-center">program</div>
          <div class="col-12">
            <el-divider></el-divider>
          </div>
          <div class="col-5 colmodule2">
            <div class="container">
              <span class="fpgalabel3" align="center">led7</span>
              <span class="fpgalabel3" align="center">led6</span>
              <span class="fpgalabel3" align="center">led5</span>
              <span class="fpgalabel3" align="center">led4</span>
              <span class="fpgalabel3" align="center">led3</span>
              <span class="fpgalabel3" align="center">led2</span>
              <span class="fpgalabel3" align="center">led1</span>
              <span class="fpgalabel3" align="center">led0</span>
            </div>
            <div class="container">
              <div class="fpgaled">
                <input type="checkbox" id="led7" disabled /><label></label>
              </div>
              <div class="fpgaled">
                <input type="checkbox" id="led6" disabled /><label></label>
              </div>
              <div class="fpgaled">
                <input type="checkbox" id="led5" disabled /><label></label>
              </div>
              <div class="fpgaled">
                <input type="checkbox" id="led4" disabled /><label></label>
              </div>
              <div class="fpgaled">
                <input type="checkbox" id="led3" disabled /><label></label>
              </div>
              <div class="fpgaled">
                <input type="checkbox" id="led2" disabled /><label></label>
              </div>
              <div class="fpgaled">
                <input type="checkbox" id="led1" disabled /><label></label>
              </div>
              <div class="fpgaled">
                <input type="checkbox" id="led0" disabled /><label></label>
              </div>
            </div>
            <div class="container">
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
            </div>
            <div class="container">
              <div class="fpgaboard">
                <span class="fpgalabel3" align="center">G18</span>
                <span class="fpgalabel3" align="center">F18</span>
                <span class="fpgalabel3" align="center">E17</span>
                <span class="fpgalabel3" align="center">D17</span>
                <span class="fpgalabel3" align="center">G17</span>
                <span class="fpgalabel3" align="center">E18</span>
                <span class="fpgalabel3" align="center">D18</span>
                <span class="fpgalabel3" align="center">C17</span>
                <pre></pre>
                <sapn>FPGA</sapn>
                <pre></pre>
                <sapn>XC7A100t-CSG324-1</sapn>
                <pre></pre>
                <span class="fpgalabel3" align="center">H16</span>
                <span class="fpgalabel3" align="center">G13</span>
                <span class="fpgalabel3" align="center">F13</span>
                <span class="fpgalabel3" align="center">E16</span>
                <span class="fpgalabel3" align="center">H14</span>
                <span class="fpgalabel3" align="center">G16</span>
                <span class="fpgalabel3" align="center">F16</span>
                <span class="fpgalabel3" align="center">D14</span>
              </div>
            </div>
            <div class="container">
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
              <div class="fpgaline"><label></label></div>
            </div>
            <div class="container">
              <div class="fpgaswitch">
                <input type="checkbox" id="sw7" /><label></label>
              </div>
              <div class="fpgaswitch">
                <input type="checkbox" id="sw6" /><label></label>
              </div>
              <div class="fpgaswitch">
                <input type="checkbox" id="sw5" /><label></label>
              </div>
              <div class="fpgaswitch">
                <input type="checkbox" id="sw4" /><label></label>
              </div>
              <div class="fpgaswitch">
                <input type="checkbox" id="sw3" /><label></label>
              </div>
              <div class="fpgaswitch">
                <input type="checkbox" id="sw2" /><label></label>
              </div>
              <div class="fpgaswitch">
                <input type="checkbox" id="sw1" /><label></label>
              </div>
              <div class="fpgaswitch">
                <input type="checkbox" id="sw0" /><label></label>
              </div>
            </div>
            <div class="container">
              <span class="fpgalabel3" align="center">sw7</span>
              <span class="fpgalabel3" align="center">sw6</span>
              <span class="fpgalabel3" align="center">sw5</span>
              <span class="fpgalabel3" align="center">sw4</span>
              <span class="fpgalabel3" align="center">sw3</span>
              <span class="fpgalabel3" align="center">sw2</span>
              <span class="fpgalabel3" align="center">sw1</span>
              <span class="fpgalabel3" align="center">sw0</span>
            </div>
          </div>

          <div class="col-6 colmodule2 row">
            <!--<h3>uart</h3>-->
            <div class="col-12 xterm" ref="xtermElement"></div>
            <div class="col-6">
              uart pins:
              <span class="fpgalabel4" align="center">cts</span>
              <span class="fpgalabel4" align="center">rts</span>
              <span class="fpgalabel4" align="center">rxd</span>
              <span class="fpgalabel4" align="center">txd</span>
              <br />xdc sym:
              <span class="fpgalabel4" align="center">D3</span>
              <span class="fpgalabel4" align="center">E5</span>
              <span class="fpgalabel4" align="center">D4</span>
              <span class="fpgalabel4" align="center">C4</span>
              <br />baud rate: 115200
            </div>
            <div class="col-6">
              <textarea
                id="uart_input"
                rows="2"
                class="col-12 form-control form-control-alternative"
              ></textarea>
              <button
                type="button"
                id="uart_input_submit"
                class="btn btn-primary"
              >
                input
              </button>
            </div>
          </div>

          <div class="col-8 colmodule2">
            <div class="container">
              segplay(sharing with
              led)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hexplay
            </div>
            <div class="container">
              <div class="fpgaseg">
                <span class="segplay" value="0"></span>
                <span class="segplay" value="0"></span>
                <span class="segplay" value="0"></span>
                <span class="segplay" value="0"></span>
                <span class="segplay" value="0"></span>
                <span class="segplay" value="0"></span>
                <span class="segplay" value="0"></span>
                <span class="segplay" value="0"></span>
                <label></label>
              </div>
              <div class="hexplay">
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                <div class="hexplay_out" align="center">
                  <p class="hexplay_span" id="hexplay_span0">&nbsp;</p>
                </div>
                <div class="hexplay_out" align="center">
                  <p class="hexplay_span" id="hexplay_span1">&nbsp;</p>
                </div>
                <div class="hexplay_out" align="center">
                  <p class="hexplay_span" id="hexplay_span2">&nbsp;</p>
                </div>
                <div class="hexplay_out" align="center">
                  <p class="hexplay_span" id="hexplay_span3">&nbsp;</p>
                </div>
                <div class="hexplay_out" align="center">
                  <p class="hexplay_span" id="hexplay_span4">&nbsp;</p>
                </div>
                <div class="hexplay_out" align="center">
                  <p class="hexplay_span" id="hexplay_span5">&nbsp;</p>
                </div>
                <div class="hexplay_out" align="center">
                  <p class="hexplay_span" id="hexplay_span6">&nbsp;</p>
                </div>
                <div class="hexplay_out" align="center">
                  <p class="hexplay_span" id="hexplay_span7">0</p>
                </div>
              </div>
            </div>
            <div class="container">
              segplay pin:
              <span class="fpgalabel2" align="center">dot</span>
              <span class="fpgalabel2" align="center">seg_g</span>
              <span class="fpgalabel2" align="center">seg_f</span>
              <span class="fpgalabel2" align="center">seg_e</span>
              <span class="fpgalabel2" align="center">seg_d</span>
              <span class="fpgalabel2" align="center">seg_c</span>
              <span class="fpgalabel2" align="center">seg_b</span>
              <span class="fpgalabel2" align="center">seg_a</span>
            </div>
            <div class="container">
              xdc,ucf sym:
              <span class="fpgalabel2" align="center">G18</span>
              <span class="fpgalabel2" align="center">F18</span>
              <span class="fpgalabel2" align="center">E17</span>
              <span class="fpgalabel2" align="center">D17</span>
              <span class="fpgalabel2" align="center">G17</span>
              <span class="fpgalabel2" align="center">E18</span>
              <span class="fpgalabel2" align="center">D18</span>
              <span class="fpgalabel2" align="center">C17</span>
            </div>
            <div class="container">
              hexplay pin:
              <span class="fpgalabel2" align="center">&nbsp;&nbsp;</span>
              <span class="fpgalabel2" align="center">an2</span>
              <span class="fpgalabel2" align="center">an1</span>
              <span class="fpgalabel2" align="center">an0</span>
              <span class="fpgalabel2" align="center">d3</span>
              <span class="fpgalabel2" align="center">d2</span>
              <span class="fpgalabel2" align="center">d1</span>
              <span class="fpgalabel2" align="center">d0</span>
            </div>
            <div class="container">
              xdc,ucf sym:
              <span class="fpgalabel2" align="center">&nbsp;&nbsp;</span>
              <span class="fpgalabel2" align="center">A18</span>
              <span class="fpgalabel2" align="center">B16</span>
              <span class="fpgalabel2" align="center">B17</span>
              <span class="fpgalabel2" align="center">A15</span>
              <span class="fpgalabel2" align="center">A16</span>
              <span class="fpgalabel2" align="center">A13</span>
              <span class="fpgalabel2" align="center">A14</span>
            </div>
          </div>
          <div class="col-3 colmodule" id="button_div1">
            <div class="row">
              <div class="col">
                soft clock
                <div class="dropdown">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="clock0dropdownMenuButton"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    None
                  </button>
                  <div
                    class="dropdown-menu"
                    aria-labelledby="clock0dropdownMenuButton"
                  >
                    <a
                      class="dropdown-item0 dropdown-item"
                      val="-1"
                      text="None  "
                      id="clock0op"
                      >None</a
                    >
                    <a
                      class="dropdown-item0 dropdown-item"
                      val="1"
                      text="1Hz   "
                      id="clock0op"
                      >1Hz</a
                    >
                    <a
                      class="dropdown-item0 dropdown-item"
                      val="2"
                      text="1/2Hz "
                      id="clock0op"
                      >1/2Hz</a
                    >
                    <a
                      class="dropdown-item0 dropdown-item"
                      val="5"
                      text="1/5Hz "
                      id="clock0op"
                      >1/5Hz</a
                    >
                    <a
                      class="dropdown-item0 dropdown-item"
                      val="10"
                      text="1/10Hz"
                      id="clock0op"
                      >1/10Hz</a
                    >
                  </div>
                </div>
              </div>
              <div class="col">
                button
                <el-button class="fpgabutton" type="danger" circle></el-button>
              </div>
            </div>
            <pre></pre>
            <div class="row">
              <div class="container">
                clk btn pins:
                <span class="fpgalabel5" align="center">clk_btn</span>
              </div>
              <div class="container">
                xdc,ucf sym:
                <span class="fpgalabel5" align="center">B18</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import { emitter } from "../components/websocket/event_bus";
//import axios from 'axios'
//let params = new URLSearchParams()
const UART_HELLO_MESSAGE =
  "\x1B[1;1mFPGAOL \x1B[1;1;36mUART \x1B[1;1;32mxterm\x1B[1;1;33m.\x1B[1;1;31mjs \x1B[1;1;35m1.1\x1B[0m\r\n";

const xtermElement = ref(null);

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

onMounted(() => {
  term.open(xtermElement.value);
  fitAddon.fit();
  term.focus();
  term.write(UART_HELLO_MESSAGE);
  term.onData(function (val) {
    emitter.emit("term-send", val);
  });

  // 监听 eventBus 的一些事件
  emitter.on("term-recv", function (payload) {
    term.write(payload);
  });
});

onBeforeUnmount(() => {
  term.dispose();

  // 断开监听
  emitter.off("term-recv");
});
</script>

<style>
@import "room.css";
@import "~xterm/css/xterm.css";
</style>
