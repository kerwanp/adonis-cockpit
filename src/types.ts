import type { HttpContext } from '@adonisjs/core/http'
import type { MiddlewareFn, OneOrMore, ParsedNamedMiddleware } from '@adonisjs/core/types/http'

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
  auth?: {
    loginUrl: string
    logoutUrl: string
    user: (ctx: HttpContext) => User
  }
}

export type VineError = { message: string; field: string; rule: string }
export type MiddlewareOption = OneOrMore<MiddlewareFn | ParsedNamedMiddleware>

export type User = {
  avatar?: string
  userName?: string
  email?: string
}
