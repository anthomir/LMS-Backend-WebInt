import { CollectionOf, Email, Required, Default, Format } from "@tsed/schema";
import { Model, ObjectID, Ref, Schema } from "@tsed/mongoose";
import { Status } from "./Enum";

@Model()
export class TeacherApplication {
  @ObjectID("id")
  _id: string;

  @Required()
  userId: string;

  @Required()
  reason: string;

  @Default(Status.Pending)
  status: Status;

  @Format("date-time")
  @Default(Date.now)
  createdAt: Date = new Date();
}