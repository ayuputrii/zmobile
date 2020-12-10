const authModels = require("../models/auth");
const { getHistoryUser } = require("../models/transfer");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const { response } = require("../helpers/");
const formResponse = require("../helpers/Response");

module.exports = {
  postLogin: async function (req, res) {
    try {
      const setData = req.body;
      const result = await authModels.checkUser(setData);
      if (!result[0]) {
        res.status(401).send({
          message: "Email Not Found",
        });
      }
      const check = bcrypt.compareSync(setData.password, result[0].password);
      if (check) {
        let firstName;
        let lastName;
        if (result[0].name.split(" ").length > 1) {
          const separateName = result[0].name.split(" ");
          const [first, ...last] = separateName;
          firstName = first;
          lastName = last.join(" ");
        } else {
          firstName = result[0].name;
          lastName = " ";
        }

        const {
          id,
          email,
          name,
          balance,
          photo,
          phone,
          verified,
          role,
          pin,
        } = result[0];
        const token = jwt.sign(
          {
            id,
            name,
            firstName,
            lastName,
            email,
            balance,
            photo,
            phone,
            verified,
            role,
            pin,
          },
          process.env.SECRET_KEY
        );
        response(res, 200, {
          message: "Auth Success",
          token,
        });
      } else {
        res.status(401).send({
          message: "Invalid Password",
        });
      }
    } catch (error) {
      response(res, 500, { message: error.message });
    }
  },
  postRegister: async function (req, res) {
    try {
      const errors = validationResult(req).array();
      if (!errors.length) {
        const setData = req.body;
        const checkUser = await authModels.checkUser(setData);
        if (checkUser[0]) {
          return response(res, 403, { message: "Email already exist" });
        }
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);
        const newData = {
          ...setData,
          password: hash,
        };
        const result = await authModels.postRegister(newData);
        response(res, 200, { data: result, message: "Register Success" });
      } else {
        response(res, 403, { message: errors });
      }
    } catch (error) {
      response(res, 500, { message: "Register Failed" });
    }
  },
  createPin: (req, res) => {
    const { pin, email } = req.body;
    if (pin.length == 6) {
      if (email) {
        authModels
          .createPin(pin, email)
          .then((data) => formResponse(data, res, 200, "Create Pin Succes"))
          .catch(() => formResponse([], res, 404, "Create Pin Failed"));
      } else {
        formResponse([], res, 404, "data not found");
      }
    } else {
      formResponse([], res, 406, "pin must be 6 character");
    }
  },
  resetPassword: (req, res) => {
    const { password, email } = req.body;
    if (password.length >= 6) {
      console.log(password.length >= 6);
      if (email) {
        authModels
          .resetPassword(password, email)
          .then((data) => formResponse(data, res, 200, "Reset Successfuly"))
          .catch(() => formResponse([], res, 404, "Reset Failed"));
      } else {
        formResponse([], res, 404, "Data not found");
      }
    } else {
      formResponse([], res, 406, "Password must be more than 6 character");
    }
  },
};
