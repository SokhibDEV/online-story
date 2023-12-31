const Router = require('express')
const router = new Router();
const userController = require('../controllers/userController')
const authMiddlewere = require('../middleware/AuthMiddleware')



router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddlewere, userController.check)


module.exports = router