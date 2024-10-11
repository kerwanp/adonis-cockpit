import ConfigureCommand from '@adonisjs/core/commands/configure'
import { stubsRoot } from './stubs/main.js'
import { readdir } from 'node:fs/promises'
import { Codemods } from '@adonisjs/core/ace/codemods'
import PackageJson from '@npmcli/package-json'
import { existsSync } from 'node:fs'

const logo = `
  _____         __         _ __
 / ___/__  ____/ /__ ___  (_) /_
/ /__/ _ \\/ __/  '_// _ \\/ / __/
\\___/\\___/\\__/_/\\_\\/ .__/_/\\__/
                  /_/`

const manualSteps: {
  title: string
  url: string
}[] = [
  {
    title: 'Inertia Root Layout must be configured manually',
    url: 'https://adonis-cockpit.com/docs/getting-started/installation#configure-inertia-root-layout',
  },
]

const missingDependenciesSteps: {
  title: string
  detect: (command: ConfigureCommand) => Promise<boolean>
  run: (command: ConfigureCommand) => Promise<void>
}[] = [
  {
    title: 'EdgeJS is not configured',
    detect: async (command) => command.app.usingEdgeJS,
    run: async (command) => {
      const ace = await command.app.container.make('ace')
      await ace.exec('add', ['edge'])
    },
  },
  {
    title: 'VineJS is not configured',
    detect: async (command) => command.app.usingVineJS,
    run: async (command) => {
      const ace = await command.app.container.make('ace')
      await ace.exec('add', ['vinejs'])
    },
  },
  {
    title: 'Lucid is not configured',
    detect: async (command) => {
      const packageJson = await PackageJson.load(command.app.appRoot.pathname)
      const dependencies = Object.keys(packageJson.content.dependencies ?? [])
      return dependencies.includes('@adonisjs/lucid')
    },
    run: async (command) => {
      const ace = await command.app.container.make('ace')
      await ace.exec('add', ['@adonisjs/lucid'])
    },
  },
  {
    title: 'InertiaJS is not configured',
    detect: async (command) => {
      const packageJson = await PackageJson.load(command.app.appRoot.pathname)
      const dependencies = Object.keys(packageJson.content.dependencies ?? [])
      return dependencies.includes('@adonisjs/inertia')
    },
    run: async (command) => {
      const ace = await command.app.container.make('ace')
      await ace.exec('add', ['@adonisjs/inertia'])
    },
  },
]

async function configureAdonisPackages(command: ConfigureCommand) {
  const missingSteps = []
  for (const step of missingDependenciesSteps) {
    const detected = await step.detect(command)
    if (!detected) {
      missingSteps.push(step)
    }
  }

  if (missingSteps.length) {
    command.logger.log(
      command.colors
        .red()
        .bold()
        .underline('Cockpit detected the following missing configurations:')
    )
    for (const missingStep of missingSteps) {
      command.logger.log(command.colors.red(`  ✖ ${missingStep.title}`))
    }

    const shouldConfigure = await command.prompt.confirm(
      'Do you want Cockpit to configure them for you?',
      { name: 'configure_missing_dependencies' }
    )
    if (shouldConfigure) {
      for (const missingStep of missingSteps) {
        await missingStep.run(command)
      }
    }
  }
}

export async function configure(command: ConfigureCommand) {
  const codemods = await command.createCodemods()

  command.logger.log(command.colors.magenta(logo))
  command.logger.log(command.colors.gray('_______________________________\n'))
  command.logger.log(command.colors.yellow('ⓘ  Version: Pre-release\n'))

  await configureAdonisPackages(command)

  await makeStubs(codemods)
  await updatePackageJson(command)
  await installTailwindCSS(command, codemods)
  await registerVitePlugin(command, codemods)

  command.colors.reset()

  command.logger.log(command.colors.gray('_______________________________\n'))

  command.logger.log(command.colors.green(`Cockpit has been successfully configured!\n`))

  if (manualSteps.length) {
    command.logger.log(
      command.colors
        .yellow()
        .bold()
        .underline(`You have ${manualSteps.length} manual step(s) left:`)
    )

    for (const manualStep of manualSteps) {
      command.logger.log(
        command.colors.yellow(`- ${command.colors.bold(manualStep.title)}:\n  ${manualStep.url}`)
      )
    }
  }

  command.logger.log(command.colors.gray('_______________________________\n'))
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

async function registerVitePlugin(command: ConfigureCommand, codemods: Codemods) {
  const exist = existsSync(command.app.makePath('vite.config.ts'))
  if (!exist) {
    command.logger.warning(
      `You are missing the vite.config.ts file. You need to configure it manually.\nHead over https://adonis-cockpit.com/docs/getting-started/installation#configure-vite`
    )
    return
  }

  await codemods.registerVitePlugin(`cockpit({ entrypoints: ['inertia/app/cockpit.ts'] })`, [
    { isNamed: false, module: 'adonis-cockpit/vite', identifier: 'cockpit' },
  ])
}

async function installTailwindCSS(command: ConfigureCommand, codemods: Codemods) {
  const possibleConfigNames = ['tailwind.config.ts', 'tailwind.config.js']

  const files = await readdir(command.app.makePath())
  const configFile = files.find((file) => possibleConfigNames.includes(file))

  if (configFile) {
    manualSteps.push({
      title: 'Tailwind must be configured manually',
      url: 'https://adonis-cockpit.com/docs/getting-started/installation#configure-tailwindcss',
    })
    return
  }

  await codemods.installPackages([
    {
      name: 'tailwindcss',
      isDevDependency: true,
    },
    {
      name: 'postcss',
      isDevDependency: true,
    },
    {
      name: 'autoprefixer',
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
