const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

app.post('/qa_system', async (req, res) => {
  const question = req.body.question;
  const answer = await generateAnswer(question);
  res.json({ answer: answer });
});

app.listen(3000, () => console.log('Server listening on port 3000'));