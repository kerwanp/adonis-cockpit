import { ModelQueryBuilderContract } from "@adonisjs/lucid/types/model";
import { TextField } from "./text.js";

export class IdField extends TextField {
  protected $icon = "fas fa-fingerprint";

  constructor(name: string) {
    super(name);
    this.disabled().searchable();
  }

  $search(value: string, query: ModelQueryBuilderContract<any, any>): void {
    query.orWhere(this.$name, value);
  }
}
