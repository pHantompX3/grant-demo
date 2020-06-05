module.exports.createParams = (body, timestamp, uuid) => {
  const insertParams = {
    TableName: process.env.TRANSACTION_TABLE,
    Item: {
      id: uuid.v1 (),
      email: body.email,
      merchant_name: body.merchantName,
      merchant_ID: body.merchantID,
      transaction_amount: body.transactionAmount,
      createdAt: timestamp,
      updatedAt: timestamp,
    },
  };
  const updateUserBalanceParams = {
    TableName: process.env.USER_TABLE,
    Key: {
      email: body.email,
    },
    UpdateExpression: 'set current_balance = :cb, available_balance=:ab',
    ExpressionAttributeValues: {
      ':ab': body.newABalance,
      ':cb': body.newCBalance,
    },
    ReturnValues: 'UPDATED_NEW',
  };

  const transactionsByEmailParams = {
    TableName: process.env.USER_TABLE,
    FilterExpression: 'email = :aEmail',
    ExpressionAttributeValues: {':aEmail': body.email},
  };
  const transactionByIDParams = {
    TableName: process.env.USER_TABLE,
    FilterExpression: 'email = :aEmail',
    ExpressionAttributeValues: {':aEmail': body.email},
  };

  const createTransactionParams = {
    transactionsByEmailParams,
    transactionByIDParams,
    insertParams,
    updateUserBalanceParams,
  };

  return createTransactionParams;
};
