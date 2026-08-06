# AI Meeting Assistant (Prompt Chaining)

## Project Overview

AI Meeting Assistant is a TypeScript-based AI application that demonstrates **Prompt Chaining** using Large Language Models (LLMs).

The application processes a meeting transcript through multiple AI prompts to generate:

* Meeting Summary
* Action Items
* Professional Follow-up Email

Each AI response becomes the input for the next prompt, making it a practical implementation of Prompt Chaining.

---

# Project Workflow

```
Meeting Transcript
        │
        ▼
Generate Meeting Summary
        │
        ▼
Extract Action Items
        │
        ▼
Generate Follow-up Email
        │
        ▼
Return Final Response
```

---

# Prompt Chaining Flow

### Prompt 1

Generate a concise meeting summary.

↓

### Prompt 2

Use the generated summary to extract action items.

↓

### Prompt 3

Use the meeting summary and action items to generate a professional follow-up email.

---

# Project Structure

```
src/

│── app.ts

├── config/
│     └── aiClient.ts

├── prompts/
│     └── meetingPrompts.ts

├── services/
│     └── meetingService.ts

├── routes/
│     └── meetingRoute.ts

├── types/
│     └── meeting.ts
```

---

# Tech Stack

* TypeScript
* Node.js
* Express.js
* OpenAI SDK
* Ollama
* Prompt Engineering

---

# API Endpoint

**POST**

```
/meeting-assistant
```

---

# Sample Request

```json
{
  "transcript": "Today's meeting focused on the AI Backend project. Ravi will implement authentication by Friday. Amit will complete the React dashboard by Wednesday. Testing will begin next Monday."
}
```

---

# Sample Response

```json
{
  "success": true,
  "data": {
    "summary": "• Project timeline discussed\n• Authentication assigned to Ravi\n• Dashboard assigned to Amit\n• Testing starts next Monday",

    "actionItems": [
      {
        "owner": "Ravi",
        "task": "Implement authentication",
        "deadline": "Friday"
      },
      {
        "owner": "Amit",
        "task": "Complete React dashboard",
        "deadline": "Wednesday"
      }
    ],

    "followupEmail": "Subject: Meeting Follow-up..."
  }
}
```

---

# Prompt Engineering Techniques Used

* Role Prompting
* Context Prompting
* Task Prompting
* Output Formatting
* Prompt Chaining

---

# What I Learned

By building this project, I learned:

* Designing AI prompts for business use cases.
* Implementing Prompt Chaining.
* Passing AI output from one prompt to another.
* Creating modular AI services using TypeScript.
* Building REST APIs with Express.js.
* Organizing AI applications using clean architecture.
* Measuring AI response time using `console.time()`.

---

# Performance Observation

Initial testing with **Qwen3** resulted in very slow responses on CPU.

Approximate timings:

* Single AI request: ~2 minutes

After switching to a lighter model (**llama3.2:3b**), performance improved significantly.

Approximate timings:

* Three AI requests (Prompt Chaining): ~43 seconds

This experiment showed that overall response time depends not only on the application code but also on model size and available hardware.

---

# Future Improvements

* Structured JSON Outputs
* Zod Validation
* Streaming Responses
* Retry Mechanism
* Request Timeout
* PDF Meeting Minutes
* Calendar Integration
* Email Sending Integration
* Speaker Identification
* Multi-language Support

---

# Interview Explanation

### What is Prompt Chaining?

Prompt Chaining is a Prompt Engineering technique where a complex task is divided into multiple smaller prompts.

Instead of asking the AI to perform everything in one request, the output of one prompt is passed as the input to the next prompt.

In this project:

1. The first prompt summarizes the meeting.
2. The second prompt extracts action items from the summary.
3. The third prompt generates a professional follow-up email using the summary and action items.

This approach improves modularity, makes debugging easier, and allows each prompt to focus on a single responsibility.

---

# Project Status

✅ Completed

**Concepts Covered**

* Prompt Engineering
* Prompt Chaining
* AI Workflow Design
* Express.js
* TypeScript
* OpenAI SDK
* Ollama Integration
