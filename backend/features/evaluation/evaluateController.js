const { validateUserInput } = require("../eligibility/validator");
const { loadAllSchemes } = require("../eligibility/rulesLoader");
const { evaluateAllSchemes } = require("../eligibility/engine");

const { generateExplanation } = require("../explanation/aiService"); // Gemini PRIMARY
const { generateBedrockExplanation } = require("../explanation/bedrockService"); // Bedrock fallback

let cachedSchemes = null;

async function getSchemes() {
  if (cachedSchemes) return cachedSchemes;

  cachedSchemes = await loadAllSchemes();
  return cachedSchemes;
}

async function evaluateUserEligibility(payload) {

  const validatedUser = validateUserInput(payload);
  const schemes = await getSchemes();
  const results = evaluateAllSchemes(validatedUser, schemes);

  let explanation = null;
  let model = null;

  // -------- GEMINI PRIMARY --------
  try {
    explanation = await generateExplanation(validatedUser, results, payload.question);

    if (explanation) {
      model = "Google Gemini";
    }

  } catch (err) {
    console.error("Gemini error:", err);
  }

  // -------- BEDROCK FALLBACK --------
  if (!explanation) {

    try {
      explanation = await generateBedrockExplanation(validatedUser, results, payload.question);

      if (explanation) {
        model = "AWS Bedrock";
      }

    } catch (err) {
      console.error("Bedrock error:", err);
    }

  }

  // -------- FINAL FALLBACK --------
  if (!explanation) {

    explanation = payload.question
      ? "I am currently experiencing high load or connection issues to my AI services. Please try again later. Alternatively, you can refer to the official scheme guidelines on their respective websites."
      : "Eligibility was evaluated using official deterministic scheme rules. Some schemes may not apply because age, income, occupation, or category requirements were not satisfied. AI summarization is currently unavailable.";

    model = "Rule Engine Fallback";

  }

  console.log("Explanation source:", model);

  return {
    results,
    explanation
  };
}

module.exports = {
  evaluateUserEligibility
};