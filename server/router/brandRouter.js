const Router = require('express')
const router = new Router();
const brandCantroller = require('../controllers/brandCantroller');
router.post('/', brandCantroller.create)
router.get('/', brandCantroller.getAll)
 

module.exports = router