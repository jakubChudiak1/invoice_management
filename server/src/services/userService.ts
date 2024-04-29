import { db } from "@src/db/db";
import { sql } from "kysely";
class UserService {
  constructor() {}

  public async getUsers() {
    const users = await db
      .selectFrom("users")
      .select([
        "user_id",
        "email",
        sql<string>`concat(first_name, ' ', surname)`.as("full_name"),
      ])
      .execute();
    return users;
  }

  public async getUserById(userId: number) {
    const user = await db
      .selectFrom("users")
      .select([
        "user_id",
        "email",
        sql<string>`concat(first_name, ' ', surname)`.as("full_name"),
      ])
      .where("user_id", "=", userId)
      .executeTakeFirst();
    return user;
  }
}

export default UserService;
