from retrieval.retriever import create_retriever
from retrieval.query_rewriter import rewrite_query
from retrieval.reranker import Reranker
from llm.context_builder import build_context



query = "leave?"



# Query rewrite

rewritten_query = rewrite_query(
    query
)


print("\nRewritten Query:")
print(rewritten_query)



# Retrieve

retriever = create_retriever(
    "vector_db"
)


documents = retriever.invoke(
    rewritten_query
)



print(
    "\nRetrieved:",
    len(documents)
)



# Reranking

reranker = Reranker()


reranked_docs = reranker.rerank(
    rewritten_query,
    documents,
    top_k=5
)



print(
    "\nAfter Reranking:",
    len(reranked_docs)
)



# Context Builder

context = build_context(
    reranked_docs
)



print("\n========== CONTEXT ==========\n")

print(context)