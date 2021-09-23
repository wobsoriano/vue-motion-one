# v-motion

A Vue 3 plugin for adding [Motion One](https://motion.dev/) bindings to Vue components.

## Installation

```sh
yarn add v-motion motion
```

```ts
import { createApp } from 'vue'
import { MotionPlugin } from 'v-motion'
import App from './App.vue'

const app = createApp(App)

app.use(MotionPlugin)

app.mount('#app')
```

## Usage

```html
<template>
  <div
    v-motion
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

To access a motion instance, add a value to the `v-motion` directive. It will then be accessible using `useMotions` composable.

```html
<script setup>
import { useMotions } from 'v-motion'

const motions = useMotions()

// motions.box.stop()
</script>

<template>
  <div
    v-motion="box"
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