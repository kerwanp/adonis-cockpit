export interface Htmlable {
  toHtml(): Promise<string>
}
