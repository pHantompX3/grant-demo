const Joi = require ('@hapi/joi');
const uuid = require ('uuid');
const timestamp = new Date ().getTime ();
const dynamoDB = require ('../../helpers/dynamodb');
const registerSchema = require ('../../validationSchemas/registerSchema');
const {createParams} = require ('./db-Params/params');
const sha256 = require ('crypto-js/sha256');

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse (event.body);
    const createUserParams = createParams (body, timestamp, uuid);

    const {joiError, value} = registerSchema ().validate (body);

    const result = await dynamoDB
      .scan (createUserParams.emailScanParams)
      .promise ();

    if (joiError) {
      throw joiError;
    }

    if (result.Count != 0) {
      throw new Error ('Email address already in use!');
    }

    await dynamoDB.put (createUserParams.insertParams).promise ();

    return {
      statusCode: 200,
      body: JSON.stringify ({
        meta: {statusCode: 200},
        data: payload,
        error: {},
      }),
    };
  } catch (e) {
    return {
      statusCode: 400,
      body: JSON.stringify ({
        meta: {statusCode: 400, message: e.message},
        data: {},
        error: e.message,
      }),
    };
  }
};
