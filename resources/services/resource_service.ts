import type { InferSerializable, RecordId } from '../../src/types.js'
import type { SimplePaginator } from '@adonisjs/lucid/database'
import type { ApiIndexInputParams } from '../../src/routes/handlers/api/index.js'
import axios, { AxiosError } from 'axios'
import { ResourceRecord } from '../types.js'

type ListParams = ApiIndexInputParams
type ListReturn = InferSerializable<SimplePaginator>

const client = axios.create()
client.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    if (!(error instanceof AxiosError) && error.response?.status === 422) {
      return Promise.reject(error)
    }

    return Promise.reject(error.response.data)
  }
)

export default class ResourceService {
  static async list(name: string, params: ListParams): Promise<ListReturn> {
    return client.get(`/admin/api/${name}`, { params }).then((res) => res.data)
  }

  static async retrieve(slug: string, id: RecordId) {
    return client.get(`/admin/api/${slug}/${id}`).then((res) => res.data)
  }

  static async create(name: string, data: ResourceRecord) {
    return client.post(`/admin/api/${name}`, data).then((res) => res.data)
  }

  static async update(slug: string, id: RecordId, data: ResourceRecord) {
    return client.post(`/admin/api/${slug}/${id}`, { data }).then((res) => res.data)
  }

  static async delete(name: string, id: RecordId) {
    return client.delete(`/admin/api/${name}/${id}`).then((res) => res.data)
  }

  static async action(slug: string, action: string, ids: RecordId[]) {
    return client.post(`/admin/api/${slug}/actions/${action}`, { ids }).then((res) => res.data)
  }

  static makeUrl(name: string, type: 'edit' | 'detail', id: RecordId): string
  static makeUrl(name: string, type: 'index' | 'create'): string
  static makeUrl(
    name: string,
    type: 'index' | 'create' | 'edit' | 'detail',
    id?: RecordId
  ): string {
    if (type === 'index') {
      return `/admin/resources/${name}`
    }

    if (type === 'create') {
      return `/admin/resources/${name}/create`
    }

    if (type === 'detail') {
      return `/admin/resources/${name}/${id}`
    }

    return `/admin/resources/${name}/${id}/${type}`
  }
}
