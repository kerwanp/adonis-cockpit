import type { ApiIndexInputParams } from '../../src/routes/handlers/api/index.js'
import type { InferSerializable, RecordId } from '../../src/types.js'
import type { BaseResource } from '../../src/resources/base_resource.js'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import ResourceService from '../services/resource_service.js'
import { inject, MaybeRefOrGetter, provide, Ref, toValue } from 'vue'

type ListParams = {
  page?: Ref<number | undefined> | number
  perPage?: Ref<number | undefined> | number
  filter?: Ref<string | undefined> | string
  search?: Ref<string | undefined> | string
  sorts?: Ref<ApiIndexInputParams['sorts']> | ApiIndexInputParams['sorts']
  filters?: Ref<ApiIndexInputParams['filters']> | ApiIndexInputParams['filters']
}

export const useResourceApi = {
  list(name: string, params: ListParams = {}, lazy?: boolean) {
    return useQuery({
      queryKey: ['resources', name, params],
      queryFn: () =>
        ResourceService.list(name, {
          page: toValue(params.page),
          perPage: toValue(params.perPage),
          sorts: toValue(params.sorts),
          search: toValue(params.search),
          filters: toValue(params.filters),
        }),
      placeholderData: keepPreviousData,
      enabled: lazy !== true,
    })
  },
}

export function injectResource() {
  const resource = inject<InferSerializable<BaseResource>>('resource')
  if (!resource) throw new Error(`Resource is not provided`)
  return resource
}

export function provideResource(resource: InferSerializable<BaseResource>) {
  return provide('resource', resource)
}

export function useResourceQuery(
  resource: string,
  recordId: MaybeRefOrGetter<string>,
  enabled: MaybeRefOrGetter<boolean> = true
) {
  return useQuery({
    queryKey: ['resources', resource, recordId],
    queryFn: () => ResourceService.retrieve(resource, toValue(recordId)),
    enabled,
  })
}

export function useCreateResourceMutation(resource: InferSerializable<BaseResource>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => ResourceService.create(resource.slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resource.slug] })
    },
  })
}

export function useUpdateResourceMutation(resource: InferSerializable<BaseResource>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: RecordId; data: any }) =>
      ResourceService.update(resource.slug, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resource.slug] })
    },
  })
}

export function useDeleteResourceMutation(resource: InferSerializable<BaseResource>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: RecordId) => ResourceService.delete(resource.slug, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resource.slug] })
    },
  })
}

export function useActionResourceMutation(resource: InferSerializable<BaseResource>) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ action, ids }: { action: string; ids: RecordId[] }) =>
      ResourceService.action(resource.slug, action, ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resource.slug] })
    },
  })
}

export function useResource(resource?: InferSerializable<BaseResource>) {
  if (!resource) {
    resource = injectResource()
  }

  const deleteMutation = useDeleteResourceMutation(resource)
  const createMutation = useCreateResourceMutation(resource)
  const updateMutation = useUpdateResourceMutation(resource)
  const actionMutation = useActionResourceMutation(resource)

  return {
    ...resource,
    delete: deleteMutation.mutateAsync,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    runAction: actionMutation.mutateAsync,
  }
}
