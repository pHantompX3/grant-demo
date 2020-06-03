const insertParams = {
  TableName: process.env.USER_TABLE,
  Item: {
    id: uuid.v1 (),
    phone_number: body.phone_number,
    password: body.password,
    repeat_password: body.repeat_password,
    proof_id: body.proof_id,
    proof_address: body.proof_address,
    proof_id_type: body.proof_id_type,
    name: body.name,
    date_of_birth: body.date_of_birth,
    id_number: body.id_number,
    proof_address_type: body.proof_address_type,
    address_line_one: body.address_line_one,
    address_line_two: body.address_line_two,
    address_parish: body.address_parish,
    address_country: body.address_country,
    createdAt: timestamp,
    updatedAt: timestamp,
  },
};

const emailScanParams = {
  TableName: process.env.USER_TABLE,
  FilterExpression: 'email = :aEmail',
  ExpressionAttributeValues: {':aEmail': body.email},
};

const createParams = {
  emailScanParams,
  insertParams,
};

module.exports = {
  createParams,
};
