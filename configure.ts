/*
|--------------------------------------------------------------------------
| Configure hook
|--------------------------------------------------------------------------
|
| The configure hook is called when someone runs "node ace configure <package>"
| command. You are free to perform any operations inside this function to
| configure the package.
|
| To make things easier, you have access to the underlying "ConfigureCommand"
| instance and you can use codemods to modify the source files.
|
*/

import ConfigureCommand from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'

export async function configure(command: ConfigureCommand) {
  const codemods = await command.createCodemods()

  await codemods.installPackages([
    {
      name: 'edge',
      isDevDependency: false,
    },
  ])

  await codemods.makeUsingStub(stubsRoot, 'start/components.stub', {
    filePath: command.app.startPath('components.ts'),
  })

  await codemods.updateRcFile((transformer) => {
    transformer.addCommand('edgewire/commands')
    transformer.addPreloadFile('#start/components')
    transformer.addProvider('edgewire/providers/edgewire_provider')
  })
}
