import { TextField } from "./text.js";

export class IdField extends TextField {
  protected $icon = "fas fa-fingerprint";

  constructor(name: string) {
    super(name);
    this.disabled();
  }
}
