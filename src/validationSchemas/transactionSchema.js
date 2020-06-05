const Joi = require ('@hapi/joi');
module.exports = () => {
  const schema = {
    email: Joi.string ().email ({
      minDomainSegments: 2,
      tlds: {allow: true},
    }),

    merchant_name: Joi.string ().required (),

    merchant_id: Joi.string ().min (8).max (8).required (),

    transaction_amount: Joi.number ().less (20000.0),
  };

  return Joi.object (schema);
};
