import { useRecord } from "../../../providers/record.js";
import { useResource } from "../../../providers/resource.js";
import { ResourceForm } from "../../resources/form.js";
import { PageTitle } from "../../ui/page_title.js";

export const ResourceEditView = () => {
  const { resource } = useResource();
  const { record } = useRecord();

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6">
      <PageTitle>
        Edit {resource.label} {record[resource.titleKey]}
      </PageTitle>
      <ResourceForm type="update" record={record} />
    </div>
  );
};
