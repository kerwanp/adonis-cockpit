import { TextField } from "./text.js";

export class EmailField extends TextField {
  constructor(name: string) {
    super(name);
    this.type("email");
  }
}
