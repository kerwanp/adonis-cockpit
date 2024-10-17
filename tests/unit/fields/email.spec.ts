import vine from '@vinejs/vine'
import Email from '../../../src/fields/email.js'

describe('validation', () => {
  test('required', async () => {
    const field = Email.make('email').required()

    const validator = vine.compile(field.$validator())
    await expect(validator.validate(undefined)).rejects.toThrowError()
    await expect(validator.validate(null)).rejects.toThrowError()
    await expect(validator.validate('test')).rejects.toThrowError()
    await expect(validator.validate('test@test.com')).resolves.toBe('test@test.com')
  })

  test('optional', async () => {
    const field = Email.make('email')

    const validator = vine.compile(field.$validator())
    await expect(validator.validate(undefined)).resolves.toBe(undefined)
    await expect(validator.validate(null)).resolves.toBe(undefined)
    await expect(validator.validate('test')).rejects.toThrowError()
    await expect(validator.validate('test@test.com')).resolves.toBe('test@test.com')
  })
})
