import {
    Plugin,
    Directive,
    VNode,
    DirectiveBinding,
} from 'vue'
import {
    animate,
    AnimationControls,
    stagger
} from 'motion'

type AnimationControlMap = Record<string, AnimationControls>

const motionState: AnimationControlMap = {}

const directive = (): Directive<HTMLElement | SVGElement> => {
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
        if (key && motionState[key]) motionState[key].stop()

        if (!node.props?.keyframes) {
            console.error(
                `Keyframes prop is required!`
            )
        }

        let animation: AnimationControls

        // Check if arg stagger is present
        if (binding.arg && binding.arg === 'stagger') {
            // @ts-ignore
            const childrenElements = node?.children?.map((i) => i.el)
            const options = {
                ...node.props?.options,
                delay: stagger(0.1, node.props?.staggerOptions)
            }
            animation = animate(
                childrenElements,
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
            motionState[key] = animation
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
        app.directive('animate', directive())
    }
}

export const useMotions = () => {
    return motionState
}