import type { DOMKeyframesDefinition, DynamicAnimationOptions } from 'motion/react'
import {
  type Directive,
  type DirectiveBinding,
  inject,
  InjectionKey,
  type Plugin,
  reactive,
  readonly,
  type VNode,
} from 'vue'
import {
  animate,
} from 'motion'

// TODO: Import this later in motion
type AnimationPlaybackControls = any

interface MotionElement extends HTMLElement {
  __internal_motion_instance?: AnimationPlaybackControls
}

interface MotionSVGElement extends SVGElement {
  __internal_motion_instance?: AnimationPlaybackControls
}

interface DirectiveValue {
  keyframes: DOMKeyframesDefinition
  options?: DynamicAnimationOptions
  key?: string
}

const AnimationsKey = Symbol('animations') as InjectionKey<{ [key: string]: AnimationPlaybackControls | undefined }>

export const MotionPlugin: Plugin = {
  install(app) {
    const animationMap = reactive<{ [key: string]: AnimationPlaybackControls | undefined }>({})

    function createOrUpdateAnimation(el: MotionElement | MotionSVGElement, binding: DirectiveBinding<DirectiveValue>, node: VNode) {
      const key = binding.value.key || node.key as string

      if (key && animationMap[key]) {
        animationMap[key]?.stop()
      }

      const { keyframes, options } = binding.value
      const animateResult = animate(el, keyframes, options)

      if (key) {
        animationMap[key] = animateResult
      }

      el.__internal_motion_instance = animateResult
    }

    const vAnimate: Directive<MotionElement | MotionSVGElement, DirectiveValue> = {
      mounted: createOrUpdateAnimation,
      updated: createOrUpdateAnimation,
      unmounted(el, binding, node) {
        const key = binding.value.key || node.key as string

        el.__internal_motion_instance?.stop()

        if (key && animationMap[key]) {
          delete animationMap[key]
        }
      },
    }

    app.directive('animate', vAnimate)
    app.provide('animations', AnimationsKey)
  },
}

export function useAnimations() {
  const animations = inject(AnimationsKey)

  if (!animations) {
    throw new Error('useAnimations() was called outside of the MotionPlugin')
  }

  return readonly(animations)
}
