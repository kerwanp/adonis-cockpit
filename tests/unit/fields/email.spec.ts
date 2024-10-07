import Email from '../../../src/fields/email.js'

describe('validation', () => {
  test('required', async () => {
    const field = Email.make('email').required()

    await expect(field.$validate(undefined)).rejects.toThrowError()
    await expect(field.$validate(null)).rejects.toThrowError()
    await expect(field.$validate('test')).rejects.toThrowError()
    await expect(field.$validate('test@test.com')).resolves.toBe('test@test.com')
  })

  test('optional', async () => {
    const field = Email.make('email')

    await expect(field.$validate(undefined)).resolves.toBe(undefined)
    await expect(field.$validate(null)).resolves.toBe(undefined)
    await expect(field.$validate('test')).rejects.toThrowError()
    await expect(field.$validate('test@test.com')).resolves.toBe('test@test.com')
  })
})
