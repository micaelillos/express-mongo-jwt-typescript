import Joi from 'joi';

// VALIDATION

// Register Validation
const registerValidation = async ({ email, password, name }: any) => {
  const schema = Joi.object().keys({
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  try {
    await schema.validateAsync({ email, password, name });
  } catch (error) {
    return error;
  }
  return null;
};

// Login Validation
const loginValidation = async ({ email, password }: any) => {
  const schema = Joi.object().keys({
    email: Joi.string().min(6).required().email(),
    password: Joi.string().min(6).required(),
  });
  try {
    await schema.validateAsync({ email, password });
  } catch (error) {
    return error;
  }
  return null;
};

module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
