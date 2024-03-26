import key from "../key.js";
import OpenAI from "openai";

// Function for querying Chat GPT. Suprisingly I found gpt-3.5-turbo to
// be significantly faster than gpt-4-turbo.
const jsonGPT = async (prompt) => {
  const openai = new OpenAI({ apiKey: key });
  let completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant designed to output JSON.",
      },
      { role: "user", content: prompt },
    ],
    model: "gpt-3.5-turbo-0125",
    response_format: { type: "json_object" },
  });
  const result = JSON.parse(completion.choices[0].message.content);
  return result;
};

export default jsonGPT;
