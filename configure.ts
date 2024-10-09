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
import { readFile } from 'node:fs/promises'
import stringHelpers from '@adonisjs/core/helpers/string'
import { Codemods } from '@adonisjs/core/ace/codemods'
import PackageJson from '@npmcli/package-json'

export async function configure(command: ConfigureCommand) {
  const codemods = await command.createCodemods()

  await makeStubs(codemods)
  await updatePackageJson(command)
  await installMissingDependencies(command)
}

async function makeStubs(codemods: Codemods) {
  await codemods.makeUsingStub(stubsRoot, './config/cockpit.stub', {})
  await codemods.makeUsingStub(stubsRoot, './start/cockpit.stub', {})
  await codemods.makeUsingStub(stubsRoot, './inertia/app/cockpit.stub', {})

  await codemods.updateRcFile((transformer) => {
    transformer.addCommand('adonis-cockpit/commands')
    transformer.addPreloadFile('#start/cockpit')
    transformer.addProvider('adonis-cockpit/providers/cockpit_provider')
  })
}

async function installMissingDependencies(command: ConfigureCommand) {
  const missingDependencies = await detectMissingDependencies(command)

  if (missingDependencies.length) {
    const prompt = await command.prompt.confirm(
      `You are missing the following dependencies: ${stringHelpers.sentence(missingDependencies.map((d) => d.dependency))} do you want to configure them?`,
      { name: 'missing_dependencies' }
    )

    if (prompt) {
      const ace = await command.app.container.make('ace')
      for (const dependency of missingDependencies) {
        command.logger.info(`Running 'ace add ${dependency.configure}'`)
        await ace.exec('add', [dependency.configure])
      }
    }
  }
}

async function updatePackageJson(command: ConfigureCommand) {
  const packageJson = await PackageJson.load(command.app.appRoot.pathname)

  packageJson.update({
    imports: {
      ...packageJson.content.imports,
      '#cockpit/*': './app/cockpit/*.js',
    },
  })

  await packageJson.save()
}

const DEPENDENCIES_MATCHER = [
  {
    dependency: '@adonisjs/lucid',
    configure: '@adonisjs/lucid',
  },
  {
    dependency: '@vinejs/vine',
    configure: 'vinejs',
  },
  {
    dependency: 'edge.js',
    configure: 'edge',
  },
  {
    dependency: '@adonisjs/inertia',
    configure: '@adonisjs/inertia',
  },
]

async function detectMissingDependencies(command: ConfigureCommand) {
  const packageJsonContent = await readFile(command.app.makePath('package.json')).then((c) =>
    JSON.parse(c.toString())
  )

  const dependencies = Object.keys(packageJsonContent?.dependencies ?? [])

  return DEPENDENCIES_MATCHER.filter((item) => !dependencies.includes(item.dependency))
}
