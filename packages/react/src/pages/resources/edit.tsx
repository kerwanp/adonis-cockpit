import { ResourceEditView } from "../../components/views/resources/edit.js";
import { RecordProvider } from "../../providers/record.js";
import { ResourceProvider } from "../../providers/resource.js";

export default function Page({
  resource,
  record,
}: {
  resource: string;
  record: any;
}) {
  return (
    <ResourceProvider resource={resource}>
      <RecordProvider record={record}>
        <ResourceEditView />
      </RecordProvider>
    </ResourceProvider>
  );
}
