const { validateUserInput } = require("../eligibility/validator");
const { loadAllSchemes } = require("../eligibility/rulesLoader");
const { evaluateAllSchemes } = require("../eligibility/engine");
const { generateExplanation } = require("../explanation/aiService");

let cachedSchemes = null;

async function getSchemes() {
  if (cachedSchemes) {
    return cachedSchemes;
  }

  console.log("Loading schemes from S3 (cold start)");

  cachedSchemes = await loadAllSchemes();

  return cachedSchemes;
}

async function evaluateUserEligibility(payload) {

  const validatedUser = validateUserInput(payload);

  const schemes = await getSchemes();

  const results = evaluateAllSchemes(validatedUser, schemes);

  let explanation = null;

  try {
    explanation = await generateExplanation(validatedUser, results);
  } catch (err) {
    console.error("AI explanation error:", err);
  }

  if (explanation) {
    return {
      results,
      explanation
    };
  }

  return {
    results
  };
}

module.exports = {
  evaluateUserEligibility
};