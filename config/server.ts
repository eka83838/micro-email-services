"use strict";

import * as Hapi from "hapi";
import Token = require("../utils/token");
import serverRoutes = require("../module/index");

export function init(constants: any) {
    const host = constants.application.host;
    const port = constants.application.port;
    const secret = constants.secret;
    const server = new Hapi.Server();

    server.connection({
        port: port,
        host: host,
        routes: {
            cors: {
                origin: (process.env.CORS_ORIGIN) ? process.env.CORS_ORIGIN.split(",") : ["*"],
                additionalHeaders: ["cache-control"]
            }
        }
    });

    server.register([
        require("vision"),
        require("inert"),
        {
            register: require("hapi-swagger"),
            options: {
                info: {
                    title: process.env.SWAGGER_TITLE,
                    version: process.env.API_VERSION
                }
            }
        },
        {
            register: require("lout"),
            options: {
                apiVersion: process.env.API_VERSION
            }
        }
    ], function(err: any){
        if (err) {
            throw err;
        }
    });

    server.register(require("hapi-auth-jwt"), function(err: any){
        if (err) {
            throw err;
        }
        server.auth.strategy("token", "jwt", "required", {
            key: secret,
            validateFunc: Token.validateToken,
            verifyOptions: {
                algorithms: ["HS256"]
            }
        });
        serverRoutes.registerRoutes(server);
    });

    return server;
}