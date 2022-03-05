import type { Ref } from 'vue'
import { ref } from 'vue'
import type {
  AnimationControls,
} from '@motionone/types'
import type {
  AcceptedElements,
  AnimationOptionsWithOverrides,
  MotionKeyframesDefinition,
} from '@motionone/dom'
import {
  animate,
} from 'motion'

/**
 * Animate an element or multiple elements to a specific target.
 * @param target - The target element. Can be a ref or string.
 * @param keyframes - See https://motion.dev/dom/animate#keyframes.
 * @param options - See https://motion.dev/dom/animate#options.
 */
export const useAnimate = (
  target: Ref<HTMLElement | SVGElement | undefined> | string,
  keyframes: MotionKeyframesDefinition,
  options?: AnimationOptionsWithOverrides,
) => {
  const animateInstance = ref<AnimationControls | null>(null)
  const isFinished = ref(false)

  const play = () => {
    if (target) {
      let selectedType: AcceptedElements

      if (typeof target === 'string')
        selectedType = target

      else
        selectedType = target.value!

      if (selectedType) {
        const currentAnimateInstance = animate(
          selectedType,
          keyframes,
          options,
        )
        isFinished.value = false
        animateInstance.value = currentAnimateInstance
        currentAnimateInstance.finished.then(() => {
          isFinished.value = true
        })
      }
    }
  }

  const reset = () => {
    animateInstance.value?.stop?.()

    if (typeof target !== 'string' && target.value) {
      target.value.removeAttribute('style')
    }
    else if (typeof target === 'string') {
      const selectedElements: NodeListOf<HTMLElement>
                = document.querySelectorAll(target)

      selectedElements.forEach((el) => {
        el.style && el.removeAttribute('style')
      })
    }
  }

  const replay = () => {
    reset()
    isFinished.value && play()
  }

  return {
    animateInstance,
    play,
    reset,
    replay,
    isFinished,
  }
}
