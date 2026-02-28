const validatorModule = require("../eligibility/validator");
console.log("Validator module loaded:", validatorModule);

const validateUserInput = validatorModule.validateUserInput || validatorModule;

const { loadAllSchemes } = require("../eligibility/rulesLoader");
const { evaluateAllSchemes } = require("../eligibility/engine");

function evaluateUserEligibility(payload) {
  // 1. Validate input
  const validatedUser = validateUserInput(payload);

  // 2. Load scheme rules
  const schemes = loadAllSchemes();

  // 3. Evaluate all schemes    
  return evaluateAllSchemes(validatedUser, schemes);
}

module.exports = {
  evaluateUserEligibility,
};