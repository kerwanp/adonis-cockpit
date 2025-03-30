import { args, BaseCommand } from "@adonisjs/core/ace";
import { Codemods } from "@adonisjs/core/ace/codemods";
import { BaseModel } from "@adonisjs/lucid/orm";
import { stubsRoot } from "../stubs/main.js";
import "../src/extensions.js";
import { resourceFileName, resourceName } from "../src/utils/generators.js";
import { LucidModel } from "@adonisjs/lucid/types/model";
import { inferModel } from "@adonis-cockpit/lucid-infer";
import { Column } from "@adonis-cockpit/lucid-infer/types";

type FieldDef = {
  name: string;
  isApplicable: (model: LucidModel, column: Column) => boolean;
  statement: (model: LucidModel, column: Column) => string;
};

function buildStatement(...elements: (string | false)[]) {
  return elements.filter(Boolean).join(".");
}

function matchRegex(value: string, regexp: RegExp) {
  return Boolean(value.toLowerCase().match(regexp));
}

const FIELDS: FieldDef[] = [
  {
    name: "Id",
    isApplicable: (_model, column) => column.options.isPrimary,
    statement: (_model, column) => buildStatement(`form.id('${column.key}')`),
  },
  {
    name: "Email",
    isApplicable: (_model, column) =>
      column.type === "string" &&
      column.type === "string" &&
      matchRegex(column.key, /(mail)/),
    statement: (_, column) =>
      buildStatement(
        "form",
        `email('${column.key}')`,
        !column.optional && "required()",
      ),
  },
  {
    name: "Url",
    isApplicable: (_model, column) =>
      column.type === "string" && matchRegex(column.key, /(site|url)/),
    statement: (_, column) =>
      buildStatement(
        "form",
        `email('${column.key}')`,
        !column.optional && "required()",
      ),
  },
  {
    name: "Text",
    isApplicable: (_model, column) => column.type === "string",
    statement: (_, column) =>
      buildStatement(
        `form.text('${column.key}')`,
        !column.optional && "required()",
      ),
  },
];

export default class MakeResource extends BaseCommand {
  static commandName = "make:resource";
  static description = "Make a new Cockpit resource";

  @args.string({ description: "Name of the resource class", required: false })
  declare name: string;

  $codemods?: Codemods;

  async #codemods() {
    if (!this.$codemods) this.$codemods = await this.createCodemods();
    return this.$codemods;
  }

  async #askResourceName() {
    const name =
      this.name ??
      (await this.prompt.ask("Name of your resource", {
        hint: "User",
        validate: (v) => v.length > 0,
      }));

    return name;
  }

  #getModelInfo(value: string) {
    const name = this.app.generators.modelName(value);
    const entity = this.app.generators.createEntity(name);
    const modelFileName = this.app.generators.modelFileName(entity.name);
    const path = this.app.modelsPath(entity.path, modelFileName);

    return {
      name,
      path,
    };
  }

  async #askModelName(name: string) {
    const codemods = await this.#codemods();
    const tsMorph = (await codemods.getTsMorphProject())!;
    const modelName = await this.prompt.ask("Path or name of your model", {
      default: name,
      validate: (value) => {
        if (value.length <= 0) return false;

        const model = this.#getModelInfo(value);
        const file = tsMorph.getSourceFile(model.path);

        if (!file) return `Cannot find model ${model.name}`;

        return true;
      },
    });

    return this.app.generators.modelName(modelName);
  }

  async run(): Promise<void> {
    const codemods = await this.#codemods();
    const name = await this.#askResourceName();
    const modelName = await this.#askModelName(name);

    const modelInfo = this.#getModelInfo(modelName);

    const { default: Model } = (await import(modelInfo.path)) as {
      default: typeof BaseModel;
    };

    const columns = await inferModel(modelInfo.path);

    const fields: { field?: FieldDef; column: Column }[] = [];
    for (const column of columns) {
      const field = FIELDS.find((f) => f.isApplicable(Model, column));
      fields.push({
        field,
        column,
      });
    }

    const selected = await this.prompt.multiple(
      "What columns do you want to include?",
      fields.map((field) => ({
        name: field.column.key,
        hint: field.field
          ? [
              field.field.name,
              field.column.optional ? "Optional" : "Required",
            ].join(" | ")
          : "Unkown type",
        disabled: !field.field,
      })),
      { default: fields.map((field) => field.column.key) },
    );

    await codemods.makeUsingStub(stubsRoot, "make/resource.stub", {
      resourceName: resourceName(name),
      resourcePath: this.app.resourcesPath(
        resourceFileName(resourceName(name)),
      ),
      modelName: modelName,
      modelPath: "#models/user",
      fields: fields
        .filter((field) => selected.includes(field.column.key) && field.field)
        .map((field) => field.field!.statement(Model, field.column))
        .map((s) => `        ${s}`)
        .join(",\n"),
    });
  }
}
