import * as Hapi from "hapi";
import * as path from "path";
import * as fs from "fs";
import * as _ from "lodash";

export class Route implements Hapi.IRouteConfiguration {
  method: string;
  path: string;
  handler?: Hapi.IRouteHandlerConfig;
  config?: Hapi.IRouteAdditionalConfigurationOptions;
}

export function registerRoutes(server: Hapi.Server): void {
  fs.readdirSync(__dirname).forEach(function(file: any) {
    if (file === "index.js" || file === "index.js.map") {
      return;
    }


    fs.readdirSync(__dirname + "/" + file + "/route").forEach(function(files: any) {
      if (file.includes(".js.map") === true) {
        return;
      }

      let routes: Route[] = require(path.join(__dirname + "/" + file + "/route", files));
      routes.forEach((route: Route) => {
        server.route(route);
      });
    });
  });
}