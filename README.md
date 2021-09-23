# vue-motion-one

A Vue 3 plugin for adding [Motion One](https://motion.dev/) bindings to Vue components.

## Installation

```sh
yarn add vue-motion-one motion
```

## Usage

In your Vue app entry file:

```ts
import { createApp } from 'vue'
import { MotionOnePlugin } from 'vue-motion-one'
import App from './App.vue'

const app = createApp(App)

app.use(MotionOnePlugin)

app.mount('#app')
```

You can now animate any component `v-animate`.

```html
<template>
  <div
    v-animate
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

Use the `stagger` arg to apply animation delay to each of the element's children.

```html
<template>
  <ul
    v-animate:stagger
    :keyframes="{
      opacity: 1
    }"
    :delayDuration="0.2"
    :staggerOptions="{
      easing: 'ease-out'
    }"
  >
    <li v-for="n in 10" :key="n">{{ n }}</li>
  </ul>
</template>
```


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