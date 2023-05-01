/* eslint-disable @typescript-eslint/no-inferrable-types */
import express, { Application, Request, Response } from "express";
import cors from "cors";
import { Configuration, OpenAIApi } from "openai";

const PORT: number = 8000;

const app: Application = express();
app.use(cors());
app.use(express.json());

const API_KEY: string = "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";

const configuration = new Configuration({
  apiKey: API_KEY,
});

const openai = new OpenAIApi(configuration);

app.post("/completions", async (req: Request, res: Response) => {
  // test
  console.log(req.body.message);
  try {
    const completion = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "user",
          content: "Create a SQL request to " + req.body.message,
        },
      ],
    });

    console.log(completion);

    res.send(completion.data.choices[0].message);
  } catch (error) {
    console.log(error);
    res.status(500).send(error);
  }
});

app.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
