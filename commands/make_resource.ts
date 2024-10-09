import { args, BaseCommand } from '@adonisjs/core/ace'
import { stubsRoot } from '../stubs/main.js'
import stringHelpers from '@adonisjs/core/helpers/string'
import { CommandOptions } from '@adonisjs/core/types/ace'

export default class MakeResource extends BaseCommand {
  static commandName = 'make:resource'
  static description = 'Create a new Cockpit Resource'

  static options: CommandOptions = {
    startApp: true,
  }

  @args.string({ description: 'The name of the resource' })
  declare name: string

  protected stubPath = 'make/resource/main.stub'

  // TODO: Refactor
  async run() {
    const codemods = await this.createCodemods()

    const base = stringHelpers.create(this.name).removeSuffix('resource').pascalCase().toString()

    const model = stringHelpers.snakeCase(base)
    const modelName = stringHelpers.pascalCase(base)
    const resourceName = stringHelpers.create(base).suffix('Resource').pascalCase().toString()
    const resourcePath = this.app.makePath(
      'app',
      'cockpit',
      'resources',
      `${stringHelpers.create(base).suffix('Resource').snakeCase().toString()}.ts`
    )

    await codemods.makeUsingStub(stubsRoot, this.stubPath, {
      flags: this.parsed.flags,
      model,
      modelName,
      resourceName,
      resourcePath,
    })

    const morph = await codemods.getTsMorphProject()
    if (!morph) {
      throw new Error('Error while retrieving TsMorphProject')
    }

    const file = morph.addSourceFileAtPath(this.app.startPath('cockpit.ts'))

    file.addImportDeclaration({
      defaultImport: resourceName,
      moduleSpecifier: `#cockpit/resources/${stringHelpers.snakeCase(resourceName)}`,
    })

    file.addStatements(`cockpit.resource(${resourceName})`)

    await file.save()
  }
}
