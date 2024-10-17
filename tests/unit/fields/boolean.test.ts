import vine from '@vinejs/vine'
import Boolean from '../../../src/fields/boolean.js'

describe('validation', () => {
  test('true/false', async () => {
    const field = Boolean.make('isAdmin')

    const validator = vine.compile(field.$validator())
    await expect(validator.validate(true)).resolves.toBe(true)
    await expect(validator.validate(false)).resolves.toBe(false)

    await expect(validator.validate('on')).rejects.toThrowError()
    await expect(validator.validate('true')).rejects.toThrowError()
  })

  test('custom values', async () => {
    const field = Boolean.make('isAdmin').values('valid', 'invalid')

    const validator = vine.compile(field.$validator())
    await expect(validator.validate('invalid')).resolves.toBe('invalid')
    await expect(validator.validate('valid')).resolves.toBe('valid')
  })
})
