const express = require("express");
const { evaluateUserEligibility } = require("./features/evaluation/evaluateController");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/evaluate", async (req, res) => {
  try {
    const response = await evaluateUserEligibility(req.body);
    return res.json(response);
  } catch (error) {
    // Development-safe logging
    if (process.env.NODE_ENV !== "production") {
      console.error("ERROR OCCURRED:");
      console.error(error);
    }

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});