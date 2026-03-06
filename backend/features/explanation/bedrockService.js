const { BedrockRuntimeClient, InvokeModelCommand } = require("@aws-sdk/client-bedrock-runtime");
const { buildExplanationPrompt } = require("./promptTemplate");

const client = new BedrockRuntimeClient({
  region: "ap-south-1"
});

async function generateBedrockExplanation(userProfile, eligibilityResults) {

  const prompt = buildExplanationPrompt(userProfile, eligibilityResults);

  const body = JSON.stringify({
    anthropic_version: "bedrock-2023-05-31",
    max_tokens: 500,
    temperature: 0.2,
    messages: [
      {
        role: "user",
        content: prompt
      }
    ]
  });

  const command = new InvokeModelCommand({
    modelId: "anthropic.claude-3-haiku-20240307-v1:0",
    body,
    contentType: "application/json",
    accept: "application/json"
  });

  const response = await client.send(command);

  const parsed = JSON.parse(Buffer.from(response.body).toString());

  return parsed?.content?.[0]?.text || null;
}

module.exports = {
  generateBedrockExplanation
};