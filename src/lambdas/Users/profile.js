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
    if (status === 'OK' && result.password === userID.pass) {

      profileData = {
        name: result.Item.name,
        email: result.Item.email,
        dateOfBirth: result.Item.date_of_birth,
        phoneNumber: result.Item.phone_number,
        password: result.Item.password
      }
      return {
        statusCode: 200,
        body: JSON.stringify ({
          meta: {
            statusCode: 200,
            message: 'Lets pretend actual auth happens here',
          },
          data: profileData,
          error: {},
        }),
      };
    }
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
