from ingestion.loader import load_pdf
from ingestion.chunker import chunk_documents
from ingestion.embedder import get_embedding_model
from langchain_community.vectorstores import FAISS


def create_vector_store(pdf_path: str, save_path: str):
    """
    Complete ingestion pipeline:
    PDF -> Chunks -> Embeddings -> Vector DB
    """

    # Step 1: Load PDF
    documents = load_pdf(pdf_path)

    print(f"Loaded pages: {len(documents)}")


    # Step 2: Chunk documents
    chunks = chunk_documents(documents)

    print(f"Created chunks: {len(chunks)}")


    # Step 3: Get embedding model
    embeddings = get_embedding_model()


    # Step 4: Create Vector Database
    vector_db = FAISS.from_documents(
        chunks,
        embeddings
    )


    # Step 5: Save Vector DB
    vector_db.save_local(save_path)


    print("Vector DB created successfully!")

    return vector_db
