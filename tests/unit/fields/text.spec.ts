import vine from '@vinejs/vine'
import Text from '../../../src/fields/text.js'

describe('validation', () => {
  test('required', async () => {
    const field = Text.make('firstName').required()

    const validator = vine.compile(field.$validator())
    await expect(validator.validate(undefined)).rejects.toThrowError()
    await expect(validator.validate(null)).rejects.toThrowError()
    await expect(validator.validate('test')).resolves.toBe('test')
  })

  test('optional', async () => {
    const field = Text.make('firstName')

    const validator = vine.compile(field.$validator())
    await expect(validator.validate(undefined)).resolves.toBe(undefined)
    await expect(validator.validate(null)).resolves.toBe(undefined)
    await expect(validator.validate('test')).resolves.toBe('test')
  })

  test('length', async () => {
    const field = Text.make('firstName').minLength(3).maxLength(6)

    const validator = vine.compile(field.$validator())
    await expect(validator.validate('1')).rejects.toThrowError()
    await expect(validator.validate('1234')).resolves.toBe('1234')
    await expect(validator.validate('1234567')).rejects.toThrowError()
  })

  test('regex', async () => {
    const field = Text.make('firstName').regex(/(hello|world)/)

    const validator = vine.compile(field.$validator())
    await expect(validator.validate('foo')).rejects.toThrowError()
    await expect(validator.validate('bar')).rejects.toThrowError()
    await expect(validator.validate('hello')).resolves.toBe('hello')
    await expect(validator.validate('world')).resolves.toBe('world')
  })
})
