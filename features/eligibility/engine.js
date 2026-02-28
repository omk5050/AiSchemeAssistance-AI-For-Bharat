function evaluateSingleScheme(user, scheme) {
    const reasons = [];
    const matchedRules = [];

    // 1. State
    if (user.state === scheme.state) {
        matchedRules.push("State matches");
    } else {
        reasons.push("State does not match scheme requirement");
    }

    // 2. Min Age
    if (user.age >= scheme.min_age) {
        matchedRules.push(`Age is >= ${scheme.min_age}`);
    } else {
        reasons.push(`Age must be at least ${scheme.min_age}`);
    }

    // 3. Max Age
    if (user.age <= scheme.max_age) {
        matchedRules.push(`Age is <= ${scheme.max_age}`);
    } else {
        reasons.push(`Age must be at most ${scheme.max_age}`);
    }

    // 4. Income
    if (user.income <= scheme.max_income) {
        matchedRules.push(`Income is <= ${scheme.max_income}`);
    } else {
        reasons.push(`Income exceeds maximum limit of ${scheme.max_income}`);
    }

    // 5. Occupation
    if (scheme.allowed_occupations.includes(user.occupation)) {
        matchedRules.push("occupation_match");
    } else {
        reasons.push("occupation_mismatch");
    }

    // 6. Category (if applicable)
    if (scheme.allowed_categories) {
        if (!user.category) {
            reasons.push("Category is required for this scheme");
        } else if (!scheme.allowed_categories.includes(user.category)) {
            reasons.push("Category not eligible for this scheme");
        } else {
            matchedRules.push("Category allowed");
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