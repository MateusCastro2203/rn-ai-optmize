import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

export async function askAI(
  prompt: string,
  model: string,
  apiKey: string
): Promise<string> {
  try {
    const openai = new OpenAI({
      apiKey: apiKey || process.env.OPENAI_API_KEY,
    });

    const completion = await openai.chat.completions.create({
      model: model,
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    return completion.choices[0].message.content || "No response from AI.";
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`OpenAI API Error: ${error.message}`);
    }
    throw new Error("Unknown error occurred");
  }
}
