from retrieval.query_rewriter import rewrite_query


queries = [
    "leave?",
    "salary?",
    "company?"
]


for query in queries:

    rewritten = rewrite_query(query)

    print("\nOriginal:")
    print(query)

    print("Rewritten:")
    print(rewritten)

    print("----------------")