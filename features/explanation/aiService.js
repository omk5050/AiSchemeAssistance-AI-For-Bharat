const { buildExplanationPrompt } = require("./promptTemplate");

async function generateExplanation(userProfile, eligibilityResults) {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    return null;
  }

  const prompt = buildExplanationPrompt(userProfile, eligibilityResults);

  const controller = new AbortController();
  const timeout = setTimeout(() => {
    controller.abort();
  }, 8000);

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        temperature: 0.2,
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
      }),
      signal: controller.signal,
    });

    if (!response.ok) {
      return null;
    }

    const data = await response.json();
    const text = data?.choices?.[0]?.message?.content;

    if (typeof text !== "string") {
      return null;
    }

    const trimmed = text.trim();

    // Safety cap (prevents runaway or malformed output)
    if (trimmed.length > 3000) {
      return null;
    }

    return trimmed;
  } catch (error) {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = {
  generateExplanation,
};