import emitter from "./event_bus.js";

let DEBUG_MODE = true;
let DEBUG_WS_SERVER = "202.38.79.96:12148";
//let DEBUG_WS_SERVER = "202.38.79.134:12169";

let notifySocket;
let PI_SERVER_ADDRESS = window.location.host;

let pi_id = 0;
let timeoutId;

export default function initWebsocket(allocated_pi) {
  pi_id = allocated_pi;
  const piPadded = String(allocated_pi).padStart(3, '0');
  const wsAddress = `ws://202.38.79.96:12${piPadded}/ws/`;
  console.log(wsAddress)
  // if (DEBUG_MODE) {
  //   notifySocket = new WebSocket("ws://" + DEBUG_WS_SERVER + "/ws/");
  // } else {
  //   notifySocket = new WebSocket("ws://" + PI_SERVER_ADDRESS + "/ws/");
  // }
  if (notifySocket && notifySocket.readyState === WebSocket.OPEN) {
    notifySocket.close();
  }
  notifySocket = new WebSocket(wsAddress);
  notifySocket.onopen = function (event) {
    // 在这里处理连接成功的情况
    console.log("WebSocket connection successfully established");
    emitter.emit("websocket_connect",true);
    // 设置 20 分钟后自动断开连接
    timeoutId = setTimeout(() => {
      closeWebSocket();
    }, 20 * 60 * 1000);  // 20 分钟
  };  
  notifySocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    console.log("receive message:", data);
    //print("hhh");
    // console.log("bbb");
    const type = data["type"];
    const idx = data["idx"];
    let payload = data["payload"];
    if (type == "LED") {
      emitter.emit("led-recv", idx, payload);
    } else if (type == "UART") {
      emitter.emit("term-recv", payload);
    } else if (type == "HEXPLAY") {
      payload = parseInt(payload);
      emitter.emit("hexplay-recv", idx, payload);
    } else if (type == "WF") {
      // document.getElementById("download").innerHTML = "Download";
      // $("#download").attr("href", "./waveform.vcd");
    } else if (type == "XDC") {
      emitter.emit("dispatch-xdc", payload);
    }
  };
  notifySocket.onclose = function (event) {
    // 在这里处理连接关闭的情况
    console.log("WebSocket connection closed", event);
    emitter.emit("websocket_connect",false);
  };
}

export function getWebSocketStatus() {
  return [notifySocket ? notifySocket.readyState : WebSocket.CLOSED, pi_id];
}


function closeWebSocket() {
  if (notifySocket) {
    if (timeoutId) {
      clearTimeout(timeoutId);  // 清除定时器
    }
    sendStopNotify();
    notifySocket.close();
    console.log("WebSocket connection closed");
  }
}

emitter.on("close-socket", function () {
  closeWebSocket();
});

function sendJson(json) {
  console.log("websocket sendjson: ",json);
  notifySocket.send(json);
}

function sendStartNotify(json) {
  console.log("sendStartNotify in ");
  var data = JSON.parse(json);
  var id = data["id"];
  if (id == -2) {
    notifySocket.send(json);
  } else {
    console.log("sendStartNotify: wrong id!");
  }
}

function sendStopNotify() {
  notifySocket.send(
    JSON.stringify({
      id: -1,
    })
  );
}

emitter.on("stop-notify", function () {
  sendStopNotify();
});

emitter.on("submit-json", function (init_json) {
  setTimeout(function () {
    sendStartNotify(init_json);
  }, 1000);
});

emitter.on("term-send", function (val) {
  sendJson(
    JSON.stringify({
      id: -3,
      type: "UART",
      idx: 0,
      payload: val,
    })
  );
});

emitter.on("sw-change", function (idx, val) {
  console.log("SW", idx, val);
  sendJson(
    JSON.stringify({
      id: -3,
      type: "BTN",
      idx: idx,
      payload: val,
    })
  );
});
