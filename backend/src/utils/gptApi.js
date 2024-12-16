const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

async function callGptApi(prompt) {
  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo", 
    messages: [
      { role: "system", content: "Tu es un assistant qui répond en français." },
      { role: "user", content: prompt }
    ],
    temperature: 0.7
  });

  // On considère que la réponse de l'IA est un texte JSON
  const gptReply = response.data.choices[0].message.content.trim();
  return gptReply;
}

module.exports = { callGptApi };
