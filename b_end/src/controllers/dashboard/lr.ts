import { Request, Response } from "express";

export const LRClassification = async (req: Request, res: Response) => {
  const { data } = req.body;
  const prompt = `<bos><start_of_turn>user\nAnalyze the content of the law case enclosed in square brackets, determine if it is offence_affecting_public_safety murder criminal_trespass hurt unlawful_assembly marriage_offence criminal_conspiracy forgery cheating sexual_offence and return the answer as the corresponding law label 'offence_affecting_public_safety' or 'murder' or 'criminal_trespass' or 'hurt' or 'unlawful_assembly' or 'marriage_offence' or 'criminal_conspiracy' or 'forgery' or 'cheating' or 'sexual_offence' [${data}] <end_of_turn>\n`;
  const body = {
    "inputs": prompt,
    "parameters": {
      "return_full_text": false,
      "max_new_tokens": 250,
    },
  };
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Mohit-3430/Ai-PL_Gemma_Legal-Areas",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  const result = await response.json();
  console.log(result);

  res.status(200).json({
    success: true,
    msg: "Hello!",
    result: result,
  });
};

export const Summarization = async (req: Request, res: Response) => {
  const { data } = req.body;
  let prompt = `<bos><start_of_turn>user\nGiven the following article, write a short summary of the article in 500 words:\n\nArticle:\n\n{${data}}<end_of_turn>\n`;
  const body = {
    "inputs": prompt,
    "parameters": {
      "return_full_text": false,
      "max_new_tokens": 250,
    },
  };
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Mohit-3430/Ai-PL_Gemma_Sum",
    {
      headers: {
        Authorization: `Bearer ${process.env.HF_TOKEN}`,
      },
      method: "POST",
      body: JSON.stringify(body),
    }
  );
  const result = await response.json();
  // console.log(result);

  res.status(200).json({
    success: true,
    msg: "Hello!",
    result: result,
  });
};

// async function query(data) {
// 	const response = await fetch(
// 		"https://api-inference.huggingface.co/models/Mohit-3430/Ai-PL_Gemma_Legal-Areas",
// 		{
// 			headers: { Authorization: "Bearer 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" },
// 			method: "POST",
// 			body: JSON.stringify(data),
// 		}
// 	);
// 	const result = await response.json();
// 	return result;
// }

// query({"inputs": "Can you please let us know more details about your "}).then((response) => {
// 	console.log(JSON.stringify(response));
// });
