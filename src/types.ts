export type Type<T = any> = new (...args: any[]) => T

export type CrudAction = 'create' | 'edit' | 'show' | 'index' | 'delete'

export interface Component {
  render(): Promise<[string, any]>
}
