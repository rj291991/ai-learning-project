from ingestion.loader import load_pdf
from ingestion.chunker import chunk_documents
from ingestion.embedder import get_embedding_model


docs = load_pdf("data/uploads/company.pdf")
chunks = chunk_documents(docs)
embedding_model = get_embedding_model()
vector = embedding_model.embed_query(chunks[0].page_content)
print("Embedding length:", len(vector))
print("First 10 values:")
print(vector[:10])