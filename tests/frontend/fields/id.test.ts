import IdIndex from '../../../inertia/components/fields/id/index.vue'
import TextForm from '../../../inertia/components/fields/text/form.vue'
import { mount } from '@vue/test-utils'
import Id from '../../../src/fields/id.js'
import CockpitPlugin from '../../../inertia/plugin.js'

describe('index', () => {
  test('render numbers with #', () => {
    const field = Id.make('id')

    const wrapper = mount(IdIndex, {
      props: {
        field: field.toJSON(),
        value: 12,
      },
    })

    expect(wrapper.text()).toBe('#12')
  })

  test('render strings without #', () => {
    const field = Id.make('id')

    const wrapper = mount(IdIndex, {
      props: {
        field: field.toJSON(),
        value: 'f2004007-c3b9-4dc9-b38c-3cf1e4597478',
      },
    })

    expect(wrapper.text()).toBe('f2004007-c3b9-4dc9-b38c-3cf1e4597478')
  })
})

describe('form', () => {
  test('disabled by default', () => {
    const field = Id.make('id')

    const wrapper = mount(TextForm, {
      global: {
        plugins: [[CockpitPlugin, { primeVue: {} }]],
      },
      props: {
        field: field.toJSON(),
        modelValue: '12',
      },
    })

    const input = wrapper.get('input')
    expect(input.attributes()['disabled']).toBeDefined()
  })
})
