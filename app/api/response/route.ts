import { NextResponse } from "next/server";
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import { PineconeStore } from 'langchain/vectorstores/pinecone';
import * as dotenv from "dotenv";

import { getPinecone } from '@/actions/pinecone-client';
import { RetrievalQAChain } from 'langchain/chains';
import { OpenAI } from "langchain/llms/openai";

dotenv.config();

export async function POST(
  req: Request, 
) {
  const question  = req.body;

  console.log('question', question);

  try {
    const model = new OpenAI();

    const pineconeInstance = await getPinecone();
    const pineconeIndex = pineconeInstance.pineconeIndex;

    console.log(pineconeIndex)

    const vectorStore = await PineconeStore.fromExistingIndex(
      new OpenAIEmbeddings(),
      { pineconeIndex }
    );

    const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());
    const response = await chain.call({
      query: question,
    });
    console.log({ response });

    console.log('response', response);
    NextResponse.json(response);
  } catch (error: any) {
    console.log('error', error);
    NextResponse.error()
  }
}
