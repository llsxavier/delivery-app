const router = require('express').Router();
const userController = require('./controllers/userController');
const userValidations = require('./middlewares/userValidations')

router.post('/login', userValidations.validateUser, userController.login);
router.post('/register', userValidations.validateNewUser, userController.register);
router.post('/getNewPassword', userValidations.userCheck, userController.getNewPass);
router.post('/setNewPassword/:tk', userController.setNewPass);

module.exports = router;
