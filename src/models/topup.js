const db = require("../config/mysql");
const services = require("../services");

module.exports = {
  getAllTopUp: function () {
    return new Promise((resolve, reject) => {
      db.query("SELECT * FROM topup ORDER BY sequence ASC", (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  getTopUpByOrder: function (order) {
    return new Promise((resolve, reject) => {
      db.query(`SELECT * FROM topup WHERE sequence=${order}`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  postTopUp: function (setData) {
    return new Promise((resolve, reject) => {
      db.query(`INSERT INTO topup SET ?`, setData, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  addTransactionsData: function (data) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO transaction SET ?", data, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  charge: function (amount, data) {
    const { id } = req.token;
    return new Promise((resolve, reject) => {
      services
        .postCharge(amount, data)
        .then((results) => {
          resolve(results);
        })
        .catch((err) => {
          reject(new Error(err));
        });
    });
  },
  ediTopUp: function (order, setData) {
    return new Promise((resolve, reject) => {
      db.query(
        "UPDATE topup SET ? WHERE sequence=?",
        [setData, order],
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            reject(new Error(err));
          }
        }
      );
    });
  },
  deleteTopUp: function (order) {
    return new Promise((resolve, reject) => {
      db.query(`DELETE FROM topup WHERE sequence=${order}`, (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
};
