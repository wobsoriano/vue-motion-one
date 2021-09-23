import { Plugin, Directive, VNode, DirectiveBinding, ref, Ref } from 'vue'
import { animate, AnimationControls } from 'motion'

const motionState: Record<string, AnimationControls> = {}

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

        const animation = animate(
            el,
            node.props?.keyframes,
            node.props?.options
        )
        motionState[key] = animation

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

const MotionPlugin: Plugin = {
    install(app) {
        app.directive('motion', directive())
    }
}

export const useMotions = () => {
    return motionState
}

export default MotionPlugin