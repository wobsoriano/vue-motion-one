import { mount } from '@vue/test-utils'
import { nextTick, ref } from 'vue'
import { describe, expect, it } from 'vitest'
import { useAnimate } from '../src'

const TestComponent = {
  template: '<div>Hello world</div>',
}

const getElementRef = () => {
  const c = mount(TestComponent)

  return ref<HTMLElement>(c.element as HTMLElement)
}

describe('useAnimate', () => {
  it('accepts an element', () => {
    const element = getElementRef()

    const { animateInstance, play, reset, replay, isFinished } = useAnimate(element, { transform: 'rotate(45deg)' })

    expect(animateInstance).toBeDefined()
    expect(play).toBeDefined()
    expect(reset).toBeDefined()
    expect(replay).toBeDefined()
    expect(isFinished).toBeDefined()
  })

  it('animates an element', async() => {
    const element = getElementRef()

    const { play, isFinished } = useAnimate(element, { transform: 'rotate(45deg)' })

    expect(isFinished.value).toBe(false)
    play()
    await nextTick()
    await nextTick()
    expect(element.value.style.transform).toBe('rotate(45deg)')
    expect(isFinished.value).toBe(true)
  })
})
