`v-animate` is a directive that uses the [animate](https://motion.dev/dom/animate) function to animate an element to a specific target.

To use it, install the plugin in your Vue app entry file:

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

### Access a v-animate instance

If you want to access a `v-animate`, you will have to give the element a name as `v-animate` value.

Then you can just call `useAnimations`, and get access to that `v-animate` controls using its `name` as a `key`.

```html
<script setup>
import { useAnimations } from 'vue-motion-one'

const animations = useAnimations()

const someMethod = () => {
  animations.box.stop()
}
</script>

<template>
  <div
    v-animate="'box'"
    :keyframes="{
      transform: 'rotate(45deg)'
    }"
    :options="{
      duration: 0.5
    }"
  />
</template>
```

### Nuxt 3

To use the `v-animate` directive in Nuxt 3, create a file in your plugins folder and add this:

```ts
// plugins/motion.ts
import { MotionOnePlugin } from 'vue-motion-one'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(MotionOnePlugin)
})
```
