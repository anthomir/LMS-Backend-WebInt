import { Inject, Req, Res, Service } from "@tsed/common";
import { MongooseModel } from "@tsed/mongoose";
import { User } from "../models/User";
import jwt from "jsonwebtoken";
import { Course } from "src/models/Course";

@Service()
export class CourseService {
  @Inject(Course)
  private Course: MongooseModel<Course>;

  async find(filter?: any) {
    return filter ? await this.Course.find(filter) : this.Course.find();
  }

  async create(course: Course) {
    let model = await this.Course.create(course);
    return model;
  }
}
