import type { ApiIndexInputParams } from '../../src/routes/handlers/api/index.js'
import type { RecordId, Resource } from '../types.js'
import ResourceService from '../services/resource_service.js'
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/vue-query'
import { inject, MaybeRefOrGetter, provide, Ref, toValue } from 'vue'
import { useToast } from 'primevue/usetoast'

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
  const resource = inject<Resource>('resource')
  if (!resource) throw new Error(`Resource is not provided`)
  return resource
}

export function provideResource(resource: Resource) {
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

export function useCreateResourceMutation(resource: Resource) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: any) => ResourceService.create(resource.slug, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resource.slug] })
    },
  })
}

export function useUpdateResourceMutation(resource: Resource) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ id, data }: { id: RecordId; data: any }) =>
      ResourceService.update(resource.slug, id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resource.slug] })
    },
  })
}

export function useDeleteResourceMutation(resource: Resource) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (id: RecordId) => ResourceService.delete(resource.slug, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resource.slug] })
    },
  })
}

export function useActionResourceMutation(resource: Resource) {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: ({ action, ids }: { action: string; ids: RecordId[] }) =>
      ResourceService.action(resource.slug, action, ids),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['resources', resource.slug] })
    },
  })
}

export function useResource(resource?: Resource) {
  if (!resource) {
    resource = injectResource()
  }

  const toasts = useResourceToasts(resource)
  const deleteMutation = useDeleteResourceMutation(resource)
  const createMutation = useCreateResourceMutation(resource)
  const updateMutation = useUpdateResourceMutation(resource)
  const actionMutation = useActionResourceMutation(resource)

  return {
    ...resource,
    toasts,
    delete: deleteMutation.mutateAsync,
    create: createMutation.mutateAsync,
    update: updateMutation.mutateAsync,
    runAction: actionMutation.mutateAsync,
  }
}

export function useResourceToasts(resource?: Resource) {
  if (!resource) {
    resource = injectResource()
  }
  const toast = useToast()

  function edited() {
    toast.add({
      severity: 'success',
      summary: `${resource!.name} edited`,
      detail: `The ${resource!.name} has been succesfully updated.`,
      life: 3000,
    })
  }

  function deleted() {
    toast.add({
      severity: 'error',
      summary: 'Record deleted',
      detail: `The ${resource!.name} has been succesfully deleted.`,
      life: 3000,
    })
  }

  function created() {
    toast.add({
      severity: 'success',
      summary: `${resource!.name} created`,
      detail: `The ${resource!.name} has been succesfully created.`,
      life: 3000,
    })
  }

  return { edited, deleted, created }
}
