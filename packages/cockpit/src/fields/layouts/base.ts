import { Serializable } from "../../types.js";
import { BaseField } from "../base.js";

export type LayoutDisplayOptions = {
  update: boolean;
  create: boolean;
};

export class BaseLayout implements Serializable {
  protected kind = this.constructor.name;
  protected fields: BaseField[] = [];
  protected display: LayoutDisplayOptions = {
    update: true,
    create: true,
  };

  toJSON() {
    return {
      kind: this.kind,
      display: this.display,
      fields: this.fields.map((field) => field.toJSON()),
    };
  }
}
