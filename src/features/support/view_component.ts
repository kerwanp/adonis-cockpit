import edge from 'edge.js'
import { Component } from './component.js'
import { Htmlable } from './contracts/htmlable.js'

export abstract class ViewComponent extends Component implements Htmlable {
  abstract view: string
  viewData: Record<string, any> = {}

  setView(view?: string, viewData: Record<string, any> = {}) {
    if (!view) {
      return this
    }

    this.view = view

    if (viewData) {
      this.setViewData(viewData)
    }

    return this
  }

  setViewData(data: Record<string, any>) {
    this.viewData = {
      ...this.viewData,
      data,
    }

    return this
  }

  getView(): string {
    return this.view
  }

  toHtml(): Promise<string> {
    return this.render()
  }

  render() {
    return edge.render(this.getView(), {
      ...this.viewData,
    })
  }
}
