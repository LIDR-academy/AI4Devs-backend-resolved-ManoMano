import { Octokit } from "@octokit/core";
import express from "express";
import { Readable } from "node:stream";
import axios from "axios";
import dotenv from 'dotenv';

dotenv.config();

const app = express()

app.post("/", express.json(), async (req, res) => {
  // Notion: Extract and format the page content
  const response = await axios.get(`https://api.notion.com/v1/blocks/${process.env.NOTION_PAGE_ID}/children`, {
    headers: {
      'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
      'Notion-Version': '2022-06-28'
    }
  });

  const documentation = response.data.results.map(block => {
    if (block.type === 'paragraph' && block.paragraph.rich_text.length > 0) {
      return block.paragraph.rich_text.map(text => text.plain_text).join('');
    }
    return null;
  }).filter(text => text !== null);

  // Identify the user, using the GitHub API token provided in the request headers.
  const tokenForUser = req.get("X-GitHub-Token");
  const octokit = new Octokit({ auth: tokenForUser });
  const user = await octokit.request("GET /user");

  // Parse the request payload and log it.
  const payload = req.body;

  const systemInstructions = `As a documentation expert for ManoMano,
    your task is to provide the user with all the information related to their question.
    Your information source will be this documentation:
    ${documentation.join(" ")}
    ---
    Your response should:
    - Begin with the user's name: @${user.data.login ?? 'user'}
    - Provide all relevant information related to the user's question.
    - Offer the best programming tips and requirements based on the available documentation.
    - Strictly adhere to the documentation: ${documentation.join(" ")}.
  `;

  // Insert user message + custom system instructions.
  const messages = payload.messages;

  messages.unshift({
    role: "system",
    content: systemInstructions,
  });

  // Use Copilot's LLM to generate a response to the user's messages, with
  // our extra system messages attached.
  const copilotLLMResponse = await fetch(
    "https://api.githubcopilot.com/chat/completions",
    {
      method: "POST",
      headers: {
        authorization: `Bearer ${tokenForUser}`,
        "content-type": "application/json",
      },
      body: JSON.stringify({
        messages,
        stream: true,
      }),
    }
  );

  // Stream the response straight back to the user.
  Readable.from(copilotLLMResponse.body).pipe(res);
})

const port = Number(process.env.PORT || '3000')
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
});