/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import cockpit from 'adonis-cockpit/services/main'
import { middleware } from './kernel.js'

const AuthController = () => import('#controllers/auth_controller')

router.route('/login', ['GET', 'POST'], [AuthController, 'login']).as('login')
router.get('/logout', [AuthController, 'logout']).as('logout')
router.on('/').renderInertia('home')

cockpit.registerRoutes((route) => {
  route.use(middleware.auth())
})
