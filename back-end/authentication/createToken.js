require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.MADONNA;

const createNewJwt = (payload) => {
  try {
    const jwtConfig = {
      expiresIn: '30m',
      algorithm: 'HS256',
    };

    const token = jwt.sign(payload, secret, jwtConfig);

    return token;
  } catch (e) {
    console.log(e);
  }
};

module.exports = createNewJwt;
