import {Inject, Req} from "@tsed/common";
import {Unauthorized} from "@tsed/exceptions";
import {Arg, OnInstall, OnVerify, Protocol} from "@tsed/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import { UsersService } from "../services/user.service";

@Protocol({
  name: "jwt",
  useStrategy: Strategy,
  settings: {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: String(process.env.SECRET)
  }
})
export class JwtProtocol implements OnVerify, OnInstall {
  @Inject()
  usersService: UsersService;

  async $onVerify(@Req() req: Req, @Arg(0) jwtPayload: any) {
    const user = await this.usersService.findById(jwtPayload.sub);

    if (!user) {
      throw new Unauthorized("Wrong token");
    }

    req.user = user;

    return user;
  }

  $onInstall(strategy: Strategy): void {
    console.log("Test")
  }
}

