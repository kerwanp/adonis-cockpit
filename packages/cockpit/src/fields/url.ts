import { TextField } from "./text.js";

export class UrlField extends TextField {
  protected $icon = "fas fa-link";

  constructor(name: string) {
    super(name);
    this.type("url");
  }
}
