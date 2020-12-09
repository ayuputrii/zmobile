const router = require('express').Router()
const transferController = require('../controllers/transfer')
const { authentication, authorization } = require('../middlewares/auth')

router
    .get('/', authentication, authorization, transferController.getTransfer)
    .get('/history/all', authentication, transferController.getAllHistoryUser)
    .get('/history', authentication, transferController.getHistoryUser)
    .post('/', authentication, transferController.postTransfer)
    .delete('/:id/:id_transfer', authentication, transferController.deleteTransfer)

module.exports = router