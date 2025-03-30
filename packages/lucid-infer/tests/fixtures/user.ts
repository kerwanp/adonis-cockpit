import { DateTime } from "luxon";
import { BaseModel, column } from "@adonisjs/lucid/orm";

export default class User extends BaseModel {
  @column({ isPrimary: true })
  declare id: string;

  @column()
  declare firstName?: string;

  @column()
  declare lastName: string | null;

  @column()
  declare isAdmin: boolean;

  @column()
  declare roles: string[];

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime;

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null;
}
