const uuid = require ('uuid');
const timestamp = new Date ().getTime ();
const dynamoDB = require ('../../helpers/dynamodb');
const transactionSchema = require ('../../validationSchemas/transactionSchema');
const {createParams} = require ('./db-Params/params');
const getOne = require ('../Users/helpers-users/getOne');

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse (event.body);

    const {joiError, value} = transactionSchema ().validate (body);

    if (joiError) {
      throw joiError;
    }

    const {result, status, error} = await getOne (
      {email: body.email},
      dynamoDB
    );

    if (status === 'ERROR') throw error;

    let currentBalance = result.Item.current_balance - body.transactionAmount;
    let availableBalance =
      result.Item.available_balance - body.transactionAmount;

    const transactionParams = createParams (
      {...body, newABalance: availableBalance, newCBalance: currentBalance},
      timestamp,
      uuid
    );

    await dynamoDB.put (transactionParams.insertParams).promise ();

    const userUpdate = await dynamoDB
      .update (transactionParams.updateUserBalanceParams)
      .promise ();

    let payload = transactionParams.insertParams.Item;

    return {
      statusCode: 200,
      body: JSON.stringify ({
        meta: {statusCode: 200},
        data: {
          trans: payload,
          user: userUpdate,
        },
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
