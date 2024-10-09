import { Application } from '@adonisjs/core/app'

Application.macro(
  'cockpitPath',
  function (this: Application<Record<any, any>>, ...paths: string[]) {
    return this.makePath('app', 'cockpit', ...paths)
  }
)

declare module '@adonisjs/core/app' {
  interface Application<ContainerBindings extends Record<any, any>> {
    cockpitPath(...paths: string[]): string
  }
}
