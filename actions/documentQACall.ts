import { OpenAI } from "langchain/llms/openai";
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio";
import { loadQAMapReduceChain } from "langchain/chains";
import { HNSWLib } from "langchain/vectorstores/hnswlib";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { createClient } from "@supabase/supabase-js";
import { SupabaseVectorStore } from "langchain/vectorstores/supabase";
import { RetrievalQAChain, loadQARefineChain } from "langchain/chains";
import { IMSDBLoader } from "langchain/document_loaders/web/imsdb";
import { TextLoader } from "langchain/document_loaders/fs/text";


const privateKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5na21jY2V2Z3BsbWprb2docHdwIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTY4Mjk2NTY1MywiZXhwIjoxOTk4NTQxNjUzfQ.ZTkfm14In9_-3BvoFOCnPOK4c8MFdeJ4tVyo888Ylp0" || "";
if (!privateKey) throw new Error(`Expected env var SUPABASE_PRIVATE_KEY`);

const url = "https://ngkmccevgplmjkoghpwp.supabase.co" || ""; 
if (!url) throw new Error(`Expected env var SUPABASE_URL`);


export async function documentQACall(question: string, openaikey: string){

  try{



    const client = createClient(url, privateKey);
    const model = new OpenAI({openAIApiKey: openaikey, temperature: 0.1, maxConcurrency: 10  });


/*
    The main difference between StuffDocumentsChain and MapReduceDocumentsChain 
  is that StuffDocumentsChain simply injects all documents passed in into the prompt and uses all documents 
  as context to answer the question, while MapReduceDocumentsChain adds a preprocessing step to select relevant 
  portions of each document until the total number of tokens is less than the maximum number of tokens allowed by the model. 
  It then uses the transformed docs as context to answer the question. MapReduceDocumentsChain is suitable for QA tasks over 
  larger documents, and it runs the preprocessing step in parallel, which can reduce the running time.

  QAmapreducechain is a MapReduceDocumentsChain, which adds a preprocessing step to select relevant portions of each 
document until the total number of tokens is less than the maximum number of tokens allowed by the model. It then uses the 
transformed docs as context to answer the question. It is suitable for QA tasks over larger documents, and it runs the preprocessing
 step in parallel, which can reduce the running time.

  loadQArefinechain is a RefineDocumentsChain, which iterates over the documents one by one to update a running 
  answer, at each turn using the previous version of the answer and the next doc as context. It is suitable for QA tasks 
  over a large number of documents.

*/

// Load the documents and create the vector store

    /**
 * Loader uses `page.evaluate(() => document.body.innerHTML)`
 * as default evaluate function
 **/

const loader = new TextLoader("../document/socialnetwork.txt");
const docs = await loader.loadAndSplit();

 // Create a vector store from the documents.
const vectorStore = await HNSWLib.fromDocuments(docs, new OpenAIEmbeddings());
// {
//   client,
//   tableName: "documents",
//   queryName: "match_documents",
// }

  // Save the vector store to a directory
  const directory = "../vectorstore";
  await vectorStore.save(directory);

  // // Load the vector store from the same directory
  // const loadedVectorStore = await HNSWLib.load(
  //   directory,
  //   new OpenAIEmbeddings()
  // );

// Create a chain that uses a Refine chain and HNSWLib vector store.
const chain = RetrievalQAChain.fromLLM(model, vectorStore.asRetriever());


  const res = await chain.call({
    input_documents: docs,
    query: question,
  });



  return res.text;
  }
  catch (error: any){
    return "Error: " + error.message
  }
};












