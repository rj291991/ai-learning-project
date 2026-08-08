from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings, ChatOllama


# Load embedding model
embeddings = OllamaEmbeddings(
    model="nomic-embed-text"
)


# Load Vector Database
db = FAISS.load_local(
    "vector_store",
    embeddings,
    allow_dangerous_deserialization=True
)


# User Question
question = input("Ask your question: ")


# Search relevant chunks
docs = db.similarity_search(
    question,
    k=3
)


context = "\n".join(
    [doc.page_content for doc in docs]
)


# Qwen3 LLM
llm = ChatOllama(
    model="qwen3"
)


prompt = f"""
You are a helpful assistant.

Answer only using the given context.

Context:
{context}

Question:
{question}
"""


response = llm.invoke(prompt)


print("\nAnswer:")
print(response.content)