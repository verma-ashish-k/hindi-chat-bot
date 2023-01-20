const OpenAI = require('openai');
const { OpenAIApi, Configuration } = OpenAI;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3001;

const configuration = new Configuration({
  organization: 'org-KT9yhlrmpS5UUd66y8JBKRBc',
  apiKey: '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',
});

const openai = new OpenAIApi(configuration);

app.use(bodyParser.json());
app.use(cors());

app.post('/', async (req, res) => {
  const { message } = req.body;
  const response = await openai.createCompletion({
    model: 'text-davinci-003',
    prompt: `Pretend you are the Samay from Mahabharata. Answer with firm, to the point and in line with hindu culture,
    hindu values, hindu litrature. If the user asks in Hindi then reply in Hindi. If the user asks in English then reply in English. Keep your answers short and to the point. below 100 tokens.
    End every response with vats.
    Samay: Bolo Vats, kya jaana chahte ho ?
    User: Samay kaha khatam hota hai aur kaha shuru hota hai ?
    Samay: Samay ka na ant hai na koi shuruaat, samay anant hai vats.
    User: What is the meaning of life ?
    Samay: Life is a journey, not a destination, vats.
    User:${message}?
    Samay:`,
    max_tokens: 100,
    temperature: 0,
  });
  console.log(response.data);
  if (response.data) {
    if (response.data.choices) {
      res.json({ message: response.data.choices[0].text });
    }
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
