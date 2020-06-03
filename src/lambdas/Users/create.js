const uuid = require ('uuid');
const Joi = require ('@hapi/joi');
const dynamoDB = require ('../dynamodb');
const registerSchema = require ('../../validationSchemas/registerSchema');
const timestamp = new Date ().getTime ();
const {createParams} = require ('./db-Params/params');

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse (event.body);
    const {joiError, value} = Joi.validate (body, registerSchema);

    const result = await dynamoDB
      .scan (createParams.emailScanParams)
      .promise ();

    if (joiError) {
      throw joiError;
    }

    if (result.Count == 0) {
      throw new Error ('Email address already in use!');
    }

    
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify (e.details),
    };
  }
};
