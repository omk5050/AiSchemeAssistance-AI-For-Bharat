function evaluateSingleScheme(user, scheme) {
    const reasons = [];
    const matchedRules = [];

    // 1. State
    if (user.state === scheme.state) {
        matchedRules.push("state_pass");
    } else {
        reasons.push("state_fail");
    }

    // 2. Min Age
    if (user.age >= scheme.min_age) {
        matchedRules.push("min_age_pass");
    } else {
        reasons.push("min_age_fail");
    }

    // 3. Max Age
    if (user.age <= scheme.max_age) {
        matchedRules.push("max_age_pass");
    } else {
        reasons.push("max_age_fail");
    }

    // 4. Income
    if (scheme.max_income !== undefined) {

        if (user.income <= scheme.max_income) {
            matchedRules.push("income_pass");
        }
        else {
            reasons.push("income_fail");
        }
    }

    // 5. Occupation
    if (scheme.allowed_occupations.includes(user.occupation)) {
        matchedRules.push("occupation_pass");
    } else {
        reasons.push("occupation_fail");
    }

    // 6. Category (if applicable)
    if (scheme.allowed_categories) {
        if (!user.category) {
            reasons.push("category_fail");
        } else if (!scheme.allowed_categories.includes(user.category)) {
            reasons.push("category_fail");
        } else {
            matchedRules.push("category_pass");
        }
    }

    return {
        scheme: scheme.scheme,
        eligible: reasons.length === 0,
        reasons,
        matchedRules,
    };
}

function evaluateAllSchemes(user, schemes) {
    if (!Array.isArray(schemes)) {
        throw {
            type: "ENGINE_ERROR",
            message: "Schemes must be an array",
        };
    }

    return schemes.map((scheme) =>
        evaluateSingleScheme(user, scheme)
    );
}

module.exports = {
    evaluateAllSchemes,
};