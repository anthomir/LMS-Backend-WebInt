import {readFileSync} from "fs";
import { join } from "path";
import {envs} from "./envs/index";
import loggerConfig from "./logger/index";
import mongooseConfig from "./mongoose/index";

const pkg = JSON.parse(readFileSync("./package.json", {encoding: "utf8"}));

export const config: Partial<TsED.Configuration> = {
  version: pkg.version,
  envs,
  logger: loggerConfig,
  mongoose: mongooseConfig,
  // additional shared configuration
  passport: {
    disableSession: true,
  },
  swagger: [
    {
      path: "/doc",
      specVersion: "3.0.1",
      spec: {
        components: {
          securitySchemes: {
            jwt: {
              type: "http",
              scheme: "bearer"
            }
          }
        }
      }
    }
  ],
  views: {
    root: join(process.cwd(), "../views"),
    extensions: {
      ejs: "ejs"
    }
  }
};
