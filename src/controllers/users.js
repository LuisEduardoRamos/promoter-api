const {
  INVALID_SUBSCRIPTION,
  NOT_FOUND,
  INCOMPLETE_REQUEST,
} = require("../constants/errorCodes");
const User = require("../models/User");
const authService = require("../services/auth");
const cypher = require("../services/cypher");
const { registerValidator, loginValidator } = require("../services/validator");
const AppError = require("../utils/AppError");
const logger = require("../services/logger");

const register = async (req, res) => {
  const { error } = registerValidator.validate(req.body);

  if (error) {
    logger.error(error);
    throw error;
  }

  const { email } = req.body;
  const user = await User.findOne({ where: { email: email } });

  if (user) {
    logger.error(`${user.email} already registered`);
    throw new AppError(INVALID_SUBSCRIPTION, "User already exists");
  }

  const newUser = new User({
    ...req.body,
  });

  try {
    await newUser.save();
    logger.info(`${newUser.email} created`);
    const { dataValues } = newUser;
    delete dataValues.password;
    const token = await authService.createToken(newUser);
    res.status(201).json({ ...dataValues, token: token });
  } catch (err) {
    throw new Error(err);
  }
};

const login = async (req, res) => {
  const { error } = loginValidator.validate(req.body);

  if (error) {
    throw error;
  }

  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email: email },
  });

  if (!user) {
    throw new AppError(INVALID_SUBSCRIPTION, "Invalid credentials");
  }

  if (cypher().comparePassword(password, user.password)) {
    const token = await authService.createToken(user);
    delete user.dataValues.password;
    return res.status(200).json({ ...user.dataValues, token });
  }

  throw new AppError(INVALID_SUBSCRIPTION, "Invalid credentials");
};

const auth = (req, res) => {
  res.status(200).json(req.user);
}

module.exports = { register, login, auth };