const db = require('../config/mysql')

module.exports = {
    getTransfer: function() {
        return new Promise((resolve, reject) => {
            db.query('SELECT * FROM transfer', (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getHistoryUser: function(id, order, offset) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT amount, receiver, photo, sender, photo_sender FROM transfer WHERE id_sender=${id} OR id_receiver=${id} ORDER BY ${order}(date) DESC LIMIT 2 OFFSET ${offset}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    getAllHistoryUser: function(id) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT amount, receiver, photo, sender, photo_sender FROM transfer WHERE id_sender=${id} OR id_receiver=${id}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    },
    postTransfer: function(phone, setData) {
        return new Promise((resolve, reject) => {
            db.query(`SELECT id AS id_receiver, name AS receiver, photo FROM users WHERE phone=${phone}`, (err, result) => {
                if(!err) {
                    console.log(setData)
                    const newData = {
                        ...setData,
                        ...result[0]
                    }
                    console.log(newData)
                    db.query(`INSERT INTO transfer SET ?`, newData, (err, result) => {
                        if(!err) {
                           resolve(result)
                        } else {
                            reject(new Error(err))
                        }
                    })
                }
            })
        })
    },
    deleteTransfer: function(id, id_transfer) {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM transfer WHERE id_sender=${id} OR id_receiver=${id} AND id=${id_transfer}`, (err, result) => {
                if(!err) {
                    resolve(result)
                } else {
                    reject(new Error(err))
                }
            })
        })
    }
}