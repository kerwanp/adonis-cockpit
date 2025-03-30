import User from '#models/user'
import { HttpContext } from '@adonisjs/core/http'

export default class AuthController {
  async login({ inertia, request, auth }: HttpContext) {
    if (request.method() === 'POST') {
      const { email, password } = request.only(['email', 'password'])
      const user = await User.verifyCredentials(email, password)

      await auth.use('web').login(user)

      return inertia.location('/admin')
    }

    return inertia.render('login')
  }

  async logout({ auth, inertia }: HttpContext) {
    await auth.use('web').logout()
    return inertia.location('/login')
  }
}
