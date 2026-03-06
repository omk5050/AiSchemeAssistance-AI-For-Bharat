const { validateUserInput } = require("../eligibility/validator");
const { loadAllSchemes } = require("../eligibility/rulesLoader");
const { evaluateAllSchemes } = require("../eligibility/engine");

const { generateExplanation } = require("../explanation/aiService"); // Gemini
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

  // ---- PRIMARY AI (Gemini) ----
  try {
    explanation = await generateExplanation(validatedUser, results);
  } catch (err) {
    console.error("Gemini error:", err);
  }

  // ---- FALLBACK AI (Bedrock) ----
  if (!explanation) {
    try {
      explanation = await generateBedrockExplanation(validatedUser, results);
    } catch (err) {
      console.error("Bedrock fallback error:", err);
    }
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