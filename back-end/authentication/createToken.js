require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.MADONNA;

const createNewJwt = (payload) => {
  const jwtConfig = {
    expiresIn: '30m',
    algorithn: 'HS256',
  };

  const token = jwt.sign(payload, secret, jwtConfig);

  return token;
};

module.exports = createNewJwt;
