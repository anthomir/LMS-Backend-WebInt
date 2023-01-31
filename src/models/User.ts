import { CollectionOf, Email, Required, Default } from "@tsed/schema";
import { Model, ObjectID, Ref, Select, Unique } from "@tsed/mongoose";
import { Course } from "./Course";
import { Role } from "./Enum";

@Model()
export class User {
  @ObjectID("_id")
  _id: string;

  @Required()
  name: string;

  @Required()
  @Email()
  @Unique()
  email: string;

  @Default(Role.User)
  role: string;

  @Required()
  @Select(false)
  password: string;

  @Ref(() => Course)
  @CollectionOf(() => Course)
  course: Ref<Course>;
}
