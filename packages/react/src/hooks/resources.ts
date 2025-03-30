import { useResource } from "../providers/resource.js";
import {
  keepPreviousData,
  queryOptions,
  useMutation,
  useQuery,
} from "@tanstack/react-query";
import { ResourceService } from "adonis-cockpit/client";
import { RecordId, ResourceListParams } from "adonis-cockpit/types";
import { toast } from "sonner";
import { $queryClient } from "../providers/app.js";

export const $resources = {
  index: (resource: string, params?: ResourceListParams) =>
    queryOptions({
      queryKey: ["resources", resource, ...(params ? [params] : [])],
      queryFn: () =>
        ResourceService.list(resource, params!).then((r) => r.json()), // TODO: Use skip token
      placeholderData: keepPreviousData,
    }),
  retrieve: (resource: string, id: RecordId) =>
    queryOptions({
      queryKey: ["resources", resource, id],
      queryFn: () =>
        ResourceService.retrieve(resource, id).then((r) => r.json()),
      placeholderData: keepPreviousData,
      staleTime: Infinity,
    }),
};

export function useResourceList(resource: string, params: ResourceListParams) {
  return useQuery($resources.index(resource, params));
}

export function useResourceQuery(resource: string, id: RecordId) {
  return useQuery($resources.retrieve(resource, id));
}
export function useResourceCreate() {
  const { resource } = useResource();

  const { mutateAsync } = useMutation({
    mutationFn: (data: { value: any }) =>
      ResourceService.create(resource.name, data.value),
    onSuccess() {
      const options = $resources.index(resource.name);
      $queryClient.invalidateQueries({ queryKey: options.queryKey });
    },
  });

  return {
    create: (data: { value: any }) => {
      const promise = mutateAsync(data);
      toast.promise(promise, {
        success: {
          message: `${resource.label} Created`,
          description: `The ${resource.label} has been created successfuly.`,
        },
        error: {
          message: `Update Failed`,
          description: `An error occured when creating the ${resource.label}. Check the console for more informations.`,
        },
        loading: `Creating ${resource.label}`,
      });

      return promise;
    },
  };
}

export function useResourceUpdate() {
  const { resource } = useResource();

  const { mutateAsync } = useMutation({
    mutationFn: (variables: { id: RecordId; value: any }) =>
      ResourceService.update(resource.name, variables.id, variables.value),
    onSuccess() {
      const options = $resources.index(resource.name);
      $queryClient.invalidateQueries({ queryKey: options.queryKey });
    },
  });

  return {
    update: (data: { id: RecordId; value: any }) => {
      const promise = mutateAsync(data);
      toast.promise(promise, {
        success: {
          message: `${resource.label} Updated`,
          description: `The ${resource.label} has been updated successfuly.`,
        },
        error: {
          message: `Update Failed`,
          description: `An error occured when updating the ${resource.label}. Check the console for more informations.`,
        },
        loading: `Updating ${resource.label}`,
      });

      return promise;
    },
  };
}
export function useResourceDelete() {
  const { resource } = useResource();

  const { mutateAsync } = useMutation({
    mutationFn: (variables: { id: RecordId }) =>
      ResourceService.delete(resource.name, variables.id),
    onSuccess() {
      const options = $resources.index(resource.name);
      $queryClient.invalidateQueries({ queryKey: options.queryKey });
    },
  });

  return {
    mutate: (data: { id: RecordId }) => {
      const promise = mutateAsync(data);
      toast.promise(promise, {
        success: {
          message: `${resource.label} Deleted`,
          description: `The ${resource.label} has been deleted successfuly.`,
        },
        error: {
          message: `Delete Failed`,
          description: `An error occured when deleting the ${resource.label}. Check the console for more informations.`,
        },
        loading: `Deleting ${resource.label}`,
      });

      return promise;
    },
  };
}
