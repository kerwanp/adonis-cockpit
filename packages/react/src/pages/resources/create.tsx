import { ResourceCreateView } from "../../components/views/resources/create.js";
import { ResourceProvider } from "../../providers/resource.js";

export default function Page({ resource }: { resource: string }) {
  return (
    <ResourceProvider resource={resource}>
      <ResourceCreateView />
    </ResourceProvider>
  );
}
