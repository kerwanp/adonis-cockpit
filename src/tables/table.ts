export class Table {
  view = 'admin::tables/index'

  public static make(): Table {
    return new Table()
  }
}
