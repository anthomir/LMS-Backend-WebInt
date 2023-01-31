import { Inject, Req, Res, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import jwt from "jsonwebtoken";
import { TeacherApplication } from "src/models/TeacherApplication";
import { Role, Status } from "src/models/Enum";
import { Authenticate, Authorize } from "@tsed/passport";
import { User } from "../models/User";

@Service()
export class TeacherService {
  @Inject(TeacherApplication)
  private TeacherApplication: MongooseModel<TeacherApplication>;
  @Inject(User)
  private User: MongooseModel<User>;

  async find(filter?: any) {
    return filter? await this.TeacherApplication.find(filter): this.TeacherApplication.find();
  }

  async create(teacherApplication: TeacherApplication) {
    let model = await this.TeacherApplication.create(teacherApplication);
    return model;
  }

  async approve(req: Req, id: string) {
    const response = await this.TeacherApplication.updateOne({id: id}, {status: Status.Approved});
    let model = await this.TeacherApplication.findById(id);
    
    if(!model){
      throw Error("Not Found")
    }

    await this.User.updateOne({id: model?.id}, {role: Role.Teacher});
    return response;
  }

  async decline(req: Req, id: string) {

    let model = await this.TeacherApplication.updateOne({id: id}, {status: Status.Declined});
    return model;
  }
}
