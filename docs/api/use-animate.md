Animate an element or multiple elements to a specific target. It wraps the [animate](https://motion.dev/dom/animate) function.

### Example

```html
<script setup>
import { ref, onMounted } from 'vue'
import { useAnimate } from 'vue-motion-one'

const boxRef = ref()

const { play } = useAnimate(
    boxRef,
    { transform: 'rotate(45deg)' },
    { duration: 0.5 }
)

onMounted(() => {
  play()
})
</script>

<template>
  <div class="box" ref="boxRef"></div>
</template>
```

`useAnimate` returns:

-   `play`: plays the animation
-   `replay`: Resets and plays the animation
-   `reset`: resets the element to its original styling
-   `isFinished`: is `true` when animation has finished playing
-   `animateInstance`: Animation Controls. Refer to [motion one docs](https://motion.dev/dom/controls) for more.

`useAnimate` accepts:

-   `target` - The target element. Can be a ref or string.
-   `keyframes` - Element will animate from its current style to those defined in the keyframe. Refer to [motion one docs](https://motion.dev/dom/animate#keyframes) for more.
-   `options` - Optional parameter. Refer to [motion one docs](https://motion.dev/dom/animate#options) for the values you could pass to this.