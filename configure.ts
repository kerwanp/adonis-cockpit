import ConfigureCommand from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'
import { readdir } from 'node:fs/promises'
import stringHelpers from '@adonisjs/core/helpers/string'
import { Codemods } from '@adonisjs/core/ace/codemods'
import PackageJson from '@npmcli/package-json'

export async function configure(command: ConfigureCommand) {
  const codemods = await command.createCodemods()

  await makeStubs(codemods)
  await updatePackageJson(command)
  await installMissingDependencies(command)
  await installTailwindCSS(command, codemods)

  command.colors.magenta()
  command.logger.log(`
\n
░█████╗░░█████╗░░█████╗░██╗░░██╗██████╗░██╗████████╗\n
██╔══██╗██╔══██╗██╔══██╗██║░██╔╝██╔══██╗██║╚══██╔══╝\n
██║░░╚═╝██║░░██║██║░░╚═╝█████═╝░██████╔╝██║░░░██║░░░\n
██║░░██╗██║░░██║██║░░██╗██╔═██╗░██╔═══╝░██║░░░██║░░░\n
╚█████╔╝╚█████╔╝╚█████╔╝██║░╚██╗██║░░░░░██║░░░██║░░░\n
░╚════╝░░╚════╝░░╚════╝░╚═╝░░╚═╝╚═╝░░░░░╚═╝░░░╚═╝░░░\n
\n
`)

  command.colors.reset()

  command.logger.success(`
\n
Cockpit has been successfully configured!

You have one step left:
- https://adonis-cockpit.com/docs/getting-started/installation#configure-inertia-root-layout
`)
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

async function installTailwindCSS(command: ConfigureCommand, codemods: Codemods) {
  const possibleConfigNames = ['tailwind.config.ts', 'tailwind.config.js']

  const files = await readdir(command.app.makePath())
  const configFile = files.find((file) => possibleConfigNames.includes(file))

  if (configFile) {
    command.logger.info(
      `A Tailwind configuration file (${configFile}) already exist. To avoid destroying it you must add the Cockpit plugin yourself.\nPlease see https://adonis-cockpit.com/docs/getting-started/installation#configure-tailwindcss`
    )
    return
  }

  const configureTailwind = await command.prompt.confirm(
    `No Tailwind configuration file found. Do you want Cockpit to configure it for you?`,
    { name: 'missing_tailwind' }
  )

  if (!configureTailwind) {
    command.logger.info(
      'OK! Cockpit has not created the file for you.\nHead over Please see https://adonis-cockpit.com/docs/getting-started/installation#configure-tailwindcss'
    )
    return
  }

  await codemods.installPackages([
    {
      name: 'tailwindcss',
      isDevDependency: true,
    },
  ])

  await codemods.makeUsingStub(stubsRoot, './tailwind/config.stub', {})
  await codemods.makeUsingStub(stubsRoot, './tailwind/postcss.stub', {})
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
  const packageJson = await PackageJson.load(command.app.appRoot.pathname)
  const dependencies = Object.keys(packageJson.content.dependencies ?? [])

  return DEPENDENCIES_MATCHER.filter((item) => !dependencies.includes(item.dependency))
}
