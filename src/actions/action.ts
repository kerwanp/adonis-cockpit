import { BaseResource } from '../resources/base_resource.js'
import { RecordId, Serializable } from '../types.js'

export abstract class Action implements Serializable {
  abstract label: string
  abstract severity: string
  abstract icon: string

  abstract handle(resource: BaseResource, records: RecordId[]): Promise<void>

  confirmation?(): any

  toJSON() {
    return {
      id: this.constructor.name,
      label: this.label,
      severity: this.severity,
      icon: this.icon,
      confirmation: this.confirmation?.(),
    }
  }
}
