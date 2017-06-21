"use strict";

export = (function(){
    const env = process.env.APP || "development";

    const obj: any = {
        application: {
            url: process.env.APP_URL,
            host: process.env.APP_HOST,
            port: process.env.APP_PORT
        },
        server: {
            defaultURL: process.env.APP_URL || "http://localhost:3000/"
        },
        secret: process.env.APP_SECRET,
        options: {
            ops: {
            interval: 1000
            },
            reporters: {
            console: [{
                module: "good-squeeze",
                name: "Squeeze",
                args: [{ log: "*", response: "*", request: "*", error: "*" }]
            }, {
                module: "good-console"
            }, "stdout"],
            file: [{
                module: "good-squeeze",
                name: "Squeeze",
                args: [{ response: "*", log: "*", request: "*", error: "*" }]
            }, {
                module: "good-squeeze",
                name: "SafeJson"
            }, {
                module: "rotating-file-stream",
                args: [
                "site_log.log",
                {
                    "path": "./logs",
                    "size": "10K",
                    "interval": "1d",
                    "compress": true
                }
                ]
            }]
            }
        }
    };

    // error handler for the config
    if (!obj.application.host) {
        throw new Error("Missing constant application.host. " + "Check our environment variables APP_HOST.");
    } else if (!obj.application.port) {
        throw new Error("Missing constant application.port. " + "Check your enviroment variable APP_PORT.");
    }

    return obj;
}());
