import { BaseField } from "../base.js";
import { BaseLayout } from "./base.js";

export class PanelLayout extends BaseLayout {
  protected $title?: string;
  protected $description?: string;
  protected $columns = 4;

  /**
   * Defines the panel title.
   */
  title(title: string) {
    this.$title = title;
    return this;
  }

  /**
   * Defines the panel description.
   */
  description(description: string) {
    this.$description = description;
    return this;
  }

  /**
   * Defines the number of fields per row.
   *
   * @default 4
   */
  columns(columns: number) {
    this.$columns = columns;
    return this;
  }

  /**
   * Adds a field to this panel.
   */
  field(field: BaseField) {
    this.fields.push(field);
    return this;
  }

  toJSON() {
    return {
      ...super.toJSON(),
      title: this.$title,
      description: this.$description,
      columns: this.$columns,
    };
  }
}
