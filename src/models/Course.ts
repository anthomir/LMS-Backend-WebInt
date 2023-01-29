import {CollectionOf, Email, Required, Default,Minimum,Maximum} from "@tsed/schema";
import {Model, ObjectID, Ref} from "@tsed/mongoose";
import { User } from "./User";

@Model()
export class Course {
  @ObjectID("id")
  _id: string;

  @Required()
  @Ref(() => User)
  ownerId: Ref<User>;

  @Required()
  title: string;

  @Required()
  description: any;

  @Default(0)
  @Minimum(0)
  @Maximum(5)
  rating: Number;
}