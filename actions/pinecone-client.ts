import { PineconeClient } from "@pinecone-database/pinecone";

async function initPinecone() {
  const client = new PineconeClient();
  await client.init({
    apiKey: '12c5b4b6-857e-49af-ac65-4b06e0099ac5',
    environment: 'us-west1-gcp-free',
  });
  const pineconeIndex = client.Index('langchain-demo');

  return { client, pineconeIndex };
}

let pinecone;

async function getPinecone() {
  if (!pinecone) {
    pinecone = await initPinecone();
  }
  return pinecone;
}

export { getPinecone };
