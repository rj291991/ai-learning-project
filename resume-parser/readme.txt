# AI Resume Parser

## Overview

AI Resume Parser is a Node.js + TypeScript project that extracts structured information from resume text using a Large Language Model (LLM).

The application converts unstructured resume text into machine-readable JSON, validates the response using Zod, and exposes the functionality through a REST API.

---

## Features

* AI-powered resume parsing
* Structured JSON output
* Prompt Engineering
* Zod schema validation
* AI response cleanup
* Error handling
* REST API using Express
* TypeScript support

---

## Project Structure

```
src/

config/
    aiClient.ts

prompts/
    resumePrompts.ts

routes/
    resumeRoute.ts

schemas/
    resumeSchema.ts

services/
    resumeService.ts

utils/
    aiResponseCleaner.ts

app.ts
```

---

## Tech Stack

* Node.js
* TypeScript
* Express.js
* Ollama / OpenAI Compatible SDK
* Zod
* dotenv

---

## API

### POST

```
/resume-parser
```

### Request

```json
{
    "resume": "John Doe

Email: john@gmail.com

Phone: +91 9876543210

Skills:
Node.js
React
MongoDB

Experience:
Backend Developer at ABC Tech (2 years)

Education:
B.Tech from XYZ University"
}
```

---

## Sample Response

```json
{
    "success": true,
    "data": {
        "name": "John Doe",
        "email": "john@gmail.com",
        "phone": "+91 9876543210",
        "skills": [
            "Node.js",
            "React",
            "MongoDB"
        ],
        "experience": [
            {
                "company": "ABC Tech",
                "role": "Backend Developer",
                "duration": "2 years"
            }
        ],
        "education": [
            {
                "degree": "B.Tech",
                "college": "XYZ University"
            }
        ]
    }
}
```

---

## How It Works

1. Client sends resume text.
2. Express route receives the request.
3. Service creates the AI prompt.
4. AI generates structured JSON.
5. AI response is cleaned.
6. JSON is parsed.
7. Zod validates the response.
8. Validated data is returned to the client.

---

## Prompt Engineering Techniques Used

* Role Prompting
* Context Prompting
* Task Prompting
* Instruction Prompting
* Output Formatting

---

## Validation

The project uses Zod to validate AI-generated responses.

Validation includes:

* Name
* Email
* Phone
* Skills
* Experience
* Education

If validation fails, the API returns an appropriate error instead of invalid data.

---

## Production Improvements

Current improvements include:

* AI response cleanup
* Structured JSON output
* Zod validation
* Safe parsing
* Better error handling
* Modular architecture

Future improvements:

* PDF resume upload
* OCR support
* ATS score generation
* Resume ranking
* Skill matching
* Database integration
* Authentication
* Logging
* Retry mechanism
* Unit testing

---

## Learning Outcomes

This project demonstrates:

* Prompt Engineering
* Structured Outputs
* JSON Parsing
* JSON Validation
* Zod
* Express API Development
* AI Backend Engineering Fundamentals

---

## Run the Project

Install dependencies

```
npm install
```

Start Ollama

```
ollama serve
```

Run the required model

```
ollama run llama3.2:3b
```

Start the application

```
npm run dev
```

---

## Author

Created as part of an AI Backend Engineering learning roadmap.
