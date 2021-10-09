import { ref, computed, isRef, Ref } from 'vue'
import {
    AcceptedElements,
    timeline,
    AnimationControls,
    AnimationListOptions,
    MotionKeyframesDefinition
} from 'motion'
import type { TimelineOptions } from 'motion/types/targets/dom/timeline'
import type { TimelineDefinition } from 'motion/types/targets/dom/timeline/types'

type ModifiedAcceptedElements = AcceptedElements | Ref<HTMLElement | SVGElement | undefined>

type Segment =
    | [ModifiedAcceptedElements, MotionKeyframesDefinition]
    | [ModifiedAcceptedElements, MotionKeyframesDefinition, AnimationListOptions]

type SequenceDefinition = Segment[]

const convertRefsToElement = (sequence: SequenceDefinition) => {
    const modifiedSequence: any[] = []
    sequence.forEach((array) => {
        const clone = [...array]
        if (isRef(clone[0])) {
            if (clone[0].value) {
                clone[0] = clone[0].value
            }
        }
        modifiedSequence.push(clone)
    })
    return modifiedSequence as TimelineDefinition
}

/**
 * Create complex sequences of animations across multiple elements.
 * @param sequence - Array of animations with the same settings as the animate function. Target can be a ref or string.
 * @param options - See https://motion.dev/dom/timeline#options.
 */
export const useTimeline = (
    sequence: SequenceDefinition,
    options?: TimelineOptions
) => {
    const timelineInstance = ref<AnimationControls | null>(null)
    const isFinished = ref(false)

    const modifiedSequence = computed(() => convertRefsToElement(sequence))

    const play = async () => {
        const currentTimelineInstance = timeline(
            modifiedSequence.value,
            options
        )
        isFinished.value = false
        timelineInstance.value = currentTimelineInstance
        await currentTimelineInstance.finished
        isFinished.value = true
    }

    const reset = () => {
        timelineInstance.value?.stop?.()

        sequence.forEach((el) => {
            const selector = el[0]
            if (isRef(selector) && selector.value) {
                selector.value.removeAttribute('style')
            } else if (typeof selector === 'string') {
                const selectedElements: NodeListOf<HTMLElement> =
                    document.querySelectorAll(selector)

                selectedElements.forEach((el) => {
                    el.style && el.removeAttribute('style')
                })
            }
        })
    }

    const replay = () => {
        reset()
        isFinished.value && play()
    }

    return {
        timelineInstance,
        play,
        reset,
        replay,
        isFinished
    }
}