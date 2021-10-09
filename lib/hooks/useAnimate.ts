import { ref, Ref } from 'vue'
import {
    AcceptedElements,
    animate,
    AnimationControls,
    AnimationListOptions,
    MotionKeyframesDefinition
} from 'motion'

/**
 * Animate an element or multiple elements to a specific target.
 * @param target - The target element. Can be a ref or string.
 * @param keyframes - See https://motion.dev/dom/animate#keyframes.
 * @param options - See https://motion.dev/dom/animate#options.
 */
export const useAnimate = (
    target: Ref<HTMLElement | SVGElement> | string,
    keyframes: MotionKeyframesDefinition,
    options?: AnimationListOptions
) => {
    const animateInstance = ref<AnimationControls | null>(null)
    const isFinished = ref(false)

    const play = async () => {
        if (target) {
            let selectedType: AcceptedElements

            if (typeof target === 'string') {
                selectedType = target
            } else {
                selectedType = target.value
            }

            if (selectedType) {
                const currentAnimateInstance = animate(
                    selectedType,
                    keyframes,
                    options
                )
                isFinished.value = false
                animateInstance.value = currentAnimateInstance
                await currentAnimateInstance.finished.then(() => {
                    isFinished.value = true
                })
            }
        }
    }

    const reset = () => {
        animateInstance.value?.finish?.()

        if (typeof target !== 'string' && target.value) {
            Object.keys(target.value).forEach((key) => {
                target.value.style.removeProperty(key)
            })
        } else if (typeof target === 'string') {
            let selectedElements: NodeListOf<HTMLElement> =
                document.querySelectorAll(target)

            selectedElements.forEach((el) => {
                el.style && el.removeAttribute('style')
            });
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
        isFinished
    }
}