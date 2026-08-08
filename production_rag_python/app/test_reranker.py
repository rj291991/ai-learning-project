from retrieval.retriever import create_retriever
from retrieval.reranker import Reranker
from retrieval.query_rewriter import rewrite_query



# User input
user_query = "leave?"


print("\nOriginal Query:")
print(user_query)



# Query Rewrite

rewritten_query = rewrite_query(
    user_query
)


print("\nRewritten Query:")
print(rewritten_query)



# Retriever

retriever = create_retriever(
    "vector_db"
)



documents = retriever.invoke(
    rewritten_query
)



print(
    "\nChunks before reranking:",
    len(documents)
)



# Reranker

reranker = Reranker()



results = reranker.rerank(
    rewritten_query,
    documents,
    top_k=5
)



print("\nFinal Ranked Chunks:\n")



for i, doc in enumerate(results):

    print("========================")
    print("Rank:", i+1)

    print(
        "Score:",
        doc.metadata.get(
            "rerank_score"
        )
    )


    print(
        "\nContent:"
    )

    print(
        doc.page_content[:500]
    )


    print(
        "\nMetadata:"
    )

    print(
        doc.metadata
    )