import TextForm from '../../../resources/components/fields/text/form.vue'
import EmailIndex from '../../../resources/components/fields/email/index.vue'
import { mount } from '@vue/test-utils'
import Email from '../../../src/fields/email.js'
import CockpitPlugin from '../../../src/plugins/vue/index.js'

describe('index', () => {
  test('displays href with mailto', async () => {
    const field = Email.make('firstName')

    const wrapper = mount(EmailIndex, {
      global: {
        plugins: [[CockpitPlugin, { primeVue: {} }]],
      },
      props: {
        field: field.toJSON(),
        value: 'adonis@cockpit.org',
      },
    })

    const anchor = wrapper.get('a')

    expect(anchor.attributes()['href']).toBe('mailto:adonis@cockpit.org')
  })

  test('displays nothing is value is not defined', async () => {
    const field = Email.make('firstName')

    const wrapper = mount(EmailIndex, {
      global: {
        plugins: [[CockpitPlugin, { primeVue: {} }]],
      },
      props: {
        field: field.toJSON(),
        value: undefined,
      },
    })

    const anchor = wrapper.text()
    expect(anchor).toBe('')
  })
})

describe('form', () => {
  test('displays input of type email', async () => {
    const field = Email.make('email')

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

    expect(input.attributes()['type']).toBe('email')

    expect(wrapper.props('modelValue')).toBe('Adonis Cockpit')

    await input.setValue('Martin')
    expect(wrapper.props('modelValue')).toBe('Martin')

    await input.setValue('')
    expect(wrapper.props('modelValue')).toBe('')
  })
})
