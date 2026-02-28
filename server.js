const express = require("express");
const { evaluateUserEligibility } = require("./features/evaluation/evaluateController");

const app = express();
const PORT = 3000;

app.use(express.json());

app.post("/evaluate", (req, res) => {
    console.log("REQUEST RECEIVED");
    try {
        const results = evaluateUserEligibility(req.body);
        res.json(results);
    } catch (error) {
        console.error("ERROR OCCURRED:");
        console.error(error);
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