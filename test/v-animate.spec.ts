import { mount } from '@vue/test-utils'
import { defineComponent } from 'vue'
import { describe, expect, it } from 'vitest'
import { AnimateDirective } from '../src'

const App = defineComponent({
  template: `<template>
    <div v-animate :keyframes="{ transform: 'rotate(45deg)' }" ref="box">Box</div>
  </template>
  `,
})

const wrapper = mount(App, {
  global: {
    directives: {
      animate: AnimateDirective(),
    },
  },
})

describe('v-animate', () => {
  it('should be defined', () => {
    expect(wrapper).toBeDefined()
  })

  it('animates an element', async() => {
    expect((wrapper.vm.$refs.box as HTMLElement).style.transform).toBe('rotate(45deg)')
  })
})
