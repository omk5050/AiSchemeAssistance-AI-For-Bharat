const { buildExplanationPrompt } = require("./promptTemplate");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function generateExplanation(userProfile, eligibilityResults) {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return null;

  const prompt = buildExplanationPrompt(userProfile, eligibilityResults);

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 8000);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
        signal: controller.signal,
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API error:", response.status, errorText);
      return null;
    }

    const data = await response.json();

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (typeof text !== "string") return null;

    const trimmed = text.trim();
    if (trimmed.length > 3000) return null;

    return trimmed;
  } catch (error) {
    console.error("Gemini request failed:", error.message);
    return null;
  } finally {
    clearTimeout(timeout);
  }
}

module.exports = {
  generateExplanation,
};