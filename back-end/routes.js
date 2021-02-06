const router = require('express').Router();
const userController = require('./controllers/userController');
const userValidations = require('./middlewares/userValidations')

router.post('/login', userValidations.validateUser, userController.login);
router.post('/register', userValidations.validateNewUser, userController.register);
router.post('/getNewPassword', userController.getNewPass);

module.exports = router;
