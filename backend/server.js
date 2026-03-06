require("dotenv").config();

const express = require("express");
const serverless = require("serverless-http");

const { evaluateUserEligibility } = require("./features/evaluation/evaluateController");

const app = express();

app.use(express.json());

app.post("/evaluate", async (req, res) => {
  try {
    const response = await evaluateUserEligibility(req.body);
    return res.json(response);
  } catch (error) {
    if (error && error.type) {
      return res.status(400).json({
        type: error.type,
        message: error.message,
      });
    }

    return res.status(500).json({
      type: "INTERNAL_SERVER_ERROR",
      message: "Unexpected server error",
    });
  }
});

module.exports.handler = serverless(app);