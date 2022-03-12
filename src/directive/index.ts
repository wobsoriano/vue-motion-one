import type {
  Directive,
  DirectiveBinding,
  Plugin,
  VNode,
} from 'vue'
import type {
  AnimationControls,
} from '@motionone/types'
import {
  animate,
} from 'motion'

const motionState: Record<string, AnimationControls> = {}

export const AnimateDirective = (): Directive<HTMLElement | SVGElement> => {
  const register = (
    el: HTMLElement | SVGElement,
    binding: DirectiveBinding,
    node: VNode<
    any,
    HTMLElement | SVGElement,
    Record<string, any>
    >,
  ) => {
    // Get instance key if possible (binding value or element key in case of v-for's)
    const key = binding.value || node.key

    // Cleanup previous animation if it exists
    if (key && motionState[key]) motionState[key].stop()

    if (!node.props?.keyframes) {
      console.error(
        'Keyframes prop is required!',
      )
    }

    const animation = animate(
      el,
      node.props?.keyframes,
      node.props?.options,
    )

    if (key)
      motionState[key] = animation

    // Pass the motion instance via the local element
    // @ts-expect-error: Attach instance to element for unmounting
    el.motionInstance = animation
  }

  const unregister = (el: HTMLElement | SVGElement) => {
    // Cleanup the unregistered element animation
    // @ts-expect-error: Check instance in element for unmounting
    if (el.motionInstance) el.motionInstance.stop()
  }

  return {
    mounted: register,
    unmounted: unregister,
  }
}

export const MotionOnePlugin: Plugin = {
  install(app) {
    app.directive('animate', AnimateDirective())
  },
}

export const useAnimations = () => {
  return motionState
}
