"use strict"
import * as Hapi from "hapi"
import appRoot = require("app-root-path")
import fs = require('fs')
import axios from "axios"
const Model = require("./../../../models/index")["default"];

const apiKey = 'FIND_YOUR_API_KEY'

export async function send(request: Hapi.request, reply: Hapi.reply) {
  var reqHeaders = request.raw.req.headers
  if (reqHeaders.apikey && reqHeaders.apikey === process.env.EMAIL_KEY) {
    if (!request.payload.email_from || !request.payload.email_to || !request.payload.email_subject ||
    !request.payload.email_template) {
      return reply({status_code: 400, error: 'Bad request'}).code(400)
    } else {
      var email_from = request.payload.email_from
      var email_to = request.payload.email_to
      var email_subject = request.payload.email_subject
      var email_template = request.payload.email_template
      return axios.get('https://api.elasticemail.com/v2/email/send', {
        params: {
          apiKey: apiKey,
          from: email_from,
          to: email_to,
          subject: email_subject,
          bodyHtml: email_template,
          isTransactional: true
        },
        headers: {
          'Accept': 'application/json'
        }
      }).then(function (res) {
        if (res.data.success === true) {
          var message_id = res.data.data.messageid
          var transaction_id = res.data.data.transactionid
          var request = {
            message_id: message_id,
            transaction_id: transaction_id,
            email_from: email_from,
            email_to: email_to,
            email_content: email_template,
            email_status: 'Submitted',
          }
          return Model.email.create(request).then(function (res) {
            reply({status_code: 200, data: res}).code(200)
          }).catch(function (err) {
            reply({status_code: 422, error: 'Failed to insert data into database.'}).code(422)
          })
        } else {
          reply({status_code: 400, error: 'Failed to send email.'}).code(400)
        }
      }).catch(function (err) {
        reply({status_code: 422, error: 'Failed to submit data into elasticemail'}).code(422)
      })
    }
  } else {
    return reply({status_code: 401, error: 'Unauthorized'}).code(401)
  }
}

export async function callback(request: Hapi.request, reply: Hapi.reply) {
  var transaction_id = request.query.transaction
  var status = request.query.status
  Model.email.update(
    {email_status: status},
    {where: { transaction_id: transaction_id },
    returning: true
  }).then(function (results) {
    return reply({status: '200 OK'}).code(200)
  })
}
