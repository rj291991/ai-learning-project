def build_context(documents):
    """
    Convert retrieved documents into LLM readable context.

    Input:
        documents = reranker ke output chunks

    Output:
        formatted context string
    """


    context_parts = []


    for doc in documents:


        # Document metadata
        source = doc.metadata.get(
            "source",
            "Unknown"
        )


        page = doc.metadata.get(
            "page_label",
            "Unknown"
        )


        # Current chunk format

        chunk_text = f"""
Source: {source}
Page: {page}

Content:
{doc.page_content}
"""


        context_parts.append(
            chunk_text
        )


    # Combine all chunks

    context = "\n\n----------------\n\n".join(
        context_parts
    )


    return context