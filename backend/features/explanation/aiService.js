const { buildExplanationPrompt } = require("./promptTemplate");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

async function generateExplanation(userProfile, eligibilityResults, question = "") {

  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    console.error("Missing GEMINI_API_KEY");
    return null;
  }

  const prompt =
    buildExplanationPrompt(userProfile, eligibilityResults) +
    `

User question:
${question}

Answer the user's question clearly using the eligibility results above.`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000);

  try {

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }]
            }
          ]
        }),
        signal: controller.signal
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Gemini API HTTP error:", response.status, errorText);
      return null;
    }

    const data = await response.json();

    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text || typeof text !== "string") return null;

    const cleaned = text
      .trim()
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    return cleaned.slice(0, 3000);

  } catch (error) {

    console.error("Gemini request failed:", error.message);
    return null;

  } finally {

    clearTimeout(timeout);

  }
}

module.exports = {
  generateExplanation
};