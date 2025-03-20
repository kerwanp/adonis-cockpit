import { ResourceIndexView } from "../../components/views/resources/index.jsx";
import { ResourceProvider } from "../../providers/resource.jsx";

export default function Page({ resource }: { resource: string }) {
  return (
    <ResourceProvider resource={resource}>
      <ResourceIndexView />
    </ResourceProvider>
  );
}
