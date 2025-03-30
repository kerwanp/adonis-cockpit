import { useResource } from "../../../providers/resource.js";
import { ResourceForm } from "../../resources/form.js";
import { PageTitle } from "../../ui/page_title.js";

export const ResourceCreateView = () => {
  const { resource } = useResource();

  return (
    <div className="flex-1 flex flex-col p-4 md:p-6">
      <PageTitle>Create {resource.label}</PageTitle>
      <ResourceForm type="create" />
    </div>
  );
};
