# vue-motion

Vue directive for [Motion](https://motion.dev/).

## Installation

```bash
npm install @jsrob/vue-motion
```

## Usage

1. Install the plugin

```ts
import { MotionPlugin } from '@jsrob/vue-motion'
import { createApp } from 'vue'
import App from './App.vue'

const app = createApp(App)
app.use(MotionPlugin)
app.mount('#app')
```

2. Use the directive

```vue
<template>
  <div v-animate="{ keyframes: { opacity: 1, rotate: 90 }, options: { duration: 0.6 } }" />
</template>
```

To access an animate instance, you can pass a `key` to the element and use the `useAnimations` composable:

```vue
<script setup>
const animations = useAnimations()

function someMethod() {
  animations.box.stop()
}
</script>

<template>
  <div v-animate="{ key: 'box', keyframes: { opacity: 1, rotate: 90 }, options: { duration: 0.6 } }" />
</template>
```

## License

MIT
