const dynamoDB = require ('../../helpers/dynamodb');

module.exports.handler = async (event, context) => {
  try {
    const result = await dynamoDB
      .scan ({
        TableName: process.env.TRANSACTION_TABLE,
        FilterExpression: 'email = :current_user_email',
        ExpressionAttributeValues: {
          ':current_user_email': event.pathParameters.id,
        },
      })
      .promise ();
    return {
      statusCode: 200,
      body: JSON.stringify (result),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify (e.message),
    };
  }
};
