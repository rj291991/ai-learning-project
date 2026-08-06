# AI Tool Calling Assistant (Day 4)

## Overview

This project demonstrates how to build an AI assistant that can decide whether it should answer directly or use a backend tool.

Instead of hardcoding logic in the backend, the AI analyzes the user's query, selects the appropriate tool, executes it, and then generates a natural language response.

Current supported tools:

* Calculator
* Random Number Generator

---

# Project Flow

```text
User
   │
   ▼
Tool Selector Prompt
   │
   ▼
AI Decision (JSON)
   │
   ▼
Zod Validation
   │
   ▼
Backend Tool
   │
   ▼
Tool Result
   │
   ▼
Final AI Prompt
   │
   ▼
Natural Language Response
```

---

# Folder Structure

```text
src
│
├── config
│   └── aiClient.ts
│
├── prompts
│   └── toolSelectorPrompt.ts
│
├── routes
│   └── chatRoute.ts
│
├── schemas
│   └── toolSchema.ts
│
├── services
│   └── chatService.ts
│
├── tools
│   ├── calculator.ts
│   └── randomNumber.ts
│
├── utils
│   └── cleaner.ts
│
└── app.ts
```

---

# Tool 1 : Calculator

## Purpose

Performs mathematical calculations.

### Example User Queries

* What is 25 + 30?
* Calculate 12 * 45
* Divide 500 by 25

### AI Output

```json
{
  "tool": "calculator",
  "expression": "25+30"
}
```

Backend executes:

```ts
calculate("25+30")
```

Result:

```
55
```

AI then generates:

```
The answer is 55.
```

---

# Tool 2 : Random Number

## Purpose

Generates a random number.

### Example User Queries

* Generate a random number
* Generate a random number between 1 and 100
* Pick a random number from 50 to 70

### AI Output

```json
{
  "tool": "randomNumber",
  "min": 1,
  "max": 100
}
```

Backend executes:

```ts
randomNumber(1,100)
```

Result:

```
67
```

AI generates:

```
Your random number is 67.
```

---

# Tool Selector Prompt

Instead of creating one prompt for every tool, a single prompt is used.

The prompt contains:

* Available tools
* Description of each tool
* Required arguments
* Output JSON format

The AI decides which tool should be used.

Possible outputs:

Calculator

```json
{
  "tool":"calculator",
  "expression":"25+30"
}
```

Random Number

```json
{
  "tool":"randomNumber",
  "min":1,
  "max":100
}
```

Normal Conversation

```json
{
  "tool":"none",
  "response":"Hello! How can I help you?"
}
```

---

# Validation

The AI response is validated using Zod.

Example Schema

```ts
ToolSchema
```

Benefits

* Runtime validation
* Type safety
* Prevents invalid AI responses
* Safer production code

---

# AI Response Cleaning

Sometimes the model returns:

````text
```json
{
...
}
```
````

Before parsing, the response is cleaned using:

```ts
cleanAIResponse()
```

This removes markdown formatting and returns valid JSON.

---

# Final Response Generation

The backend does not directly return tool output.

Instead:

```
Tool Result
      ↓
Final Prompt
      ↓
AI
      ↓
Natural Language Response
```

This produces responses that sound more conversational.

---

# Challenges Faced

## 1. Free Text vs Structured Output

Problem

AI returned plain text that was difficult to parse.

Solution

Forced the model to return valid JSON.

---

## 2. Invalid JSON

Problem

The AI sometimes returned Markdown.

Example

````text
```json
{
...
}
```
````

Solution

Created

```ts
cleanAIResponse()
```

---

## 3. Runtime Safety

Problem

JSON.parse() succeeded but data structure could still be incorrect.

Solution

Validated responses with Zod.

---

## 4. Optional TypeScript Fields

Problem

```
Argument of type 'string | undefined'
```

Cause

Optional properties may be undefined.

Solution

Used proper Zod validation and discriminated unions instead of relying only on interfaces.

---

## 5. Multiple Tool Prompts

Initial Approach

```
calculatorPrompt
randomPrompt
weatherPrompt
```

Problem

Which prompt should execute first?

Solution

Created one generic Tool Selector Prompt that knows about all available tools.

---

## 6. Tool Registry

Goal

Remove switch statements completely.

Problem

TypeScript reported union type errors because each tool accepted different argument shapes.

Lesson Learned

Sometimes a small dispatcher (switch or typed registry) is clearer than forcing a completely generic solution. Tool Registry is an advanced TypeScript pattern that can be implemented later with proper typing.

---

## 7. Discriminated Union

Used

```ts
z.discriminatedUnion()
```

Benefits

* Automatic type narrowing
* Better IntelliSense
* Cleaner service logic
* Compile-time safety

---

# Key Learnings

* Prompt Engineering
* Structured JSON Output
* Tool Calling Architecture
* Prompt Chaining
* AI Decision Making
* Zod Validation
* Response Cleaning
* TypeScript Type Safety
* Multi-tool Design
* AI → Tool → AI Workflow

---

# Future Improvements

* Tool Registry
* Native OpenAI Function Calling
* Weather Tool
* Date & Time Tool
* Email Tool
* Search Tool
* Meeting Assistant
* Agentic Workflows

---

# Final Outcome

Built an AI assistant capable of:

* Understanding user intent
* Selecting the correct backend tool
* Validating AI responses
* Executing backend logic
* Generating human-friendly answers

This project establishes the foundation for building production-ready AI assistants with multiple tools.
