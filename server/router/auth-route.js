const express = require('express');
const authcontollers = require('../controller/auth-controller');
const validate = require('../middleware/vlidate-middleware');
const authMiddleware = require('../middleware/auth-middleware')
const {validateSchema,loginShema} = require('../zod-validatior/auth-validate');
const router = express.Router()

router.route('/').get(authcontollers.home)
router.route('/register').post(validate(validateSchema), authcontollers.register)
router.route('/login').post(validate(loginShema), authcontollers.login)
router.route('/user').get(authMiddleware , authcontollers.userdata)


module.exports = router;