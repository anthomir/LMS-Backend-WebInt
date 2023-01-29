import { CollectionOf, Email, Required, Default } from "@tsed/schema";
import { Model, ObjectID, Ref } from "@tsed/mongoose";
import { Course } from "./Course";
import { Role } from "./Enum";

@Model()
export class User {
  @ObjectID("id")
  _id: string;

  @Required()
  name: string;

  @Required()
  @Email()
  email: string;

  @Required()
  @Default(Role.User)
  role: string;

  @Required()
  password: string;

  @Ref(() => Course)
  @CollectionOf(() => Course)
  course: Ref<Course>;
}