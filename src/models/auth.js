const db = require("../config/mysql");
const bcrypt = require("bcrypt");

module.exports = {
  checkUser: function (setData) {
    return new Promise((resolve, reject) => {
      db.query(
        `SELECT * FROM users WHERE email='${setData.email}'`,
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
  postRegister: function (setData) {
    return new Promise((resolve, reject) => {
      db.query("INSERT INTO users SET ?", setData, (err, res) => {
        if (!err) {
          resolve(res);
        } else {
          reject(new Error(err));
        }
      });
    });
  },
  createPin: (pin, email) => {
    return new Promise((resolve, reject) => {
      db.query(
        `UPDATE users SET pin='${pin}' WHERE email=?`,
        email,
        (err, result) => {
          if (!err) {
            resolve(result);
          } else {
            return reject(err);
          }
        }
      );
    });
  },
  resetPassword: (password, email) => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          const errMessage = "Password Failed";
          return reject(errMessage);
        }
        db.query(
          `UPDATE users SET password='${hashedPassword}' WHERE email=?`,
          email,
          (err, result) => {
            if (!err) {
              resolve(result);
            } else {
              return reject(err);
            }
          }
        );
      });
    });
  },
};
