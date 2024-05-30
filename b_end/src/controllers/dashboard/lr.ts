import { Request, Response } from "express";

export const LRClassification = async (req: Request, res: Response) => {
  try {
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
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      throw new Error("Failed to parse JSON response");
    }

    res.status(200).json({ success: true, msg: "Hello!", result: result });
  } catch (error) {
    res.status(500).json({ success: false, msg: "An error occurred" });
  }
};

export const Summarization = async (req: Request, res: Response) => {
  try {
    const { data } = req.body;
    let prompt = `<bos><start_of_turn>user\nGiven the Article, write a summary of the article 1000 words\n\nArticle:\n\n{${data}}<end_of_turn>\n`;
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
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(body),
      }
    );

    const text = await response.text();
    let result;
    try {
      result = JSON.parse(text);
    } catch (e) {
      console.error("Failed to parse JSON:", e);
      throw new Error("Failed to parse JSON response");
    }

    res.status(200).json({ success: true, msg: "Hello!", result: result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ success: false, msg: "An error occurred" });
  }
};
