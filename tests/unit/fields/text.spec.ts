import Text from '../../../src/fields/text.js'

describe('validation', () => {
  test('required', async () => {
    const field = Text.make('firstName').required()

    await expect(field.$validate(undefined)).rejects.toThrowError()
    await expect(field.$validate(null)).rejects.toThrowError()
    await expect(field.$validate('test')).resolves.toBe('test')
  })

  test('optional', async () => {
    const field = Text.make('firstName')

    await expect(field.$validate(undefined)).resolves.toBe(undefined)
    await expect(field.$validate(null)).resolves.toBe(undefined)
    await expect(field.$validate('test')).resolves.toBe('test')
  })

  test('length', async () => {
    const field = Text.make('firstName').minLength(3).maxLength(6)

    await expect(field.$validate('1')).rejects.toThrowError()
    await expect(field.$validate('1234')).resolves.toBe('1234')
    await expect(field.$validate('1234567')).rejects.toThrowError()
  })

  test('regex', async () => {
    const field = Text.make('firstName').regex(/(hello|world)/)

    await expect(field.$validate('foo')).rejects.toThrowError()
    await expect(field.$validate('bar')).rejects.toThrowError()
    await expect(field.$validate('hello')).resolves.toBe('hello')
    await expect(field.$validate('world')).resolves.toBe('world')
  })
})
