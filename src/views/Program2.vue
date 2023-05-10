<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
    </base-header>

    <div class="container-fluid mt--7">
      <input
        id="bitstream"
        name="bitstream"
        type="file"
        accept=".bin,.bit"
        class="form-control-file"
        hidden="true"
        @change="updateFileName($event)"
      />
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
          <div class="col-1"></div>
          <div class="col-2">
            <button
              type="button"
              id="file-select"
              class="btn btn-primary"
              onclick="document.getElementById('bitstream').click()"
            >
              Select file
            </button>
          </div>
          <div class="col-7">
            <input
              type="text"
              id="file-name"
              readonly="true"
              class="form-control"
              placeholder="no file selected"
            />
          </div>
          <div class="col-2">
            <button
              type="button"
              id="upload-button"
              class="btn btn-primary"
              @click="updateFile"
            >
              Program!
            </button>
          </div>
          <div class="col-12">
            <el-divider></el-divider>
          </div>
          <div class="col-5 colmodule2">
            <div class="container">
              <!-- 根据 ledData 确定长度 -->
              <span
                v-for="index in ledData.length"
                :key="index"
                class="fpgalabel3"
                align="center"
                >led{{ ledData.length - index }}</span
              >
            </div>
            <div class="container">
              <!-- 根据 ledData 决定是否 checked(单向) -->
              <div v-for="index in ledData.length" :key="index" class="fpgaled">
                <input
                  type="checkbox"
                  :id="'led' + (ledData.length - index)"
                  :checked="ledData[ledData.length - index]"
                  disabled
                /><label></label>
              </div>
            </div>
            <div class="container">
              <!-- 同理，swData 表示开关, 需要处理函数 -->
              <div
                v-for="index in swData.length"
                :key="index"
                class="fpgaswitch"
              >
                <input
                  type="checkbox"
                  :id="'sw' + (swData.length - index)"
                  @change="swChange($event, swData.length - index)"
                /><label></label>
              </div>
            </div>
            <div class="container">
              <span
                v-for="index in swData.length"
                :key="index"
                class="fpgalabel3"
                align="center"
                >sw{{ swData.length - index }}</span
              >
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
            <div class="container" style="display: flex">
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
              <div>
                <div
                  v-for="index in hexplayData.length"
                  :key="index"
                  class="hexplay"
                >
                  <div
                    v-for="inner_index in 8"
                    :key="inner_index"
                    class="hexplay_out"
                    align="center"
                  >
                    <p class="hexplay_span">
                      {{ hexplayData[index - 1][inner_index - 1] }}
                    </p>
                  </div>
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
import { ref, onMounted, onBeforeUnmount, reactive } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import emitter from "../components/websocket/event_bus";

//import axios from 'axios'
//let params = new URLSearchParams()
const UART_HELLO_MESSAGE =
  "\x1B[1;1mFPGAOL \x1B[1;1;36mUART \x1B[1;1;32mxterm\x1B[1;1;33m.\x1B[1;1;31mjs \x1B[1;1;35m1.1\x1B[0m\r\n";

const xtermElement = ref(null);

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

// hexplay 数据数组, 第一维指定了多少组 hexplay, 第二维是 hexplay 的每一位
// 初始化为 1 组 hexplay, 初始数据为 0
const hexplayData = reactive([[...Array(8).keys()].map(() => "0")]);

// LED 数据数组, ledDate[idx] 是 bool, 表示第 idx 个 LED 是亮是灭
// 初始化为 8 个 false
const ledData = reactive([...Array(8).keys()].map(() => false));

// SW 数据数组, swData[idx] 是 bool, 表示第 idx 个 SW 是开是关
// 初始化为 8 个 false
const swData = reactive([...Array(8).keys()].map(() => false));
const swChange = (e, index) => {
  if (!e) return;
  swData[index] = !swData[index];
  console.log(swData);
  emitter.emit("sw-change", index, swData[index]);
};

const hexplayDataChange = (idx, payload) => {
  for (let i = 0; i < 8; ++i) {
    hexplayData[idx][i] =
      payload == -1
        ? ""
        : [...Array(16).keys()].map((i) => i.toString(16))[
            (payload >>> (4 * (7 - i))) % 0x10
          ];
  }
};

const updateFileName = (e) => {
  if (!e) return;
  console.log(e.target.files[0].name);
  document.getElementById("file-name").placeholder = e.target.files[0].name;
};

function updateFile() {
  emitter.emit("stop-notify");
  const file = document.getElementById("bitstream").files[0];
  const zip = new window.JSZip();
  zip.file("bitstream.bit", file, { binary: true, unixPermissions: "755" });
  zip
    .generateAsync({ type: "blob", compression: "DEFLATE" })
    .then(function (zipped_file) {
      const fd = new FormData();
      fd.append("bitstream", zipped_file);
      fd.append("judge", "normal");
      const xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function () {
        if (this.readyState == 4) {
          if (this.status == 200) {
            emitter.emit("submit-json", JSON.stringify(window.json));
            alert("Success!");
          } else {
            console.log("Failed");
          }
        }
      };
      xhr.open(
        "POST",
        "http://202.38.79.96:12148/upload/?token=token_debug_ignore"
      );
      xhr.send(fd);
    });
}

onMounted(() => {
  term.open(xtermElement.value);
  fitAddon.fit();
  term.focus();
  term.write(UART_HELLO_MESSAGE);
  term.onData(function (val) {
    emitter.emit("term-send", val);
  });

  if (window.new_json) {
    console.log(window.json);
    window.new_json = false;

    // 根据 json 初始化 hexplayData, ledData, swData
    // 遍历 json.periphs 数组, 根据 type 是 'LED', 'BTN' 还是 'HEXPLAY'
    // 分别初始化 ledData, swData, hexplayData
    while (ledData.length > 0) ledData.pop();
    while (swData.length > 0) swData.pop();
    while (hexplayData.length > 0) hexplayData.pop();
    for (let i = 0; i < window.json.periphs.length; ++i) {
      const periph = window.json.periphs[i];
      if (periph.type == "LED") {
        ledData.push(false);
      } else if (periph.type == "BTN") {
        swData.push(false);
      } else if (periph.type == "HEXPLAY") {
        hexplayData.push([...Array(8).keys()].map(() => "0"));
      }
    }
    console.log("reinit: ", ledData, swData, hexplayData);
  }

  // 监听 eventBus 的一些事件
  emitter.on("term-recv", function (payload) {
    term.write(payload);
  });
  // 监听 led-recv
  emitter.on("led-recv", function (idx, payload) {
    console.log("led-recv", idx, payload);
    ledData[idx] = payload ? true : false;
  });
  // 监听 hexplay-recv
  emitter.on("hexplay-recv", function (idx, payload) {
    hexplayDataChange(idx, payload);
  });
});

onBeforeUnmount(() => {
  term.dispose();

  // 断开监听
  emitter.off("term-recv");
  emitter.off("led-recv");
  emitter.off("hexplay-recv");
});
</script>

<style>
@import "room.css";
@import "~xterm/css/xterm.css";
</style>
