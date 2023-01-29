import { Inject, Req, Res, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import jwt from "jsonwebtoken";
import { TeacherApplication } from "src/models/TeacherApplication";
import { Status } from "src/models/Enum";
import { Authenticate, Authorize } from "@tsed/passport";

@Service()
export class TeacherService {
  @Inject(TeacherApplication)
  private TeacherApplication: MongooseModel<TeacherApplication>;

  async find(filter?: any) {
    return filter? await this.TeacherApplication.find(filter): this.TeacherApplication.find();
  }

  async create(teacherApplication: TeacherApplication) {
    let model = await this.TeacherApplication.create(teacherApplication);
    return model;
  }

  async approve(req: Req, id: string) {
    let model = await this.TeacherApplication.updateOne({id: id}, {status: Status.Approved});
    return model;
  }

  async decline(req: Req, id: string) {

    let model = await this.TeacherApplication.updateOne({id: id}, {status: Status.Declined});
    return model;
  }
}
