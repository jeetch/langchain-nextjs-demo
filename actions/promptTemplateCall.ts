"use client"
import { OpenAI } from "langchain/llms/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import { LLMChain } from "langchain/chains";
import { ChatOpenAI } from "langchain/chat_models/openai";


export async function promptTemplateCall(product: string, openaikey: string){


    try{

  const model = new OpenAI({openAIApiKey: openaikey, temperature: 0.1 });

  const template = "What is a good name and tagline for a company that makes {product}? give me the output as [inset name here]: [insert tagline here]";
  const prompt = new PromptTemplate({ template, inputVariables: ["product"] });
  const chainA = new LLMChain({ llm: model, prompt });
  const res = await chainA.call({ product: product });


  // The result is an object with a `text` property.
  // { resA: { text: '\n\nSocktastic!' } }


  // Since the LLMChain is a single-input, single-output chain, we can also call it with `run`.
  // This takes in a string and returns the `text` property.
//   const resA2 = await chainA.run("colorful socks");
//   console.log({ resA2 });
  // { resA2: '\n\nSocktastic!' }

  return res.text;

    }


  catch (error: any){
    return "Error: " + error.message
  }
};