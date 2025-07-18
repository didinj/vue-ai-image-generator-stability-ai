import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/generate', async (req, res) => {
  const { prompt } = req.body;

  const response = await fetch('https://api.stability.ai/v1/generation/stable-diffusion-v1-5/text-to-image', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.STABILITY_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      text_prompts: [{ text: prompt }],
      cfg_scale: 7,
      height: 512,
      width: 512,
      steps: 30,
      samples: 1,
    }),
  });

  const result = await response.json();
  const imageBase64 = result.artifacts?.[0]?.base64;

  res.json({ imageUrl: `data:image/png;base64,${imageBase64}` });
});

app.listen(3001, () => console.log('API running on http://localhost:3001'));
