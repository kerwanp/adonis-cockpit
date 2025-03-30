import { ResourceIndexView } from "../../components/views/resources/index.js";
import { ResourceProvider } from "../../providers/resource.js";

export default function Page({ resource }: { resource: string }) {
  return (
    <ResourceProvider resource={resource}>
      <ResourceIndexView />
    </ResourceProvider>
  );
}
