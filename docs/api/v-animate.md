To use the `v-animate` directive, install the plugin in your Vue app entry file:

```ts
import { createApp } from 'vue'
import { MotionOnePlugin } from 'vue-motion-one'
import App from './App.vue'

const app = createApp(App)

app.use(MotionOnePlugin)

app.mount('#app')
```

You can now animate any element using `v-animate` directive.

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

### Props

| Key | Type | Description |
| :----- | :-------- | :---------- |
| keyframes | Object | [Animate keyframes](https://motion.dev/dom/animate#keyframes) |
| options | Object | [Animate options](https://motion.dev/dom/animate#options) |