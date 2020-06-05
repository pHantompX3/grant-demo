const dynamoDB = require('../../../helpers/dynamodb');

module.exports.handler = async (event, context) => {
  try {
    const result = await dynamoDB.scan({
      TableName: process.env.USERS_TABLE,
      FilterExpression : 'Year = :this_year',
      ExpressionAttributeValues : {':this_year' : 2015}
    }).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (e) {
    return {
      statusCode: 500,
      body: JSON.stringify(e.message),
    };
  }
};
