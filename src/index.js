const router = require('express').Router()
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const transferRoutes = require('./routes/transfer')
const topupRoutes = require('./routes/topup')

router
    .use('/auth', authRoutes)
    .use('/users', userRoutes)
    .use('/transfer', transferRoutes)
    .use('/topup', topupRoutes)

module.exports = router

/* 

PORT=8000
DB_HOST=us-cdbr-east-02.cleardb.com
DB_USER=beafa6c6f1a04e
DB_PASSWORD=e4db0b54
DB_NAME=heroku_edf15b710a7f7a7
*/