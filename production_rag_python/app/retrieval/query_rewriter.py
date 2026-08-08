from langchain_ollama import ChatOllama


def rewrite_query(user_query: str):

    llm = ChatOllama(
        model="qwen3",
        temperature=0
    )


    prompt = f"""
You are a query rewriting component inside a RAG system.

Your job is NOT to answer the question.

Your job is ONLY to rewrite the user's query
into a better search query for finding information
inside company documents.

Rules:
- Do not explain anything.
- Do not define terms.
- Do not answer the question.
- Add relevant context related to company documents.
- Return only one rewritten search query.

Examples:

User:
leave?

Output:
What is the employee leave policy, leave rules, and available leave types according to company documents?

User:
salary?

Output:
What is the salary structure, compensation policy, and employee benefits according to company documents?


Now rewrite:

User:
{user_query}

Rewritten query:
"""
    
    response = llm.invoke(prompt)

    return response.content


# Abhi humne basic query rewrite banaya hai.
# Production me isme aur cheeze add hoti hain:
# Conversation history
# User intent detection
# Multi-query generation
# Query classification