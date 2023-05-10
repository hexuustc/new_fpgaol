import emitter from "./event_bus.js";

let DEBUG_MODE = true;
let DEBUG_WS_SERVER = "202.38.79.96:12148";

let notifySocket;
let PI_SERVER_ADDRESS = window.location.host;

export default function initWebsocket() {
  if (DEBUG_MODE) {
    notifySocket = new WebSocket("ws://" + DEBUG_WS_SERVER + "/ws/");
  } else {
    notifySocket = new WebSocket("ws://" + PI_SERVER_ADDRESS + "/ws/");
  }
  notifySocket.onmessage = function (e) {
    const data = JSON.parse(e.data);
    //console.log("receive message:", data);
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
}

function sendJson(json) {
  console.log(json);
  notifySocket.send(json);
}

function sendStartNotify(json) {
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

emitter.on("submit-json", function (init_json) {
  sendStopNotify();
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
