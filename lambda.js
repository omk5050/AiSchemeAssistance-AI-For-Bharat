const serverless = require("serverless-http");
const express = require("express");
const { evaluateUserEligibility } = require("./features/evaluation/evaluateController");

const app = express();
app.use(express.json());

app.post("/evaluate", async (req, res) => {
  try {
    const response = await evaluateUserEligibility(req.body);
    res.json(response);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports.handler = serverless(app);