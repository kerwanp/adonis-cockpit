import BooleanIndex from '../../../resources/components/fields/boolean/index.vue'
import BooleanForm from '../../../resources/components/fields/boolean/form.vue'
import Boolean from '../../../src/fields/boolean.js'
import { mount } from '@vue/test-utils'

describe('index', () => {
  test('no configuration', async () => {
    const field = Boolean.make('isAdmin')

    const wrapper = mount(BooleanIndex, {
      props: {
        field: field.toJSON(),
        value: true,
      },
    })

    expect(wrapper.attributes()['aria-label']).toBe('true')

    await wrapper.setProps({ value: false })

    expect(wrapper.attributes()['aria-label']).toBe('false')

    await wrapper.setProps({ value: null })

    expect(wrapper.attributes()['aria-label']).toBe('unknown')
  })

  test('with custom true/false values', async () => {
    const field = Boolean.make('isAdmin').values('valid', 'invalid')

    const wrapper = mount(BooleanIndex, {
      props: {
        field: field.toJSON(),
        value: 'valid',
      },
    })

    expect(wrapper.attributes()['aria-label']).toBe('true')

    await wrapper.setProps({ value: 'invalid' })

    expect(wrapper.attributes()['aria-label']).toBe('false')

    await wrapper.setProps({ value: null })

    expect(wrapper.attributes()['aria-label']).toBe('unknown')
  })
})

describe('form', () => {
  test('no configuration', async () => {
    const field = Boolean.make('isAdmin')

    const wrapper = mount(BooleanForm, {
      props: {
        'field': field.toJSON(),
        'modelValue': false,
        'onUpdate:modelValue': (value: any) => {
          wrapper.setProps({ modelValue: value })
        },
      },
    })

    const input = wrapper.find('input')

    await input.setValue(true)

    expect(wrapper.props('modelValue')).toBe(true)

    await input.setValue(false)

    expect(wrapper.props('modelValue')).toBe(false)
  })

  test('with custom true/false values', async () => {
    const field = Boolean.make('isAdmin').values('valid', 'invalid')

    const wrapper = mount(BooleanForm, {
      props: {
        'field': field.toJSON(),
        'modelValue': 'invalid',
        'onUpdate:modelValue': (value: any) => {
          wrapper.setProps({ modelValue: value })
        },
      },
    })

    const input = wrapper.find('input')

    await input.setValue(true)

    expect(wrapper.props('modelValue')).toBe('valid')

    await input.setValue(false)

    expect(wrapper.props('modelValue')).toBe('invalid')
  })
})
