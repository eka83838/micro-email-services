"use strict";

import * as jwt from "jsonwebtoken";
import constants = require("../config/constants");
const secret = constants.secret;

function validateToken(request: any, decodedToken: any, callback: any) {
  return callback(null, true, decodedToken);
}

export = {
  validateToken: validateToken
};