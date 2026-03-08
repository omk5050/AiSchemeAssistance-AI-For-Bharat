const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const { buildExplanationPrompt } = require("./promptTemplate");

const client = new BedrockRuntimeClient({
  region: "us-east-1"
});

async function generateBedrockExplanation(userProfile, eligibilityResults) {

  const prompt = buildExplanationPrompt(userProfile, eligibilityResults);

  const body = JSON.stringify({
    inputText: prompt,
    textGenerationConfig: {
      maxTokenCount: 200,
      temperature: 0.2,
      topP: 0.9
    }
  });

  try {

    const command = new InvokeModelCommand({
      modelId: "amazon.titan-text-express-v1",
      body,
      contentType: "application/json",
      accept: "application/json"
    });

    const response = await client.send(command);

    const parsed = JSON.parse(Buffer.from(response.body).toString());

    const text = parsed?.results?.[0]?.outputText;

    return text || null;

  } catch (error) {

    console.error("Bedrock error:", error);

    return null;

  }
}

module.exports = {
  generateBedrockExplanation
};