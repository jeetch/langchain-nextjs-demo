import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { TextLoader } from 'langchain/document_loaders/fs/text';
import * as dotenv from "dotenv";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { PineconeStore } from "langchain/vectorstores/pinecone";
import { getPinecone } from './pinecone-client';


dotenv.config();

async function main() {
  try {
    /*load raw docs from the markdown files in the directory */
    const loader = new TextLoader("document/socialnetwork.txt");
    const rawDocs = await loader.load();

    /* Split text into chunks */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const docs = await textSplitter.splitDocuments(rawDocs);
    console.log('split docs', docs);

    console.log('creating vector store...');

    /*create and store the embeddings in the vectorStore*/
    
    const pineconeInstance = await getPinecone();
    const pineconeIndex = pineconeInstance.pineconeIndex;

    await PineconeStore.fromDocuments(docs, new OpenAIEmbeddings(), {
      pineconeIndex,
    });

    console.log('Document Loaded!');

  } catch (error) {
    console.log('error', error);
    throw new Error('Failed to ingest your data');
  }
};

main().catch((error) => {
  console.error("An error occurred:", error);
  process.exit(1);
});