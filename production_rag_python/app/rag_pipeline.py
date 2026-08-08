from retrieval.query_rewriter import rewrite_query
from retrieval.retriever import create_retriever
from retrieval.reranker import Reranker

from llm.context_builder import build_context
from prompts.template import create_prompt
from llm.model import get_llm



# Load components once

retriever = create_retriever(
    "vector_db"
)

reranker = Reranker()

llm = get_llm()



def ask_question(question):

    print("\nOriginal Question:")
    print(question)


    # 1. Query Rewrite
    rewritten_query = rewrite_query(question)

    print("\nRewritten Query:")
    print(rewritten_query)

    # 2. Retrieve chunks
    documents = retriever.invoke(rewritten_query)

    print("\nRetrieved chunks:",len(documents))

    # 3. Rerank
    ranked_documents = reranker.rerank(
        rewritten_query,
        documents,
        top_k=5
    )

    print(
        "After reranking:",
        len(ranked_documents)
    )

    # 4. Build Context
    context = build_context(
        ranked_documents
    )

    # 5. Create Prompt
    prompt = create_prompt(
        context,
        question
    )


    # 6. LLM Response
    response = llm.invoke(
        prompt
    )


    return response.content