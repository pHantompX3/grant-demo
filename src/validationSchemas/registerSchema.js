const schema = {
  email: Joi.string ().email ({
    minDomainSegments: 2,
    tlds: {allow: true},
  }),

  phone_number: Joi.string ().length (10).regex (/^\d+$/).required (),

  password: Joi.string ()
    .pattern (new RegExp ('^[a-zA-Z0-9]{3,30}$'))
    .required (),

  repeat_password: Joi.ref ('password').required (),

  proof_id: Joi.string ().base64 ().required(),

  proof_address: Joi.string ().base64 ().required(),

  proof_id_type: Joi.string ().required(),

  name: Joi.string ().required(),

  date_of_birth: Joi.date ().required(),

  id_number: Joi.string ().required(),

  proof_address_type: Joi.string ().required(),

  address_line_one: Joi.string ().required(),

  address_line_two: Joi.string ().required(),

  address_parish: Joi.string ().required(),

  address_country: Joi.string ().required(),
};

module.exports.resgisterSchema = () => {
  return Joi.object (schema);
};
