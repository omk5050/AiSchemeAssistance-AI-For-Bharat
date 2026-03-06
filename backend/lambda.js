const serverless = require("serverless-http");
const express = require("express");
const { evaluateUserEligibility } = require("./features/evaluation/evaluateController");

const app = express();
app.use(express.json());

app.post("/evaluate", async (req, res) => {
  try {

    // Log incoming request
    console.log("Incoming request body:", JSON.stringify(req.body));

    const response = await evaluateUserEligibility(req.body);

    // Log evaluation result
    console.log("Evaluation response:", JSON.stringify(response));

    res.json(response);

  } catch (error) {

    // Log full error
    console.error("ERROR during evaluation:");
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
      debug: error.message || error
    });
  }
});

module.exports.handler = serverless(app);