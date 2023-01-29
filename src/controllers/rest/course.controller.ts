import { Controller, Inject } from "@tsed/di";
import { BodyParams, QueryParams } from "@tsed/platform-params";
import { Get, Post } from "@tsed/schema";
import { Authenticate } from "@tsed/passport";
import { CourseService } from "src/services/course.service";
import { Course } from "src/models/Course";

@Controller("/course")
export class courseController {
  @Inject(CourseService)
  private courseService: CourseService;

  @Post("/")
  @Authenticate("jwt")
  post(@BodyParams() body: Course) {
    return this.courseService.create(body);
  }

  @Get("/")
  @Authenticate("jwt")
  get(@QueryParams("filter") filter?: string) {
    return filter ? this.courseService.find(filter) : this.courseService.find();
  }
}
