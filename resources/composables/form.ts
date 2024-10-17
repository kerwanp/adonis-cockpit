import { FormOptions, GenericObject, useForm as useFormBase } from 'vee-validate'
import { isValidationError } from '../utils/errors.js'

export function useForm(options?: FormOptions<GenericObject>) {
  const form = useFormBase(options)

  function handleSubmit(handler: (data: any) => Promise<void>) {
    return form.handleSubmit(async (data) => {
      try {
        await handler(data)
      } catch (e) {
        if (isValidationError(e)) {
          const errors = e.errors.reduce(
            (acc, { field, message }) => ({ ...acc, [field]: message }),
            {}
          )
          form.setErrors(errors)
          return
        }

        throw e
      }
    })
  }

  return { ...form, handleSubmit }
}
