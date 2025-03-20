import { PluginFn } from "edge.js/types";
import { viewsRoot } from "../../../resources/views/main.js";

export default function cockpitPlugin(): PluginFn<{}> {
  return (edge) => {
    edge.mount("cockpit", viewsRoot);
  };
}
