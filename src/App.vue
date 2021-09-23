<script setup lang="ts">
import { useMotions } from '../lib'

const motions = useMotions()
</script>

<template>
  <div
  class="box"
  v-animate="'motion'"
  :keyframes="{ rotate: 90 }"
  :options="{
    duration: 0.5,
    easing: 'ease-in-out',
    repeat: 100,
    direction: 'alternate'
  }"
  ></div>
  <div id="controls">
    <button @click="motions.motion.pause()">Pause</button>
    <button @click="motions.motion.play()">Play</button>
    <button @click="motions.motion.stop()">Stop</button>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
}

body {
  /* background-color: #0F1115; */
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.box {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #00ffdb;
}

#controls {
  margin-top: 30px;
}

#controls button {
  margin-right: 10px;
}
</style>