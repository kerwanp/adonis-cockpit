import { BaseResource } from '../resources/base_resource.js'
import { RecordId } from '../types.js'
import { Action } from './action.js'

export class DeleteAction extends Action {
  label = 'Delete'
  severity = 'danger'
  icon = 'pi pi-trash'

  async handle(resource: BaseResource, records: RecordId[]): Promise<void> {
    await resource.delete(...records)
  }

  confirmation() {
    return {
      header: 'Deleting Records',
      message: 'Are you sure you want to delete the records?',
      icon: 'pi pi-exclamation-triangle',
      rejectProps: {
        label: 'Cancel',
        severity: 'secondary',
        outlined: true,
      },
      acceptProps: {
        label: 'Delete',
        severity: 'danger',
      },
    }
  }

  static make(): DeleteAction {
    return new DeleteAction()
  }
}
