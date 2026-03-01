const { validateUserInput } = require("../eligibility/validator");
const { loadAllSchemes } = require("../eligibility/rulesLoader");
const { evaluateAllSchemes } = require("../eligibility/engine");
const { generateExplanation } = require("../explanation/aiService");

async function evaluateUserEligibility(payload) {
  // 1. Validate input
  const validatedUser = validateUserInput(payload);

  // 2. Load scheme rules
  const schemes = loadAllSchemes();

  // 3. Evaluate eligibility (deterministic and final)
  const results = evaluateAllSchemes(validatedUser, schemes);

  // 4. Attempt explanation (non-blocking safety)
  let explanation = null;

  try {
    explanation = await generateExplanation(validatedUser, results);
  } catch {
    explanation = null;
  }

  // 5. Return response safely
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