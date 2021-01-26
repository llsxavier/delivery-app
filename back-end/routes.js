const router = require('express').Router();
const userController = require('./controllers/userController');
const userValidations = require('./middlewares/userValidations')

router.post('/login', userValidations.validateUser, userController.login);

module.exports = router;
