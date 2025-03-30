import { ErrorBoundary } from "react-error-boundary";
import { ResourceTable } from "../../resources/table.js";

export const ResourceIndexView = () => {
  return (
    <ErrorBoundary fallback={"An error occured"}>
      <ResourceTable />
    </ErrorBoundary>
  );
};
