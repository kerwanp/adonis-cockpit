import { ApplicationService } from '@adonisjs/core/types'
import edge from 'edge.js'
import { viewsRoot } from '../resources/main.js'

export default class AdminProvider {
  constructor(protected app: ApplicationService) {}

  register() {
    edge.mount('admin', viewsRoot)
  }

  async boot() {}

  async start() {}
}
