import dotenv from "dotenv";
dotenv.config();
import { Configuration, OpenAIApi } from "openai";

const apiKey = process.env.OPEN_AI_KEY;
console.log(apiKey);
const org = process.env.ORG;
console.log(org);

const configuration = new Configuration({
  organization: process.env.ORG,
  apiKey: apiKey,
});
const openai = new OpenAIApi(configuration);

export const chatbotController = async (req, res) => {
  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "gpt-3.5-turbo",
      prompt: `${message}`,
      max_tokens: 100,
      temperature: 0.5,
    });
    res.json({ message: response.data.choices[0].text });
  } catch (error) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: "Something went wrong..." });
  }
};
