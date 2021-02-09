const userModel = require('../models/userModel');
const createNewJwt = require('../authentication/createToken');
const crypto = require('crypto'); // já vem com o node e gera um token aleatório;
const moment = require('moment');
const mailer = require('../services/mailer');

const login = async (req, res) => {
  try {
    const { email } = req.body;
    const data = await userModel.searchUserByEmail(email);
    const token = createNewJwt(data);
    delete data.password;
    delete data.passwordResetToken;
    delete data.passwordResetExpires;
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
    const concatenadName = `${name} ${lastname}`;
    await userModel.register(concatenadName, email, password, role);
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

const getNewPass = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.searchUserByEmail(email);
    const token = crypto.randomBytes(10).toString('hex');
    let now = new Date();
    now.setHours(now.getHours() + 1); //data de experiação do token configurada em uma hora;
    now = moment(now).format('YYYY/MM/DD HH:mm:ss');
    await userModel.setToken(user.email, token, now);
    mailer.sendMail(
      {
        to: email,
        from: 'no-reply@deliveryapp.com',
        subject: 'Mudança de Senha ✔',
        // text: 'Hello world?',
        html: `<h1>Delivery App</h1>
        <p>Recebemos uma solicitação de mudança de senha na sua conta.</p>
        <p>Caso não tenha feito o pedido, basta desconsiderar essa mensagem. Mas caso <b>
        queira alterar a senha</b> <a href=http://localhost:3000/setNewPassword/${token}/
        ?user=${email}>clique aqui</a>.</p>
        <p>O link expira em <b>uma hora</b>!`,
      },
      (err) => {
        if (err)
          return res
            .status(400)
            .send({ error: 'Cannot send forgot password email.' });
        return res.status(200).send();
      }
    );
  } catch (e) {
    console.log(e);
    return res
      .status(503)
      .json({ err: 'Servidor indisponível. Tente novamente mais tarde!' });
  }
};

const setNewPass = async (req, res) => {
  const { email, pass } = req.body;
  try {
    await userModel.updatePass(email, pass);
    res.status(200).send();
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
  getNewPass,
  setNewPass,
};
