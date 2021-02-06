require('dotenv/config');
const path = require('path');
const nodemailer = require('nodemailer');
const handlebars = require('nodemailer-express-handlebars');

const transport = nodemailer.createTransport({
  host: process.env.HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

transport.use('compile', handlebars({
  viewEngine: {
    defaultLayout: undefined,
    partialsDir: path.resolve('./back-end/services/resources/mail'),
    compilerOptions: undefined,
  },
  viewPath: path.resolve('./back-end/services/resources/mail'),
  extName: '.html',
}));

module.exports = transport;
