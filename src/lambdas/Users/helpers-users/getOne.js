const isEmpty = require ('../../../helpers/isEmpty');

module.exports = async (userID, dynamoDB) => {
  try {
    const result = await dynamoDB
      .get ({
        TableName: process.env.USER_TABLE,
        Key: {
          email: userID.email,
        },
      })
      .promise ();

    if (isEmpty (result)) {
      throw new Error ('User does not exist!');
    }

    return {
      result,
      status: 'OK',
    };
  } catch (e) {
    // console.log (e);

    return {
      error: e,
      status: 'ERROR',
    };
  }
};
