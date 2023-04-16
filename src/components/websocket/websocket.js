// TODO: import websocker from APP.vue and mount ws after app init
import { emitter } from "./event-bus.js";

let DEBUG_MODE = false;
let DEBUG_WS_SERVER = "127.0.0.1:8090";

let notifySocket;
let PI_SERVER_ADDRESS = window.location.host;

if (DEBUG_MODE) {
  notifySocket = new WebSocket("ws://" + DEBUG_WS_SERVER + "/ws/");
} else {
  notifySocket = new WebSocket("ws://" + PI_SERVER_ADDRESS + "/ws/");
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
  // TODO: notice program2 for the new json!
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

// TODO: implement it in Program2.vue
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

// above code is done!

notifySocket.onmessage = function (e) {
  const data = JSON.parse(e.data);
  //console.log("receive message:", data);
  const type = data["type"];
  const idx = data["idx"];
  let payload = data["payload"];
  if (type == "LED") {
    //console.log("LED MSG", idx, payload);
    // TODO: implement it in Program2.vue
    emitter.emit("led-recv", idx, payload);
  } else if (type == "UART") {
    emitter.emit("term-recv", payload);
  } else if (type == "HEXPLAY") {
    //console.log("HEXPLAY", idx, payload);
    payload = parseInt(payload);
    // TODO: implement it in Program2.vue
    emitter.emit("hexplay-recv", idx, payload);
    // for (var i = 0; i < 8; ++i) {
    //   $("#hexplay" + idx + "_span" + i).html(
    //     payload == -1
    //       ? "&nbsp;"
    //       : [...Array(16).keys()].map((i) => i.toString(16))[
    //           (payload >>> (4 * (7 - i))) % 0x10
    //         ]
    //   );
    // }
  } else if (type == "WF") {
    // document.getElementById("download").innerHTML = "Download";
    // $("#download").attr("href", "./waveform.vcd");
  } else if (type == "XDC") {
    emitter.emit("dispatch-xdc", payload);
  }
};

// Waveform generation
// $("#generate").click(function () {
//   $("#generate").attr("disabled", "true");
//   document.getElementById("download").innerHTML = "Waiting...";
//   sendStopNotify();
// });
