"use strict";

import * as Hapi from "hapi";
import emailController = require("../controller/email");
import RouteIndex = require("../../index");
import * as Joi from "joi";

export = (function(): Array<RouteIndex.Route>{
  return [
    {
      method: "POST",
      path: "/email/send",
      config: {
        handler: emailController.send,
        tags: ["api"],
        auth: false,
        validate: {
          payload: {
            email_from: Joi.string().required().description('email pengirim'),
            email_to: Joi.string().required().description('email penerima'),
            email_subject: Joi.string().required().description('subjek / judul email'),
            email_template: Joi.string().required().description('template / teks email'),
            attachment: Joi.string().optional().description('attachment data email')
          }
        }
      }
    },
		{
      method: "GET",
      path: "/email/callback",
      config: {
        handler: emailController.callback,
        tags: ["api"],
        auth: false
      }
    }
  ];
}());
