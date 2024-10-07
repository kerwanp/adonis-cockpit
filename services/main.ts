import app from '@adonisjs/core/services/app'
import CockpitManager from '../src/cockpit.js'

let admin: CockpitManager

await app.booted(async () => {
  admin = await app.container.make(CockpitManager)
})

export { admin as default }
