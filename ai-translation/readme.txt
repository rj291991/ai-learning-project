===========================================
AI Translator API
===========================================

Project:
AI Translator using OpenAI Responses API

Description:
This project demonstrates different Prompt Engineering techniques by building
a Translator API.

Prompting Techniques Covered:
1. Role Prompting
2. Context Prompting
3. Output Prompting

-------------------------------------------
Project Structure
-------------------------------------------

src/
│
├── config/
│     └── aiClient.js
│
├── prompts/
│     └── translatorPrompts.js
│
├── services/
│     └── translatorService.js
│
├── routes/
│     └── translatorRoute.js
│
├── app.js
│
└── .env

-------------------------------------------
Prerequisites
-------------------------------------------

Node.js
npm
Ollama (or OpenAI API)

-------------------------------------------
Install Dependencies
-------------------------------------------

npm install

-------------------------------------------
Environment Variables
-------------------------------------------

Create a .env file

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

POST /translate

-------------------------------------------
Request Body
-------------------------------------------

{
    "text": "भारत एक महान देश है।",
    "targetLanguage": "English",
    "promptType": "role-prompting"
}

-------------------------------------------
Supported Prompt Types
-------------------------------------------

role-prompting
context-prompting
output-prompting

-------------------------------------------
Example Requests
-------------------------------------------

Role Prompting

{
    "text":"भारत एक महान देश है।",
    "targetLanguage":"English",
    "promptType":"role-prompting"
}

-------------------------------------------

Context Prompting

{
    "text":"भारत एक महान देश है।",
    "targetLanguage":"English",
    "promptType":"context-prompting"
}

-------------------------------------------

Output Prompting

{
    "text":"भारत एक महान देश है।",
    "targetLanguage":"English",
    "promptType":"output-prompting"
}

-------------------------------------------
Sample Response
-------------------------------------------

{
    "success": true,
    "response": "India is a great nation."
}

-------------------------------------------
Features
-------------------------------------------

✔ Role Prompting
✔ Context Prompting
✔ Output Formatting
✔ Input Validation
✔ Error Handling
✔ Modular Architecture
✔ OpenAI Responses API
✔ Production-style Folder Structure

-------------------------------------------
Learning Objectives
-------------------------------------------

- Understand Prompt Engineering
- Learn Role Prompting
- Learn Context Prompting
- Learn Output Formatting
- Understand Modular Backend Architecture
- Build AI APIs using OpenAI SDK
- Learn Service Layer Architecture

-------------------------------------------
Author
-------------------------------------------

AI Backend Engineering Practice
Day 2 - Prompt Engineering