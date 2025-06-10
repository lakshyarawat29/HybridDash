const { register, login, getProfile, updateProfile } = require('../services/user.service');
const { validationResult } = require('express-validator');

const registerController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const user = await register(req.body);
    res.status(201).json({ message: 'User registered', user });
  } catch (error) {
    next(error);
  }
};

const loginController = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const result = await login(req.body);
    res.json({ message: 'Login successful', ...result });
  } catch (error) {
    next(error);
  }
};

const getProfileController = async (req, res, next) => {
  try {
    const user = await getProfile(req.user.id);
    res.json(user);
  } catch (error) {
    next(error);
  }
};

const updateProfileController = async (req, res, next) => {
  try {
    const user = await updateProfile(req.user.id, req.body);
    res.json({ message: 'Profile updated', user });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register: registerController,
  login: loginController,
  getProfile: getProfileController,
  updateProfile: updateProfileController,
};