const { validateUserInput } = require("../eligibility/validator");
const { loadAllSchemes } = require("../eligibility/rulesLoader");
const { evaluateAllSchemes } = require("../eligibility/engine");
const { generateExplanation } = require("../explanation/aiService");

// Load schemes once at startup (fail-fast if malformed)
const schemes = loadAllSchemes();

async function evaluateUserEligibility(payload) {
  // 1. Validate input
  const validatedUser = validateUserInput(payload);

  // 2. Evaluate eligibility (deterministic and final)
  const results = evaluateAllSchemes(validatedUser, schemes);

  // 3. Attempt explanation (never blocks eligibility)
  let explanation = null;

  try {
    explanation = await generateExplanation(validatedUser, results);
  } catch {
    explanation = null;
  }

  if (explanation) {
    return {
      results,
      explanation,
    };
  }

  return {
    results,
  };
}

module.exports = {
  evaluateUserEligibility,
};