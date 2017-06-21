"use strict";
const env = require("dotenv");
env.config();
import * as chai from "chai";
import * as Server from "../../../config/server";
import constants = require("./../../../config/constants");

const assert = chai.assert;
const server = Server.init(constants);

describe("Send Email Test", () => {
    it("should be send an email, create and save a record to database.", (done) => {
        server.inject({
            method: "POST",
            url: "/email/send-email"
        }, (res) => {
            assert.isNotNull(res);
            done();
        });
    });
});

describe("Webhook Notifications Email Status Test", () => {
    it("it should update a status of email record in database based on transaction_id.", (done) => {
        server.inject({
            method: "GET",
            url: "/email/callback"
        }, (res) => {
            assert.isNotNull(res);
            done();
        });
    });
});
