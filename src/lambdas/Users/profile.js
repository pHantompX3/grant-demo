const getOne = require ('../Users/helpers-users/getOne');
const dynamoDB = require ('../../helpers/dynamodb');

module.exports.handler = async (event, context) => {
  try {
    const userID = {email: event.pathParameters.id};
    const {result, status, error} = await getOne (userID, dynamoDB);

    if (status === 'ERROR') throw error;
    if (status === 'OK') {
      profileData = {
        name: result.Item.name,
        email: result.Item.email,
        dateOfBirth: result.Item.date_of_birth,
        phoneNumber: result.Item.phone_number,
        password: result.Item.password,
        currentBalance: result.Item.current_balance,
        availableBalance: result.Item.available_balance,
      };
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
