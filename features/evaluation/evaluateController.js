const { validateUserInput } = require("../eligibility/validator");
const { loadAllSchemes } = require("../eligibility/rulesLoader");
const { evaluateAllSchemes } = require("../eligibility/engine");

function evaluateUserEligibility(payload) {
    // 1. Validate user input
    const validatedUser = validateUserInput(payload);

    // 2. Load all scheme rules
    const schemes = loadAllSchemes();
    function evaluateUserEligibility(payload) {
        const validatedUser = validateUserInput(payload);
        return evaluateAllSchemes(validatedUser, schemes);
    }

    // 3. Evaluate eligibility across all schemes
    const results = evaluateAllSchemes(validatedUser, schemes);

    return results;
}

module.exports = {
    evaluateUserEligibility,
};