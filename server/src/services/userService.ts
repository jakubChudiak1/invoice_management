import { db } from "@src/db/db";
import { sql } from "kysely";
import { Users } from "@src/db/types";
class UserService {
  constructor() {}

  public getUsers = async () => {
    const users = await db
      .selectFrom("users")
      .select([
        "user_id",
        "email",
        sql<string>`concat(first_name, ' ', surname)`.as("full_name"),
        "is_verified",
      ])
      .execute();
    return users;
  };

  public getUserById = async (userId: number) => {
    const user = await db
      .selectFrom("users")
      .select([
        "user_id",
        "email",
        sql<string>`concat(first_name, ' ', surname)`.as("full_name"),
        "is_verified",
      ])
      .where("user_id", "=", userId)
      .executeTakeFirst();
    return user;
  };

  public createUser = async (user: Omit<Users, "user_id" | "is_verified">) => {
    const { email, first_name, surname, password } = user;
    const newUser = await db
      .insertInto("users")
      .values({
        email: email,
        first_name: first_name,
        surname: surname,
        password: password,
      })
      .executeTakeFirst();
    return newUser.insertId;
  };
}

export default UserService;
