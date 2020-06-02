const schema = {
  email: Joi.string ().email ({
    minDomainSegments: 2,
    tlds: {allow: true},
  }),

  phone_number: Joi.string ().length (10).regex (/^\d+$/),

  password: Joi.string ().pattern (new RegExp ('^[a-zA-Z0-9]{3,30}$')),

  repeat_password: Joi.ref ('password'),

  proof_id: Joi.string ().base64 (),

  proof_address: Joi.string ().base64 (),

  proof_id_type: Joi.string (),

  name: Joi.string (),

  date_of_birth: Joi.date (),

  id_number: Joi.string (),

  proof_address_type: Joi.string (),

  address_line_one: Joi.string (),

  address_line_two: Joi.string (),

  address_parish: Joi.string (),

  address_country: Joi.string (),
};

module.exports.resgisterSchema = () => {
  return Joi.object (schema);
};
