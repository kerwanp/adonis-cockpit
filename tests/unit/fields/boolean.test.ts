import Boolean from '../../../src/fields/boolean.js'

describe('validation', () => {
  test('true/false', async () => {
    const field = Boolean.make('isAdmin')

    await expect(field.$validate(true)).resolves.toBe(true)
    await expect(field.$validate(false)).resolves.toBe(false)

    await expect(field.$validate('on')).rejects.toThrowError()
    await expect(field.$validate('true')).rejects.toThrowError()
  })

  test('custom values', async () => {
    const field = Boolean.make('isAdmin').values('valid', 'invalid')

    await expect(field.$validate('invalid')).resolves.toBe('invalid')
    await expect(field.$validate('valid')).resolves.toBe('valid')
  })
})
