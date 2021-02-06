const userModel = require('../models/userModel');

const validateUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //regex validando apenas com ".com" ou com abreviação do país
    const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailTest.test(email) || password.length < 6) {
      throw new Error('Senha ou e-mail incorretos. Tente novamente!');
    }

    const data = await userModel.searchUserByEmail(email);
    if (data === null || data.password !== password) {
      throw new Error('Usuário não registrado.');
    }

    next();
  } catch (err) {
    return res.status(200).json({ err: err.message });
  }
};

const validateNewUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    //regex validando apenas com ".com" ou com abreviação do país
    const emailTest = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!emailTest.test(email) || password.length < 6) {
      throw new Error('Senha ou e-mail incorretos. Tente novamente!');
    }

    const data = await userModel.searchUserByEmail(email);
    if (data) {
      throw new Error('E-mail já está cadastrado!');
    }

    next();
  } catch (err) {
    return res.status(200).json({ err: err.message });
  }
};

module.exports = {
  validateUser,
  validateNewUser,
};
