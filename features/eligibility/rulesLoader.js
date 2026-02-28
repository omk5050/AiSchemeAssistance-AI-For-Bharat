const fs = require("fs");
const path = require("path");

function validateNumberField(value, fieldName, schemeName) {
  if (typeof value !== "number" || Number.isNaN(value) || value < 0) {
    throw {
      type: "SCHEME_LOAD_ERROR",
      message: `Invalid ${fieldName} in scheme "${schemeName}"`,
    };
  }
}

function validateAndNormalizeScheme(scheme) {
  const requiredFields = [
    "scheme",
    "state",
    "min_age",
    "max_age",
    "max_income",
    "allowed_occupations",
  ];

  for (const field of requiredFields) {
    if (!(field in scheme)) {
      throw {
        type: "SCHEME_LOAD_ERROR",
        message: `Missing required field "${field}" in scheme JSON`,
      };
    }
  }

  if (typeof scheme.scheme !== "string" || scheme.scheme.trim() === "") {
    throw {
      type: "SCHEME_LOAD_ERROR",
      message: "Invalid scheme name",
    };
  }

  if (typeof scheme.state !== "string" || scheme.state.toLowerCase() !== "maharashtra") {
    throw {
      type: "SCHEME_LOAD_ERROR",
      message: `Invalid state in scheme "${scheme.scheme}"`,
    };
  }

  validateNumberField(scheme.min_age, "min_age", scheme.scheme);
  validateNumberField(scheme.max_age, "max_age", scheme.scheme);
  validateNumberField(scheme.max_income, "max_income", scheme.scheme);

  if (scheme.min_age > scheme.max_age) {
    throw {
      type: "SCHEME_LOAD_ERROR",
      message: `min_age cannot be greater than max_age in scheme "${scheme.scheme}"`,
    };
  }

  if (!Array.isArray(scheme.allowed_occupations)) {
    throw {
      type: "SCHEME_LOAD_ERROR",
      message: `allowed_occupations must be an array in scheme "${scheme.scheme}"`,
    };
  }

  scheme.allowed_occupations = scheme.allowed_occupations.map((occ) => {
    if (typeof occ !== "string" || occ.trim() === "") {
      throw {
        type: "SCHEME_LOAD_ERROR",
        message: `Invalid occupation value in scheme "${scheme.scheme}"`,
      };
    }
    return occ.trim().toLowerCase();
  });

  if (scheme.allowed_categories && scheme.allowed_categories.length === 0) {
    if (!Array.isArray(scheme.allowed_categories)) {
      throw {
        type: "SCHEME_LOAD_ERROR",
        message: `allowed_categories must be an array in scheme "${scheme.scheme}"`,
      };
    }

    scheme.allowed_categories = scheme.allowed_categories.map((cat) => {
      if (typeof cat !== "string" || cat.trim() === "") {
        throw {
          type: "SCHEME_LOAD_ERROR",
          message: `Invalid category value in scheme "${scheme.scheme}"`,
        };
      }
      return cat.trim().toLowerCase();
    });
  }

  return scheme;
}

function loadAllSchemes() {
  const schemesDir = path.join(__dirname, "..", "schemes");

  if (!fs.existsSync(schemesDir)) {
    throw {
      type: "SCHEME_LOAD_ERROR",
      message: "Schemes directory not found",
    };
  }

  const files = fs
    .readdirSync(schemesDir)
    .filter((file) => file.endsWith(".json"));

  if (files.length === 0) {
    throw {
      type: "SCHEME_LOAD_ERROR",
      message: "No scheme JSON files found",
    };
  }

  const schemes = [];
  const schemeNames = new Set();

  for (const file of files) {
    const filePath = path.join(schemesDir, file);

    let rawData;
    try {
      rawData = fs.readFileSync(filePath, "utf-8");
    } catch {
      throw {
        type: "SCHEME_LOAD_ERROR",
        message: `Unable to read file: ${file}`,
      };
    }

    let parsed;
    try {
      parsed = JSON.parse(rawData);
    } catch {
      throw {
        type: "SCHEME_LOAD_ERROR",
        message: `Invalid JSON format in file: ${file}`,
      };
    }

    const validated = validateAndNormalizeScheme(parsed);

    if (schemeNames.has(validated.scheme)) {
      throw {
        type: "SCHEME_LOAD_ERROR",
        message: `Duplicate scheme name detected: "${validated.scheme}"`,
      };
    }

    schemeNames.add(validated.scheme);
    schemes.push(validated);
  }

  return schemes;
}

module.exports = {
  loadAllSchemes,
};