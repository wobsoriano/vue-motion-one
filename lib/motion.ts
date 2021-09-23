import {
    Plugin,
    Directive,
    VNode,
    DirectiveBinding,
    Ref,
    triggerRef,
    shallowRef,
    inject
} from 'vue'
import {
    animate,
    AnimationControls,
    stagger
} from 'motion'

type AnimationControlMap = Record<string, AnimationControls>

const directive = (motionState: Ref<AnimationControlMap>): Directive<HTMLElement | SVGElement> => {
    const register = (
        el: HTMLElement | SVGElement, 
        binding: DirectiveBinding,
        node: VNode<
            any,
            HTMLElement | SVGElement,
            {
                [key: string]: any
            }
        >
    ) => {
        // Get instance key if possible (binding value or element key in case of v-for's)
        const key = binding.value || node.key
        
        // Cleanup previous animation if it exists
        if (key && motionState.value[key]) motionState.value[key].stop()

        if (!node.props?.keyframes) {
            console.error(
                `Keyframes prop is required!`
            )
        }

        let animation: AnimationControls

        // Check if arg stagger is present
        if (binding.arg && binding.arg === 'stagger') {
            // @ts-ignore
            const childElements = node?.children?.map((i) => i.el)
            const options = {
                ...node.props?.options,
                delay: stagger(0.1)
            }
            animation = animate(
                childElements,
                node.props?.keyframes,
                options
            )
        } else {
            animation = animate(
                el,
                node.props?.keyframes,
                node.props?.options
            )
        }
        
        if (key) {
            motionState.value[key] = animation
            triggerRef(motionState)
        }

        // Pass the motion instance via the local element
        // @ts-ignore
        el.motionInstance = animation
    }

    const unregister = (el: HTMLElement | SVGElement) => {
        // Cleanup the unregistered element animation
        // @ts-ignore
        if (el.motionInstance) el.motionInstance.stop()
    }

    return {
        mounted: register,
        unmounted: unregister
    }
}

export const MotionPlugin: Plugin = {
    install(app) {
        const motionState = shallowRef<AnimationControlMap>({})
        app.provide('motionState', motionState)
        app.directive('motion', directive(motionState))
    }
}

export const useMotions = () => {
    const motionState = inject<Ref<AnimationControlMap>>('motionState')
    if (!motionState) {
        throw new Error('Cannot find motionState')
    }

    return motionState
}