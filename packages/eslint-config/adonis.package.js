import { configPkg } from "@adonisjs/eslint-config";

export default configPkg({
  ignores: ["tests/tmp/**", "coverage/**", "build/**"],
});
