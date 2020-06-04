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
    const createUserParams = createParams(body, timestamp, uuid);

    const {joiError, value} = registerSchema().validate (body);

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
    let payload = createUserParams.insertParams.Item;
    payload.password = sha256 (payload.password);
    payload.repeat_password = sha256 (payload.repeat_password);
    payload.id_number = sha256 (payload.id_number);

    return {
      statusCode: 200,
      body: JSON.stringify (payload),
    };
  } catch (e) {
    console.log(e);
    return {
      statusCode: 400,
      body: JSON.stringify (e.details),
    };
  }
};
