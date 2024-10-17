import { VineError } from '../../src/types.js'

export function isValidationError(error: any): error is { errors: VineError[] } {
  if (typeof error !== 'object') {
    return false
  }

  if ('errors' in error) {
    return true
  }

  return false
}
