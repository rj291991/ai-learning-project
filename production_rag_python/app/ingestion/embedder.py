# Embedding generation

from langchain_ollama import OllamaEmbeddings


def get_embedding_model():
    """
    Return embedding model
    """

    embeddings = OllamaEmbeddings(
        model="nomic-embed-text"
    )

    return embeddings