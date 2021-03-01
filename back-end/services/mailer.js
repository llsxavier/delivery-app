const nodemailer = require('nodemailer');

const transport = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: '34e9f889e66ccd', //env não aceitou valores
    pass: '3819cc18aa9303',
  },
});

module.exports = transport;
