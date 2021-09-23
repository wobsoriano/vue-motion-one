<script setup lang="ts">
import { onMounted } from 'vue';
import { useMotions } from './directive'

const motions = useMotions()
</script>

<template>
  <div
  id="box"
  v-motion="'motion'"
  :keyframes="{ rotate: 90 }"
  :options="{
    duration: 0.5,
    easing: 'ease-in-out',
    repeat: 5,
    direction: 'alternate'
  }"
  ></div>
</template>

<style>
body {
  background-color: black;
}

#box {
  width: 100px;
  height: 100px;
  border-radius: 10px;
  background-color: #00ffdb;
}
</style>