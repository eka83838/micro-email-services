"use strict";
const env = require("dotenv").config();

import * as Server from "./config/server";
import constants = require("./config/constants");

console.log(`Running enviroment ${process.env.APP || "dev"}`);

// Catch unhandling unexpected exceptions
process.on("uncaughtException", (error: Error) => {
    console.error(`uncaughtException ${error.message}`);
});

// Catch unhandling rejected promises
process.on("unhandledRejection", (reason: any) => {
    console.error(`unhandledRejection ${reason}`);
});

const server = Server.init(constants);
server.register({
    register: require("good"),
    options: constants.options
}, function(err: any){
    if (err) {
        throw err;
    }
    server.start(function(){
        server.log("info", "Server running in port # " + server.info.uri);
    });
});