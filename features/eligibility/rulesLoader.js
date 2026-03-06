const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({ region: "ap-south-1" });

const BUCKET = "ai-scheme-rules-maharashtra-ai-for-bharat";

const schemeFiles = [
  "ebc_scholarship.json",
  "mjpjay.json",
  "pm_kisan.json",
  "shravan_bal.json",
  "yuva_prashikshan.json"
];

async function streamToString(stream) {
  return await new Promise((resolve, reject) => {
    const chunks = [];
    stream.on("data", chunk => chunks.push(chunk));
    stream.on("error", reject);
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")));
  });
}

async function loadScheme(file) {
  const command = new GetObjectCommand({
    Bucket: BUCKET,
    Key: file
  });

  const response = await s3.send(command);
  const body = await streamToString(response.Body);

  return JSON.parse(body);
}

async function loadAllSchemes() {
  const schemes = [];

  for (const file of schemeFiles) {
    try {
      const scheme = await loadScheme(file);
      schemes.push(scheme);
    } catch (err) {
      throw new Error(`Unable to load scheme from S3: ${file}`);
    }
  }

  return schemes;
}

module.exports = {
  loadAllSchemes
};