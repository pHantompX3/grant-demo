const uuid = require ('uuid');
const Joi = require ('@hapi/joi');
const dynamoDB = require ('../dynamodb');
const registerSchema = require ('../../validationSchemas/registerSchema');

module.exports.handler = (event, context) => {
  try {
    const body = JSON.parse (event.body);
    const timestamp = new Date ().getTime ();


  } catch (e) {}
};
