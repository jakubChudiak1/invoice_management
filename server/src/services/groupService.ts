import { db } from "@src/db/db";

class GroupService {
  constructor() {}

  public getGroups = async () => {
    const groups = await db
      .selectFrom("groups")
      .select(["group_id", "name as group_name"])
      .execute();
    return groups;
  };

  public getGroupById = async (groupId: number) => {
    const group = await db
      .selectFrom("groups")
      .select(["group_id", "name as group_name"])
      .where("group_id", "=", groupId)
      .executeTakeFirst();
    return group;
  };

  public getGroupByName = async (groupName: string) => {
    const group = await db
      .selectFrom("groups")
      .select(["group_id", "name as group_name"])
      .where("name", "=", groupName)
      .executeTakeFirst();
    return group;
  };

  public createGroup = async (groupName: string) => {
    const newGroup = await db
      .insertInto("groups")
      .values({ name: groupName })
      .executeTakeFirst();
    return newGroup.insertId;
  };

  public updateGroup = async (groupId: number, groupName: string) => {
    const updatedGroup = await db
      .updateTable("groups")
      .set({ name: groupName })
      .where("group_id", "=", groupId)
      .executeTakeFirst();
    return updatedGroup;
  };

  public deleteGroup = async (groupId: number) => {
    const deletedGroup = await db
      .deleteFrom("groups")
      .where("group_id", "=", groupId)
      .executeTakeFirst();
    return deletedGroup;
  };
}
export default GroupService;
