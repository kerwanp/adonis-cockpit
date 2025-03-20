import { dirname } from "path";
import { fileURLToPath } from "url";

export const viewsRoot = dirname(fileURLToPath(import.meta.url));
