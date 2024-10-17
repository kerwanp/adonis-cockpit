import IdIndex from '../../../resources/components/fields/id/index.vue'
import TextForm from '../../../resources/components/fields/text/form.vue'
import { mount } from '@vue/test-utils'
import Id from '../../../src/fields/id.js'
import CockpitPlugin from '../../../src/plugins/vue/index.js'
import { FieldContextSymbol, provideField } from '../../../resources/composables/field.js'

describe('index', () => {
  test('render numbers with #', () => {
    const field = Id.make('id')

    const wrapper = mount(IdIndex, {
      props: {
        field: field.toJSON(),
        value: 12,
        record: {},
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
        record: {},
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
        provide: {
          [FieldContextSymbol]: field.toJSON(),
        },
      },
    })

    const input = wrapper.get('input')
    expect(input.attributes()['disabled']).toBeDefined()
  })
})
