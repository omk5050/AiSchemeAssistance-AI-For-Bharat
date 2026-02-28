function validateUserInput(payload) {
  if (!payload || typeof payload !== "object") {
    throw {
      type: "VALIDATION_ERROR",
      message: "Invalid request payload",
      status: 400,
    };
  }

  let { age, income, occupation, category, state } = payload;

  // Required fields
  if (age === undefined || income === undefined || occupation === undefined || state === undefined) {
    throw {
      type: "VALIDATION_ERROR",
      message: "Missing required fields: age, income, occupation, state",
      status: 400,
    };
  }

  // Convert numeric inputs safely
  age = Number(age);
  income = Number(income);

  if (!Number.isFinite(age) || age < 0 || age > 120) {
    throw {
      type: "VALIDATION_ERROR",
      message: "Invalid age value",
      status: 400,
    };
  }

  if (!Number.isFinite(income) || income < 0) {
    throw {
      type: "VALIDATION_ERROR",
      message: "Invalid income value",
      status: 400,
    };
  }

  if (typeof occupation !== "string" || occupation.trim() === "") {
    throw {
      type: "VALIDATION_ERROR",
      message: "Invalid occupation value",
      status: 400,
    };
  }

  if (typeof state !== "string" || state.toLowerCase() !== "maharashtra") {
    throw {
      type: "VALIDATION_ERROR",
      message: 'State must be "maharashtra"',
      status: 400,
    };
  }

  if (category !== undefined && typeof category !== "string") {
    throw {
      type: "VALIDATION_ERROR",
      message: "Invalid category value",
      status: 400,
    };
  }

  const cleaned = {
    age,
    income,
    occupation: occupation.trim().toLowerCase(),
    state: "maharashtra",
  };

  if (category !== undefined) {
    cleaned.category = category.trim().toLowerCase();
  }

  return cleaned;
}

module.exports = {
  validateUserInput,
};