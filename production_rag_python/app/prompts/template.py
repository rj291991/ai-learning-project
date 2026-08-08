def create_prompt(context, question):
    """
    Create final prompt for LLM

    context:
        Retrieved document chunks

    question:
        User question
    """


    prompt = f"""

You are an AI assistant.

You answer questions using only the provided context.

Rules:
1. Do not use outside knowledge.
2. If answer is not present in context, say:
   "Information not available in the documents."
3. Keep answer clear and concise.


Context:

{context}


Question:

{question}


Answer:

"""


    return prompt