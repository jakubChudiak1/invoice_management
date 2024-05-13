import { Group } from "./group";
import { User } from "./user";

export interface UserGroup extends User, Group {
  users_group_id: number;
  user_id: number;
  group_id: number;
}
