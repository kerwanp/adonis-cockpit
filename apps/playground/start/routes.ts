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

router.on('/').renderInertia('home')

cockpit.registerRoutes()
