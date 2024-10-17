import type { InferSerializable } from '../../src/types.js'
import type { Field } from '../../src/fields/field.js'
import { useField as useFieldBase } from 'vee-validate'
import { inject, provide } from 'vue'

export const FieldContextSymbol = Symbol('cockpit:field')

export function provideField(field: InferSerializable<Field>) {
  provide(FieldContextSymbol, field)
}

export function injectField<F extends Field>() {
  const field = inject<InferSerializable<F>>(FieldContextSymbol)
  if (!field) throw new Error(`Field is not provided`)
  return field
}

export function useField<F extends Field>(field?: InferSerializable<F>) {
  if (!field) {
    field = injectField<F>()
  }

  const res = useFieldBase(field.name, undefined)
  return { field, ...res }
}
