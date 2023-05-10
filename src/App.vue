<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import initWebsocket from "./components/websocket/websocket";
initWebsocket();
</script>
