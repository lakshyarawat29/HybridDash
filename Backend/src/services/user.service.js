const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

async function register({ username, email, password, role }) {
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw new Error('User already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name: username,  // 👈 mapping username param to model's `name`
      email,
      passwordHash: hashedPassword, // 👈 correct field name
      role: role || 'user',
    });

    return { id: user.id, username: user.name, email, role: user.role };
  } catch (err) {
    throw new Error(`Registration failed: ${err.message}`);
  }
}

async function login({ email, password }) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error('User not found');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash); // 👈 correct field name
    if (!isMatch) {
      throw new Error('Invalid credentials');
    }

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    return {
      token,
      user: { id: user.id, username: user.name, email, role: user.role },
    };
  } catch (err) {
    throw new Error(`Login failed: ${err.message}`);
  }
}

async function getProfile(userId) {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ['passwordHash'] },
    });
    if (!user) {
      throw new Error('User not found');
    }
    return user;
  } catch (err) {
    throw new Error(`Error fetching user: ${err.message}`);
  }
}

async function updateProfile(userId, { username, email }) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error('User not found');
    }

    await user.update({
      name: username,
      email,
    });

    return {
      id: user.id,
      username: user.name,
      email: user.email,
      role: user.role,
    };
  } catch (err) {
    throw new Error(`Error updating profile: ${err.message}`);
  }
}

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
};
