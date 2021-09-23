import { inject } from 'vue'

export const useMotions = () => {
    const motions = inject('motionstate')
    return motions
}