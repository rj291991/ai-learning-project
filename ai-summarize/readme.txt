===========================================
AI Summarizer API
===========================================

Project:
AI Summarizer using OpenAI Responses API

Description:
This project demonstrates Prompt Engineering techniques by building
an AI-powered Text Summarizer.

The project supports multiple prompting strategies to compare how
different prompts influence the quality of the generated summary.

-------------------------------------------
Prompting Techniques Covered
-------------------------------------------

1. Basic Summarization
2. Context Prompting
3. Output Formatting

-------------------------------------------
Project Structure
-------------------------------------------

src/
│
├── config/
│     └── aiClient.js
│
├── prompts/
│     └── summarizerPrompts.js
│
├── services/
│     └── summarizerService.js
│
├── routes/
│     └── summarizerRoute.js
│
├── app.js
│
└── .env

-------------------------------------------
Prerequisites
-------------------------------------------

- Node.js
- npm
- Ollama (or OpenAI API)

-------------------------------------------
Installation
-------------------------------------------

npm install

-------------------------------------------
Environment Variables
-------------------------------------------

Create a .env file.

Example:

OLLAMA_BASE_URL=http://localhost:11434/v1

-------------------------------------------
Run Project
-------------------------------------------

node src/app.js

Server starts on:

http://localhost:3000

-------------------------------------------
API Endpoint
-------------------------------------------

POST /summarize

-------------------------------------------
Request Body
-------------------------------------------

{
    "text":"<Your text here>",
    "promptType":"basic-summary"
}

-------------------------------------------
Supported Prompt Types
-------------------------------------------

1. basic-summary
2. context-prompting
3. output-formatting

-------------------------------------------
Example Requests
-------------------------------------------

Basic Summary

{
    "text":"Artificial Intelligence is transforming every industry...",
    "promptType":"basic-summary"
}

-------------------------------------------

Context Prompting

{
    "text":"Meeting discussion regarding project deadlines...",
    "promptType":"context-prompting"
}

-------------------------------------------

Output Formatting

{
    "text":"Meeting discussion regarding project deadlines...",
    "promptType":"output-formatting"
}

-------------------------------------------
Sample Response
-------------------------------------------

Basic Summary

{
    "success": true,
    "response": "The meeting focused on project deadlines and task assignments."
}

-------------------------------------------

Output Formatting

{
    "success": true,
    "response":
    {
        "summary":"The meeting discussed project deadlines.",
        "actionItems":[
            "Complete frontend by Friday",
            "Review backend APIs",
            "Deploy staging environment"
        ]
    }
}

-------------------------------------------
Features
-------------------------------------------

✔ AI Text Summarization
✔ Context Prompting
✔ Delimiters
✔ Output Formatting
✔ Input Validation
✔ Error Handling
✔ Modular Folder Structure
✔ OpenAI Responses API

-------------------------------------------
Learning Objectives
-------------------------------------------

- Learn AI Summarization
- Understand Context Prompting
- Learn Delimiters
- Learn Output Formatting
- Build Modular AI APIs
- Understand Production Folder Structure
- Practice Prompt Engineering

-------------------------------------------
Future Improvements
-------------------------------------------

- Upload PDF support
- Upload DOCX support
- Custom summary length
- Bullet-point summaries
- Keyword extraction
- Streaming responses

-------------------------------------------
Author
-------------------------------------------

AI Backend Engineering Practice

Day 2 — Prompt Engineering

Project 3 — AI Summarizer