import { FormContext, FormOptions, GenericObject, useForm as useFormBase } from 'vee-validate'
import { isValidationError } from '../utils/errors.js'
import { ResourceRecord } from '../types.js'

type UseFormResult = Omit<FormContext<GenericObject, GenericObject>, 'handleSubmit'> & {
  handleSubmit(data: ResourceRecord): any
}

export function useForm(options?: FormOptions<GenericObject>): UseFormResult {
  const form = useFormBase(options)

  function handleSubmit(handler: (data: ResourceRecord) => Promise<void>) {
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
