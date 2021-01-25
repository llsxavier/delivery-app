require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.MADONNA;

const validateToken = async (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res.status(401).json({ message: 'Missing authorization token.' });

  try {
    const validToken = jwt.verify(token, secret);

    if (!validToken)
      return res.status(401).json({ message: 'Token not valid.' });

    const user = await userModel.searchUserByEmail(tokenValid.email);

    if (!user) return res.status(401).json({ message: 'User not found.' });

    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: 'jwt malformed' });
  }
};

module.exports = validateToken;
