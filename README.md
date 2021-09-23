# vue-motion-one

A Vue 3 plugin for adding [Motion One](https://motion.dev/) bindings to Vue components.

## Installation

```sh
yarn add vue-motion-one motion
```

```ts
import { createApp } from 'vue'
import { MotionOnePlugin } from 'vue-motion-one'
import App from './App.vue'

const app = createApp(App)

app.use(MotionOnePlugin)

app.mount('#app')
```

## Usage

```html
<template>
  <div
    vue-motion-one
    :keyframes="{
      transform: 'rotate(45deg)'
    }"
    :options="{
      duration: 0.5
    }"
  />
</template>
```

### Stagger

Applies an animation delay to a children of an element.

### Access motion instances

To access a motion instance, add a value to the `vue-motion-one` directive. It will then be accessible using `useMotions` composable.

```html
<script setup>
import { useMotions } from 'vue-motion-one'

const motions = useMotions()

// motions.box.stop()
</script>

<template>
  <div
    vue-motion-one="box"
    :keyframes="{
      transform: 'rotate(45deg)'
    }"
    :options="{
      duration: 0.5
    }"
  />
</template>
```

### TODO
- [x] Stagger
- [ ] Timeline