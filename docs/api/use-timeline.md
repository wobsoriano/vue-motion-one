Create complex sequences of animations across multiple elements. It wraps the [timeline](https://motion.dev/dom/timeline) function.

### Example

```html
<script setup>
import { ref, onMounted } from 'vue'
import { useTimeline } from 'vue-motion-one'

const boxRef = ref()

const { play } = useTimeline(
    [
        ['.box', { x: 100 }],
        [boxRef, { x: 100 }] // use refs too
    ],
    { duration: 1 }
)

onMounted(() => {
  play()
})
</script>

<template>
  <div class="box"></div>
  <div ref="boxRef"></div>
</template>
```

`useTimeline` returns:

-   `play`: plays the animation
-   `replay`: Resets and plays the animation
-   `reset`: resets the element to its original styling
-   `stop`: stops the animation
-   `isFinished`: is `true` when animation has finished playing
-   `timelineInstance`: Animation Controls. Refer to [motion one docs](https://motion.dev/dom/controls) for more.

`useTimeline` accepts:

-   `sequence` - Array of animations with the same settings as the animate function. In the arrays, the element can be either a ref or a string. You can refer to [sequence docs](https://motion.dev/dom/timeline#sequence) for more on this.
-   `options` - Optional parameter. Refer to [motion one docs](https://motion.dev/dom/animate#options) for the values you could pass to this.
