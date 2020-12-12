const topupModel = require("../models/topup");
const service = require("../services");

module.exports = {
  getAllTopUp: async function (req, res) {
    try {
      const result = await topupModel.getAllTopUp();
      res.status(200).send({
        message: "Success get all post",
        data: result,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  getTopUpByOrder: async function (req, res) {
    try {
      const { order } = req.params;
      const result = await topupModel.getTopUpByOrder(order);
      if (result.length == 0) {
        res.status(404).send({
          message: "Data Not Found",
        });
      } else {
        res.status(200).send({
          message: "Success get post",
          data: result,
        });
      }
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  postTopUp: async function (req, res) {
    try {
      const setData = req.body;
      const result = await topupModel.postTopUp(setData);
      res.status(201).send({
        message: "Success created a procedure",
        data: result.affectedRows,
      });
    } catch (err) {
      res.status(500).send({
        message: err.message,
      });
    }
  },
  chargeTopUp: async function (req, res) {
    try {
      const { amount } = req.body;
      const { id, email, balance } = req.token;
      const result = {
        id: id,
        email: email,
      };
      const token = await service.postCharge(amount, req.token);
      res.status(200).send({
        success: true,
        data: { ...result, token: token },
      });
    } catch (err) {
      res.status(500).send({
        success: false,
        message: err.message,
      });
    }
  },
  editTopUp: async function (req, res) {
    try {
      const { order } = req.params;
      const setData = req.body;
      const result = await topupModel.ediTopUp(order, setData);
      res.status(201).send({
        message: "Success edited a procedure",
        data: result.affectedRows,
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
  deleteTopUp: async function (req, res) {
    try {
      const { order } = req.params;
      await topupModel.deleteTopUp(order);
      res.status(200).send({
        message: "Success delete a procedure",
      });
    } catch (error) {
      res.status(500).send({
        message: error.message,
      });
    }
  },
};
