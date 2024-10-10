import { Edge } from 'edge.js'
import { PluginFn } from 'edge.js/types'
import Cockpit from '../cockpit.js'
import { viewsRoot } from '../../resources/main.js'

export function edgePluginCockpit(cockpit: Cockpit): PluginFn<undefined> {
  return function (edge: Edge) {
    edge.mount('cockpit', viewsRoot)
    edge.global('cockpit', cockpit)
  }
}
