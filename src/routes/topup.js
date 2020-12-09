const topupController = require('../controllers/topup')
const router = require('express').Router()
const { authentication , authorization } = require('../middlewares/auth')

router
    .get('/', authentication, topupController.getAllTopUp)
    .get('/:order', authentication, authorization, topupController.getTopUpByOrder)
    .post('/', authentication, authorization, topupController.postTopUp)
    .patch('/:order', authentication, authorization, topupController.editTopUp)
    .delete('/:order', authentication, authorization, topupController.deleteTopUp)

module.exports = router