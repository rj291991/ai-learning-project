# AI Native Tool Calling Backend

A TypeScript-based AI backend demonstrating **native LLM function calling**, dynamic tool orchestration, runtime argument validation, and scalable tool registry architecture using an **OpenAI-compatible API with Ollama**.

The project demonstrates how an LLM can understand a user's request, select the appropriate backend tool, generate structured arguments, execute the tool, and receive the tool result to generate the final natural-language response.

---

## 🚀 Project Overview

This project implements a backend architecture where the AI model can dynamically decide which tool should be executed based on the user's query.

Instead of using prompt-based tool selection such as:

```text
"You are a tool selector..."
```

the application uses **native function calling** through the API's `tools` parameter.

### Example

User:

```text
Give me a random number between 10 and 50.
```

The AI determines that the `randomNumber` tool is appropriate and generates structured arguments:

```json
{
  "min": 10,
  "max": 50
}
```

The backend then executes the actual function:

```text
randomNumber(10, 50)
```

The result is sent back to the AI model, which generates the final response:

```text
A random number between 10 and 50 is 14.
```

---

# 🏗️ Architecture

```text
                    User Query
                        │
                        ▼
                 ┌─────────────┐
                 │  LLM Model  │
                 └──────┬──────┘
                        │
                        │ Native Function Calling
                        ▼
              ┌────────────────────┐
              │   Tool Selection   │
              └─────────┬──────────┘
                        │
             ┌──────────┴──────────┐
             │                     │
             ▼                     ▼
      ┌─────────────┐      ┌───────────────┐
      │ Calculator  │      │ Random Number │
      │    Tool     │      │     Tool      │
      └──────┬──────┘      └───────┬───────┘
             │                     │
             └──────────┬──────────┘
                        ▼
                 Tool Registry
                        │
                        ▼
                Zod Validation
                        │
                        ▼
                 Tool Execution
                        │
                        ▼
                   Tool Result
                        │
                        ▼
                       LLM
                        │
                        ▼
                Final AI Response
```

---

# ✨ Key Features

## 1. Native LLM Function Calling

The project uses native function calling instead of relying on prompt-based tool selection.

Tools are provided directly to the model through the API:

```ts
tools: [
    calculatorTool,
    randomNumberTool
]
```

The model decides whether a tool is required and which tool should be called.

---

## 2. Dynamic Tool Registry

The project uses a centralized tool registry instead of maintaining a large `switch` statement.

Conceptually:

```ts
const tool = toolRegistry[toolName];

const result = tool(args);
```

This makes the architecture easier to extend as new tools are introduced.

For example:

```text
calculator
randomNumber
weather
databaseSearch
email
```

can all be registered without changing the core orchestration flow.

---

## 3. Multiple AI Tools

The current implementation includes two native tools:

### Calculator

Performs mathematical calculations.

Example:

```text
What is 25 + 30?
```

AI generates:

```json
{
  "expression": "25+30"
}
```

Backend executes:

```ts
calculate("25+30")
```

Result:

```text
55
```

---

### Random Number

Generates a random number within a specified range.

Example:

```text
Give me a random number between 10 and 50.
```

AI generates:

```json
{
  "min": 10,
  "max": 50
}
```

Backend executes:

```ts
randomNumber(10, 50)
```

---

# 🔐 Zod-Based Runtime Validation

LLM-generated tool arguments are treated as **untrusted input**.

Even though the model receives a parameter schema, the backend validates the arguments before executing the tool.

Example:

```ts
const parsed = RandomNumberArgsSchema.parse(args);
```

This provides runtime guarantees for tool inputs.

For example, if the model returns:

```json
{
  "min": "10",
  "max": "50"
}
```

the backend can safely validate and coerce the values into numbers.

This prevents malformed AI-generated arguments from directly reaching business logic.

---

# 🤖 AI-Driven Tool Selection

The model determines which tool is appropriate based on:

* User query
* Tool name
* Tool description
* Parameter schema

For example:

```text
"What is 25 + 30?"
```

→ `calculator`

while:

```text
"Generate a random number between 10 and 50."
```

→ `randomNumber`

No manual prompt-based routing is required.

---

# 🔌 OpenAI-Compatible API + Ollama

The project uses an OpenAI-compatible client while running the model through Ollama.

Example client configuration:

```ts
const client = new OpenAI({
    baseURL: process.env.OLLAMA_BASE_URL,
    apiKey: "ollama"
});
```

This allows the application to use the familiar OpenAI SDK/API structure while running a locally hosted model.

---

# 🧩 Separation of Tool Definition and Implementation

Tool metadata and business logic are intentionally separated.

### Tool Definition

Example:

```text
calculatorTool.ts
```

Contains:

* Tool name
* Description
* Parameter schema

### Tool Implementation

Example:

```text
calculator.ts
```

Contains:

* Actual calculation logic

This follows the **Separation of Concerns** principle and makes the architecture easier to maintain and extend.

---

# 🟦 TypeScript

The backend is implemented using TypeScript to provide:

* Static typing
* Better IDE support
* Safer tool interfaces
* Improved maintainability
* Compile-time error detection

TypeScript is particularly useful when different tools require different argument structures.

For example:

```text
Calculator
→ expression: string

Random Number
→ min: number
→ max: number
```

---

# ⚙️ Backend Orchestration

The backend is responsible for coordinating the complete tool-calling lifecycle.

It does not allow the AI model to directly execute application functions.

Instead:

```text
LLM
 ↓
Function Call Request
 ↓
Backend
 ↓
Tool Registry
 ↓
Validation
 ↓
Tool Execution
```

This keeps the actual business logic under backend control.

---

# 🔄 Tool Result → LLM → Final Response Loop

One of the core concepts demonstrated by this project is the tool-result feedback loop.

Example:

```text
User
"What is 25 + 30?"
        ↓
LLM
        ↓
calculator("25+30")
        ↓
Backend
        ↓
55
        ↓
LLM
        ↓
"25 + 30 = 55."
```

The LLM does not directly execute the calculator function.

The backend executes the function and provides the result back to the model.

---

# 📁 Project Structure

```text
src/
│
├── config/
│   └── aiClient.ts
│
├── routes/
│   └── chatRoute.ts
│
├── services/
│   └── chatService.ts
│
├── tools/
│   ├── calculator.ts
│   ├── calculatorTool.ts
│   ├── randomNumber.ts
│   ├── randomNumberTool.ts
│   └── toolRegistry.ts
│
├── schemas/
│   └── toolSchema.ts
│
└── app.ts
```

---

# 🧠 Design Principles Demonstrated

This project demonstrates several backend and AI engineering principles:

* Separation of Concerns
* Single Responsibility
* Runtime input validation
* Type-safe tool execution
* Dynamic dispatch through a registry
* AI-driven orchestration
* Backend-controlled execution
* Extensible tool architecture
* API abstraction
* Local LLM integration

---

# 🧪 Example Requests

### Calculator

```http
POST /chat
```

```json
{
  "userMessage": "What is 125 * 24?"
}
```

Possible response:

```json
{
  "success": true,
  "message": "125 × 24 = 3000."
}
```

---

### Random Number

```http
POST /chat
```

```json
{
  "userMessage": "Give me a random number between 1 and 100."
}
```

Possible response:

```json
{
  "success": true,
  "message": "Your random number is 57."
}
```

---

# 🆚 Prompt-Based vs Native Function Calling

This project intentionally moves away from the earlier prompt-based architecture.

### Prompt-Based Tool Selection

```text
User
 ↓
Tool Selection Prompt
 ↓
LLM
 ↓
JSON
 ↓
JSON Parsing
 ↓
Tool
```

The tool structure is described inside the prompt.

### Native Function Calling

```text
User
 ↓
LLM + tools parameter
 ↓
Native function_call
 ↓
Backend
 ↓
Tool
```

The API itself receives the structured tool definitions.

This makes the architecture cleaner and reduces the need for manually parsing tool-selection responses.

---

# 🎯 Resume Highlights

The following capabilities can be highlighted on a resume:

* **Native LLM Function Calling**
* **Dynamic Tool Registry**
* **Multiple AI Tools — Calculator + Random Number**
* **Zod-Based Runtime Validation**
* **AI-Driven Tool Selection**
* **OpenAI-Compatible API + Ollama**
* **Separation of Tool Definition and Implementation**
* **TypeScript**
* **Backend Orchestration**
* **Tool Result → LLM → Final Response Loop**

---

# 👨‍💻 Tech Stack

* TypeScript
* Node.js
* Express.js
* Ollama
* OpenAI-compatible API
* OpenAI SDK
* Zod

---

# 🚧 Future Improvements

The architecture can be extended with:

* Weather tool
* Database search tool
* Web search tool
* Authentication and authorization for tools
* Tool-level permissions
* Tool execution timeouts
* Retry mechanisms
* Structured logging
* Observability and tracing
* Tool execution metrics
* Parallel tool calls
* Error recovery
* Tool result caching
* Automated testing
* Production-grade security controls

---

# 💡 Key Learning

The primary objective of this project is to understand how modern AI backends can move from simple prompt-based interactions toward **structured, tool-aware LLM orchestration**.

The model is responsible for deciding **what should be done**, while the backend remains responsible for **how it is actually executed**.

```text
LLM → Decision
Backend → Execution
Tool → Result
LLM → Final Response
```

This separation creates a foundation for building more scalable AI agents and AI-powered backend systems.