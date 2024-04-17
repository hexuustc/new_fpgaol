<template>
  <div>
    <base-header type="gradient-success" class="pb-6 pb-8 pt-5 pt-md-5">
    </base-header>
    
    <div class="container-fluid mt--7">
      <div v-if="notification.visible" class="notification">
      {{ notification.message }}
    </div>
      <div class="row">
        <div class="col-xl-12 mb-5 mb-xl-0">
          <card header-classes="bg-transparent">
            <template v-slot:header>
              <input
                id="bitstream"
                name="bitstream"
                type="file"
                accept=".bin,.bit"
                class="form-control-file"
                hidden="true"
                @change="updateFileName($event)"
              />
              <div class="row align-items-center">
                <div class="col-12">
                  <h6 class="text-muted ls-1 mb-1">program</h6>
                  <h3 class="nav-link-text text-center ls-1 mb-1 h3">
                    工程烧写
                  </h3>
                </div>
                <div class="col-5 row align-items-center">
                  <button
                    type="button"
                    id="connect"
                    class="btn btn-primary"
                    @click="connect"
                  >
                    连接
                  </button>
                  <div class="text-center">
                    <div class="font-weight-bold">状态</div>
                    <div class="text-muted" v-if="!connect_ok">未连接</div>
                    <div class="text-success" v-if="connect_ok">已连接</div>
                  </div>
                  <el-divider direction="vertical"></el-divider>
                  <div class="text-center">
                    <div class="font-weight-bold"> {{ available_count }}/{{ total_count }}</div>
                    <div class="font-weight-bold">
                      <div v-if="pi_id === 0">ID: None</div>
                      <div v-else>ID: {{ pi_id }}</div>
                    </div>
                  </div>
                  <el-divider direction="vertical"></el-divider>
                  <button
                    type="button"
                    id="disconnect"
                    class="btn btn-secondary"
                    @click="disconnect"
                  >
                    断开
                  </button>
                </div>
                <div>
                  <button
                    type="button"
                    id="file-select"
                    class="btn btn-primary"
                    onclick="document.getElementById('bitstream').click()"
                  >
                    Select file
                  </button>
                </div>
                <div class="col-4">
                  <input
                    type="text"
                    id="file-name"
                    readonly="true"
                    class="form-control"
                    placeholder="no file selected"
                  />
                </div>
                <div class="">
                  <button
                    type="button"
                    id="upload-button"
                    class="btn btn-primary"
                    @click="updateFile"
                    :disabled="!connect_ok"
                  >
                    Program!
                  </button>
                </div>
                <!-- <div class="col-1">
                  <button
                    type="button"
                    id="upload-button"
                    class="btn btn-primary"
                    @click="check_notify"
                  >
                    test
                  </button>
                </div> -->
              </div>
            </template>
            <div class="row">
              <div class="col-lg-6 colmodule2">
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
                <div class="container">
                    <!-- 同理，swData 表示开关, 需要处理函数 -->
                    <button
                      v-for="index in btnData.length"
                      :key="index"
                      class="btn btn-danger fpgabutton"
                      type="button"
                      @mousedown="btnChange($event, btnData.length - index)"
                      @mouseup="btnChange($event, btnData.length - index)"
                    >
                    </button>
                  </div>
                  <div class="container">
                    <span
                      v-for="index in btnData.length"
                      :key="index"
                      class="fpgalabel3"
                      align="center"
                      >btn{{ btnData.length - index }}</span
                    >
                  </div>
              </div>

              <div id="xtermContainer" class="col-lg-6 colmodule2">
                <!--<h3>uart</h3>-->
                <div class="xterm" ref="xtermElement"></div>
                <div class="row" v-if="uart_display">
                  <div class="col-6">
                    uart pins:
                    <!-- <span class="fpgalabel4" align="center">cts</span>
                    <span class="fpgalabel4" align="center">rts</span> -->
                    <span class="fpgalabel3" align="center">rxd</span>
                    <span class="fpgalabel3" align="center">txd</span>
                    <br />xdc sym:
                    <!-- <span class="fpgalabel4" align="center">D3</span>
                    <span class="fpgalabel4" align="center">E5</span> -->
                    <span class="fpgalabel3" align="center">M17</span>
                    <span class="fpgalabel3" align="center">M16</span>
                    <br />baud rate: 115200
                  </div>
                  <div class="col-6">
                    <textarea
                      id="uart_input"
                      rows="2"
                      class="col-12 form-control form-control-alternative"
                      v-model="textareaValue"
                    ></textarea>
                    <button
                      type="button"
                      id="uart_input_submit"
                      class="btn btn-primary"
                      @click="send_uart"
                    >
                      input
                    </button>
                  </div>
                </div>
              </div>

              <div class="col-lg-8 colmodule2" v-if="hexplay_display">
                <!-- <div class="container">
                  segplay(sharing with
                  led)&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;hexplay
                </div> -->
                <div class="container">
                  hexplay
                </div>
                <div class="container" style="display: flex">
                  <!-- <div class="fpgaseg">
                    <span class="segplay" value="0"></span>
                    <span class="segplay" value="0"></span>
                    <span class="segplay" value="0"></span>
                    <span class="segplay" value="0"></span>
                    <span class="segplay" value="0"></span>
                    <span class="segplay" value="0"></span>
                    <span class="segplay" value="0"></span>
                    <span class="segplay" value="0"></span>
                    <label></label>
                  </div> -->
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
                <!-- <div class="container">
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
                </div> -->
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
                <!-- <div class="container">
                  xdc,ucf sym:
                  <span class="fpgalabel2" align="center">&nbsp;&nbsp;</span>
                  <span class="fpgalabel2" align="center">A18</span>
                  <span class="fpgalabel2" align="center">B16</span>
                  <span class="fpgalabel2" align="center">B17</span>
                  <span class="fpgalabel2" align="center">A15</span>
                  <span class="fpgalabel2" align="center">A16</span>
                  <span class="fpgalabel2" align="center">A13</span>
                  <span class="fpgalabel2" align="center">A14</span>
                </div> -->
              </div>

              <div class="col-lg-4 colmodule2" id="button_div1">
                <div class="row">
                  <!-- <div class="col">
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
                  </div> -->
                  <!-- <div class="col">
                    button
                    <el-button class="fpgabutton" type="danger" circle></el-button>
                  </div> -->
                  <!-- <div class="container"> -->
                    <!-- 同理，swData 表示开关, 需要处理函数 -->
                    <!-- <button
                      v-for="index in btnData.length"
                      :key="index"
                      class="btn btn-danger fpgabutton"
                      type="button"
                      @click="btnChange($event, btnData.length - index)"
                      
                    >
                    </button>
                  </div>
                  <div class="container">
                    <span
                      v-for="index in btnData.length"
                      :key="index"
                      class="fpgalabel3"
                      align="center"
                      >btn{{ btnData.length - index }}</span
                    >
                  </div> -->
                </div>
                <!-- <pre></pre> -->
                <!-- <div class="row">
                  <div class="container">
                    clk btn pins:
                    <span class="fpgalabel5" align="center">clk_btn</span>
                  </div>
                  <div class="container">
                    xdc,ucf sym:
                    <span class="fpgalabel5" align="center">B18</span>
                  </div>
                </div> -->
              </div>
            </div>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted,onUnmounted, onBeforeUnmount, reactive } from "vue";
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import emitter from "../components/websocket/event_bus";
import initWebsocket, { getWebSocketStatus }  from "../components/websocket/websocket";
import axios from "axios";
import { ElMessageBox,ElMessage } from 'element-plus'

//import axios from 'axios'
//let params = new URLSearchParams()
const UART_HELLO_MESSAGE =
  "\x1B[1;1mFPGAOL \x1B[1;1;36mUART \x1B[1;1;32mxterm\x1B[1;1;33m.\x1B[1;1;31mjs \x1B[1;1;35m1.1\x1B[0m\r\n";

const xtermElement = ref(null);

const term = new Terminal();
const fitAddon = new FitAddon();
term.loadAddon(fitAddon);

const uart_display = ref(false);
const hexplay_display = ref(false);

const total_count = ref(0);
const available_count = ref(0);

const pi_id = ref(0);

const connect_ok = ref(false);

const textareaValue = ref('');

const notification = reactive({
  visible: false,
  message: ''
});
// hexplay 数据数组, 第一维指定了多少组 hexplay, 第二维是 hexplay 的每一位
// 初始化为 1 组 hexplay, 初始数据为 0
const hexplayData = reactive([[...Array(8).keys()].map(() => "0")]);

// LED 数据数组, ledDate[idx] 是 bool, 表示第 idx 个 LED 是亮是灭
// 初始化为 8 个 false
const ledData = reactive([...Array(8).keys()].map(() => false));

// SW 数据数组, swData[idx] 是 bool, 表示第 idx 个 SW 是开是关
// 初始化为 8 个 false
const swData = reactive([...Array(8).keys()].map(() => false));

// BTN 数据数组, btnData[idx] 是 bool, 表示第 idx 个 BTN 是开是关
// 初始化为 1 个 false
const btnData = reactive([...Array(1).keys()].map(() => false));

const showNotification = (message) => {
  notification.message = message;
  notification.visible = true;
  setTimeout(() => { notification.visible = false; }, 3000); // 3秒后自动隐藏
};

emitter.on("websocket_connect", function (websocket_connect) {
        connect_ok.value = websocket_connect
        if (!websocket_connect){
          pi_id.value = 0;
        }
      });

const send_uart = () => {
    console.log(textareaValue.value); // 处理 textarea 的值
    emitter.emit("term-send", textareaValue.value);
};

const swChange = (e, index) => {
  if (!e) return;
  swData[index] = !swData[index];
  console.log(swData);
  emitter.emit("sw-change", index, swData[index]);
};
var sw_cnt = 8;
var periphs_init = localStorage.getItem("periphs");
if (periphs_init) {
    periphs_init = JSON.parse(periphs_init);
    sw_cnt = periphs_init["sw"];
}

const btnChange = (e, index) => {
  if (!e) return;
  btnData[index] = !btnData[index];
  console.log(btnData);
  emitter.emit("sw-change", index+sw_cnt, btnData[index]);
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
  const piPadded = String(pi_id.value).padStart(3, '0'); // 确保 ID 是三位数
  const uploadUrl = `http://202.38.79.96:12${piPadded}/upload/?token=token_debug_ignore`;
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
            var periphs = localStorage.getItem("periphs");
            emitter.emit("submit-json", periphs);
            // showNotification('烧写成功！');
            ElMessage({
              message: '烧写成功',
              type: 'success'
            });
          } else {
            console.log("Failed");
          }
        }
      };
      xhr.open(
        "POST",
        uploadUrl
        //"http://202.38.79.134:12169/upload/?token=token_debug_ignore"
      );
      xhr.send(fd);
    });
}

function initperiphs() {
  var j = { id: -2, periphs: [] };
  var led_cnt = 8;
  var sw_cnt = 8;
  var btn_cnt = 1;
  var uart_cnt = 1;
  var hexplay_cnt = 1;
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
  return j;
}

async function connect() {
    if (!connect_ok.value) {
    // 发送 POST 请求到 /acquire 接口
    const token = localStorage.getItem('Authorization'); // 假设 token 存储在 localStorage
    const params = new URLSearchParams();
    params.append('token', token);
    try {
      const response = await axios.post('http://202.38.79.96:9001/acquire', params);
      const allocated_pi = response.data.allocated_pi;
      if (allocated_pi) {
        pi_id.value = allocated_pi;
        // 使用获取到的树莓派 ID 连接 WebSocket
        initWebsocket(allocated_pi);
        update_pi_num();
        // emitter.emit("stop-notify");
        var periphs = localStorage.getItem("periphs");
        if (!periphs){
          periphs = JSON.stringify(initperiphs())
        }
      } else {
        console.error('No available Raspberry Pi');
        ElMessageBox.alert("无可用设备，请稍等再尝试", "无可用设备", {
          confirmButtonText: "确定"
        });
      }
    } catch (error) {
      console.error('Error acquiring Raspberry Pi:', error);
      ElMessageBox.alert("未能连接成功", "连接未成功", {
      confirmButtonText: "确定"
    });
    }
  } else {
    console.log("已经连接了");
    ElMessageBox.alert("设备已连接", "已连接", {
      confirmButtonText: "确定"
    });
  }
}

async function disconnect() {
    if (connect_ok.value) {
    // 发送 POST 请求到 /acquire 接口
    const token = localStorage.getItem('Authorization'); // 假设 token 存储在 localStorage
    const params = new URLSearchParams();
    params.append('token', token);
    try {
      const response = await axios.post('http://202.38.79.96:9001/release', params);
      update_pi_num();
      emitter.emit("close-socket");
    } catch (error) {
      console.error('Error disconnect Raspberry Pi:', error);
      ElMessageBox.alert("未能断开", "未断开", {
      confirmButtonText: "确定"
    });
    }
  } else {
    console.log("已经断开了");
    ElMessageBox.alert("设备已断开", "已断开", {
      confirmButtonText: "确定"
    });
  }
}
//检查xterm的父元素变化情况
const resizeObserver = new ResizeObserver(entries => {
      // 只处理尺寸变化逻辑，不需要检查entry.target
      fitAddon.fit();
    });

function update_pi_num(){
  axios.get("http://202.38.79.96:9001/pi_status").then((response) => {
        total_count.value=response.data["total_count"];
        available_count.value=response.data["available_count"];
      }).catch((error) => {
      console.error("请求树莓派数目失败:", error);
  });
}
function check_notify(){
  const status = getWebSocketStatus();
  const wsStatus = status[0];
  console.log(wsStatus)
  if (wsStatus === WebSocket.OPEN) {
    connect_ok.value=true;
    pi_id.value=status[1];
  } else {
    connect_ok.value=false;
    pi_id.value=0;
  }
  
  // emitter.emit("check_notify")
}

onMounted(() => {
  check_notify();
  var periphs = localStorage.getItem("periphs");
  if (periphs) {
    console.log(periphs);
    periphs = JSON.parse(periphs);
    // 根据 json 初始化 hexplayData, ledData, swData
    // 遍历 json.periphs 数组, 根据 type 是 'LED', 'BTN' 还是 'HEXPLAY'
    // 分别初始化 ledData, swData, hexplayData
    while (ledData.length > 0) ledData.pop();
    while (swData.length > 0) swData.pop();
    while (hexplayData.length > 0) hexplayData.pop();
    while (btnData.length > 0) btnData.pop();
    // for (let i = 0; i < periphs.periphs.length; ++i) {
    //   const periph = periphs.periphs[i];
    //   if (periph.type == "LED") {
    //     ledData.push(false);
    //   } else if (periph.type == "BTN") {
    //     swData.push(false);
    //   } else if (periph.type == "HEXPLAY") {
    //     hexplayData.push([...Array(8).keys()].map(() => "0"));
    //   }
    // }
    for (let i = 0; i < periphs.led; ++i) ledData.push(false);
    for (let i = 0; i < periphs.sw; ++i) swData.push(false);
    for (let i = 0; i < periphs.btn; ++i) btnData.push(false);
    if (periphs.hexplay>0) 
    {
      hexplayData.push([...Array(8).keys()].map(() => "0"));
      hexplay_display.value = true;
    }
    else hexplay_display.value = false;
    
    if (periphs.uart>0) {
      uart_display.value = true;
      term.open(xtermElement.value);
      fitAddon.fit();
      term.focus();
      term.write(UART_HELLO_MESSAGE);
      term.onData(function (val) {
        emitter.emit("term-send", val);
      });
      // 监听 eventBus 的一些事件
      emitter.on("term-recv", function (payload) {
        term.write(payload.replace(/\n/g,"\n\r"));
      });
      const xtermContainer = document.getElementById('xtermContainer');
      if (xtermContainer) {
        // 开始监听尺寸变化
        resizeObserver.observe(xtermContainer);
      }
    }
    else uart_display.value=false;
    console.log("reinit: ", ledData, swData, hexplayData);
  }
  // 监听 led-recv
  emitter.on("led-recv", function (idx, payload) {
    console.log("led-recv", idx, payload);
    ledData[idx] = payload ? true : false;
  });
  // 监听 hexplay-recv
  emitter.on("hexplay-recv", function (idx, payload) {
    hexplayDataChange(idx, payload);
  });
  update_pi_num();

});

onBeforeUnmount(() => {

  // 断开监听
  emitter.off("term-recv");
  emitter.off("led-recv");
  emitter.off("hexplay-recv");
  // 如果存在，停止监听尺寸变化
  const xtermContainer = document.getElementById('xtermContainer');
  if (xtermContainer) {
    resizeObserver.unobserve(xtermContainer);
  }
  term.dispose(); // 销毁 xterm 实例
});

</script>

<style>
@import "room.css";
@import "~xterm/css/xterm.css";
.notification {
  position: fixed;
  top: 80px; /* 留出一些距离 */
  left: 50%;
  z-index: 1000;
  transform: translateX(-50%);
  background-color: rgb(45,206,166); /* 更柔和的绿色 */
  color: #333; /* 文字颜色 */
  padding: 20px 60px; /* 增加内边距 */
  border-radius: 8px; /* 圆角边框 */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); /* 添加阴影效果 */
  font-size: 1.1em; /* 增加字体大小 */
}
</style>
