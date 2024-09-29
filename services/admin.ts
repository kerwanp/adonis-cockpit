import app from '@adonisjs/core/services/app'
import Admin from '../src/admin.js'

let admin: Admin

await app.booted(async () => {
  admin = await app.container.make(Admin)
})

export { admin as default }
