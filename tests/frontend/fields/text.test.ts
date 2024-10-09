import TextForm from '../../../resources/components/fields/text/form.vue'
import Text from '../../../src/fields/text.js'
import { mount } from '@vue/test-utils'
import CockpitPlugin from '../../../src/plugins/vue/index.js'

describe('form', () => {
  test('no configuration', async () => {
    const field = Text.make('firstName')

    const wrapper = mount(TextForm, {
      global: {
        plugins: [[CockpitPlugin, { primeVue: {} }]],
      },
      props: {
        'field': field.toJSON(),
        'modelValue': 'Adonis Cockpit',
        'onUpdate:modelValue': (value: any) => {
          wrapper.setProps({ modelValue: value })
        },
      },
    })

    const input = wrapper.find('input')

    expect(wrapper.props('modelValue')).toBe('Adonis Cockpit')

    await input.setValue('Martin')
    expect(wrapper.props('modelValue')).toBe('Martin')

    await input.setValue('')
    expect(wrapper.props('modelValue')).toBe('')
  })

  test('placeholder', async () => {
    const field = Text.make('firstName').placeholder('John Doe')

    const wrapper = mount(TextForm, {
      global: {
        plugins: [[CockpitPlugin, { primeVue: {} }]],
      },
      props: {
        field: field.toJSON(),
      },
    })

    const input = wrapper.find('input')

    expect(input.attributes()['placeholder']).toBe('John Doe')
  })
})
