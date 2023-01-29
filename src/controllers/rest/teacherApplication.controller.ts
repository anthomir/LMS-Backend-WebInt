import { Controller, Inject } from "@tsed/di";
import { BodyParams, PathParams, QueryParams } from "@tsed/platform-params";
import { Get, Post } from "@tsed/schema";
import { Authenticate } from "@tsed/passport";
import { CourseService } from "src/services/course.service";
import { Course } from "src/models/Course";
import { TeacherService } from "src/services/teacherApplication.service";
import { TeacherApplication } from "src/models/TeacherApplication";
import { Req } from "@tsed/common";

@Controller("/teacher")
export class teacherApplicationController {
  @Inject(TeacherService)
  private teacherService: TeacherService;

    @Post("/apply")
    @Authenticate("jwt")
    apply(@Req() req: Req, @BodyParams() body: TeacherApplication) {
        return this.teacherService.create(body);
    }

    @Post("/approve")
    @Authenticate("jwt")
    approve(@Req() req: Req, @QueryParams("id") id: string) {
        return this.teacherService.approve(req, id);
    }

    @Post("/decline")
    @Authenticate("jwt")
    decline(@Req() req: Req, @QueryParams("id") id: string) {
        return this.teacherService.decline(req, id);
    }

    @Get("/")
    @Authenticate("jwt")
    get(@QueryParams("filter") filter?: string) {
        return filter ? this.teacherService.find(filter) : this.teacherService.find();
    }
}
