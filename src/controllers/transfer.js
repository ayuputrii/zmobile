const { response } = require('../helpers')
const transferModel = require('../models/transfer')

module.exports = {
    getTransfer: async function(req, res) {
        try {
            const result = await transferModel.getTransfer()
            res.status(200).send({
                data: result
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getHistoryUser: async function(req, res) {
        try {
            const { id } = req.token
            let { order, page } = req.query
            if(!page) {
                page = 1
            } else {
                parseInt(page)
            }
            const offset = (2 * page) - 2
            const result = await transferModel.getHistoryUser(id, order, offset)
            response(res, 200, result)
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    getAllHistoryUser: async function(req, res) {
        try {
            const { id } = req.token
            const result = await transferModel.getAllHistoryUser(id)
            response(res, 200, result)       
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    postTransfer: async function(req, res) {
        try {
            const pinBody = req.body.pin
            const { id, pin, phone, balance } = req.token
            if(pinBody == pin) {
                const { phone_receiver } = req.body
                const { balance_receiver } = req.query
                const setData = req.body
                delete setData.pin
                delete setData.phone_receiver
                setData.id_sender = id
                const result = await transferModel.postTransfer(phone_receiver, setData)
                res.status(201).send({
                    message: 'Success created a transfer',
                    data: result
                })
            } else {
                res.status(403).send({
                    message: 'Invalid PIN'
                })
            }
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    },
    deleteTransfer: async function(req, res) {
        try {
            const { id, id_transfer } = req.params
            await transferModel.deleteTransfer(id, id_transfer)
            res.status(200).send({
                message: 'Success delete a log transfer'
            })
        } catch (error) {
            res.status(500).send({
                message: error.message
            })
        }
    }
}