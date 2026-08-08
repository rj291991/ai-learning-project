from retrieval.retriever import create_retriever

retriever = create_retriever(
    "vector_db"
)


query = "What is the company about?"


results = retriever.invoke(query)


print("Total chunks found:", len(results))


for i, doc in enumerate(results):

    print("\n================")
    print("Chunk:", i+1)
    print("================")

    print(doc.page_content[:500])

    print("\nMetadata:")
    print(doc.metadata)