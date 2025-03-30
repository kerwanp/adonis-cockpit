import { test } from "@japa/runner";
import { inferModel } from "../src/infer.js";

test("infer", async () => {
  const result = await inferModel("../tests/fixtures/user.js");

  console.log(result);
});
