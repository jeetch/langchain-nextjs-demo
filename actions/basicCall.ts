"use client"
import { OpenAI } from "langchain/llms/openai";


export async function basicCall(question: string, openaikey: string){
  const model = new OpenAI({openAIApiKey: openaikey, temperature: 0.1 });

  const res = await model.call(question);
  console.log({ res });

  return res;
};