export type Type<T = any> = new (...args: any[]) => T

export type CrudAction = 'create' | 'edit' | 'show' | 'index' | 'delete'

export type RecordId = string | number

export interface Component {
  render(): Promise<[string, any]>
}

export interface Serializable<T = any> {
  toJSON(): T
}

export type ResourceListParams = {
  search?: string
}

export type InferSerializable<T extends Serializable> = ReturnType<T['toJSON']>

export type CockpitConfig = {
  entrypoint: string
}

export type VineError = { message: string; field: string; rule: string }
