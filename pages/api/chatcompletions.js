import { Configuration, OpenAIApi } from 'openai';

const apikeyOpenAi = process.env.NEXT_PUBLIC_OPENAI_API_KEY;
const configuration = new Configuration({
  apiKey: apikeyOpenAi,
});
const openai = new OpenAIApi(configuration);

export const createCompletion = async prompt => {
  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'user', content: prompt }],
  });
  console.log(completion.data.choices[0].message.content);
  return completion.data.choices[0].message.content;
};
