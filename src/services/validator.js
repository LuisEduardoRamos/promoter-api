const Joi = require("joi");

const registerValidator = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
});

const loginValidator = Joi.object({
  email: Joi.string().email().max(100).required(),
  password: Joi.string().max(100).required(),
});

const prospectValidator = Joi.object({
  name: Joi.string().max(50).required(),
  first_surname: Joi.string().max(50).required(),
  second_surname: Joi.string().max(50).required(),
  street: Joi.string().max(100).required(),
  number: Joi.number().positive().required(),
  neighborhood: Joi.string().max(100).required(),
  postal_code: Joi.number().positive().required(),
  city: Joi.string().max(50).required(),
  phone: Joi.number().positive().required(),
  rfc: Joi.string().max(20).required(),
  status: Joi.string().valid("Enviado", "Autorizado", "Rechazado").required(),
  attended_by: Joi.number().integer().positive().required(),
  observations: Joi.string().max(500).optional(),
});

const updateProspectSchema = Joi.object({
  status: Joi.string().valid("Enviado", "Autorizado", "Rechazado").required(),
  observations: Joi.string().max(500).required(),
});

module.exports = {
  registerValidator,
  loginValidator,
  prospectValidator,
  updateProspectSchema,
};
