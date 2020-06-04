const getOne = require ('../Users/helpers-users/getOne');
const dynamoDB = require ('../../helpers/dynamodb');

module.exports.handler = async (event, context) => {
  try {
    const body = JSON.parse (event.body);
    const userID = {
      email: body.email,
      pass: body.pass,
    };
    const {result, status} = await getOne (userID, dynamoDB);
    if (status === 'ERROR') throw result.error;
    if (status === 'OK' && result.password === userID.pass)
      return {
        statusCode: 200,
        body: JSON.stringify ({
          meta: {
            statusCode: 200,
            message: 'Lets pretend actual auth happens here',
          },
          data: {
            token: result.Item.email,
            message: 'User exist, keep email address in the session, the email is used as the key for queries',
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
