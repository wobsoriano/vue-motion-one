import type {
  Directive,
  DirectiveBinding,
  Plugin,
} from 'vue'
import {
  animate,
} from 'motion'
import type { DOMKeyframesDefinition, DynamicAnimationOptions } from 'motion/react'

const createOrUpdateAnimation = (el: HTMLElement | SVGElement, binding: DirectiveBinding<{
  keyframes: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
}>) => {
  // Cleanup existing animation
  // @ts-expect-error: Check instance in element for unmounting
  el.__internal_motion_instance?.stop()

  // Create new animation
  const { keyframes, options } = binding.value
  // @ts-expect-error: Attach instance to element for unmounting
  el.__internal_motion_instance = animate(el, keyframes, options)
}

export const vAnimate: Directive<HTMLElement | SVGElement, {
  keyframes: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
}> = {
  mounted: createOrUpdateAnimation,
  updated: createOrUpdateAnimation,
  unmounted(el) {
    // @ts-expect-error: Check instance in element for unmounting
    el.__internal_motion_instance?.stop()
  },
}

export const MotionPlugin: Plugin = {
  install(app) {
    app.directive('animate', vAnimate)
  },
}
