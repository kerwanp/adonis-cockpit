import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class Post extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare firstName?: string;

  @column()
  declare lastName: string | null;
}
