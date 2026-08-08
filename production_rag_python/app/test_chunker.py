from ingestion.loader import load_pdf
from ingestion.chunker import chunk_documents


docs = load_pdf(
    "data/uploads/company.pdf"
)


chunks = chunk_documents(docs)


print("Total Pages:", len(docs))
print("Total Chunks:", len(chunks))


print("\nFirst Chunk:")
print(chunks[0].page_content)