import { db } from "@src/db/db";
import { sql } from "kysely";

class UsersGroupService {
  constructor() {}

  public getUsersByGroupId = async (groupId: number) => {
    const users = await db
      .selectFrom("users_groups as ug")
      .leftJoin("users as u", "u.user_id", "ug.user_id")
      .leftJoin("groups as g", "g.group_id", "ug.group_id")
      .select([
        "ug.group_id",
        "g.name as group_name",
        "ug.user_id",
        sql<string>`concat(u.first_name,' ',u.surname)`.as("users_name"),
      ])
      .where("ug.group_id", "=", groupId)
      .execute();
    return users;
  };

  public addUserToGroup = async (userId: number, groupId: number) => {
    const user = await db
      .insertInto("users_groups")
      .values({ group_id: groupId, user_id: userId })
      .executeTakeFirst();
    return user.insertId;
  };

  public deleteUserFromGroup = async (userId: number, groupId: number) => {
    const deletedUser = await db
      .deleteFrom("users_groups")
      .where("user_id", "=", userId)
      .where("group_id", "=", groupId)
      .executeTakeFirst();
    return deletedUser;
  };
}
export default UsersGroupService;
