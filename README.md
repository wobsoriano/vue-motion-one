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

### TODO
- [ ] Timeline
- [ ] Stagger