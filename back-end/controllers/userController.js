const userModel = require('../models/userModel');
const createNewJwt = require('../authentication/createToken');

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await userModel.searchUserByEmail(email);
    const token = createNewJwt(data);
    delete data.password;
    return res.status(200).json({ data, token });
  } catch (e) {
    console.log(e);
    return res
      .status(503)
      .json({ err: 'Servidor indisponível. Tente novamente mais tarde!' });
  }
};

const register = async (req, res) => {
  try {
    const { name, lastname, email, password, role } = req.body;
    const concatenadName = `${name} ${lastname}`
    await userModel.register(
      concatenadName,
      email,
      password,
      role
    );
    const newUser = await userModel.searchUserByEmail(email);
    const token = createNewJwt(newUser);
    delete newUser.password;
    return res.status(200).json({ newUser, token });
  } catch (e) {
    console.log(e);
    return res
      .status(503)
      .json({ err: 'Servidor indisponível. Tente novamente mais tarde!' });
  }
};

module.exports = {
  login,
  register,
};
