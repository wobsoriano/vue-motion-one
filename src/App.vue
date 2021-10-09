<script setup lang="ts">
import { useAnimations, useAnimate } from '../lib'

const animations = useAnimations()
const {
  play,
  replay
} = useAnimate(
  '.box',
  { rotate: 180 },
)
</script>

<template>
  <div class="box" style="z-index: 1"></div>
  <div id="controls">
    <button @click="play">Play</button>
    <button @click="replay">replay</button>
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