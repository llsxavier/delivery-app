const userModel = require('../models/userModel');

const validateUser = async (req, res, next) => {
  const { email, password } = req.body;

  const user = await userModel.searchUserByEmail(email);

  if (user === null || user.password !== password) {
    return res.status(200).json({ err: 'incorrect user or password' });
  }

  next();
};

module.exports = {
  validateUser,
};
