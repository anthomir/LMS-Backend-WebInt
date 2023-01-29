import { Controller, Inject } from "@tsed/di";
import {
  BodyParams,
  HeaderParams,
  PathParams,
  QueryParams,
} from "@tsed/platform-params";
import { Get, Post, Put, Delete, Security, Header } from "@tsed/schema";
import { User } from "src/models/User";
import { UsersService } from "src/services/user.service";
import { Authenticate, Authorize } from "@tsed/passport";
import { Req, Res } from "@tsed/common";

@Controller("/user")
export class UserController {
  @Inject(UsersService)
  private usersService: UsersService;

  @Post("/")
  post(@BodyParams() body: User) {
    return this.usersService.create(body);
  }

  @Get("/")
  get(@QueryParams("filter") filter?: string) {
    return filter ? this.usersService.find(filter) : this.usersService.find();
  }

  @Post("/login")
  login(@BodyParams() body: any, @Res() res: Res) {
    return this.usersService.login(body, res);
  }

  @Delete("/")
  @Authenticate("jwt")
  delete(@Req() req: Req, @Res() res: Res) {
    return this.usersService.delete(req, res);
  }
}
