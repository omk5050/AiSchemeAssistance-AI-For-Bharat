require("dotenv").config();
const { generateExplanation } = require("./features/explanation/aiService");

async function testGemini() {
  const profile = { age: 25, income: 50000, occupation: "farmer", category: "general" };
  const results = [{ scheme: "PM-KISAN", eligible: true, reasons: [] }];
  const question = "Am I eligible?";

  console.log("Testing with API Key:", process.env.GEMINI_API_KEY ? "EXISTS" : "MISSING");

  const response = await generateExplanation(profile, results, question);
  console.log("Response:", response);
}

testGemini();
