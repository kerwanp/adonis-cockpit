import { useResource } from "../providers/resource.jsx";
import {
  keepPreviousData,
  queryOptions,
  useQuery,
} from "@tanstack/react-query";
import { ResourceService } from "adonis-cockpit/client";

const $queryOptions = {
  index: (resource: string, params: any) =>
    queryOptions({
      queryKey: ["resources", resource, params],
      queryFn: () =>
        ResourceService.list(resource, params).then((r) => r.json()),
      placeholderData: keepPreviousData,
    }),
};

export function useResourceList(params: any) {
  const { resource } = useResource();
  return useQuery($queryOptions.index(resource.name, params));
}
