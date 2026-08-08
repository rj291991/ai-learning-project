from ingestion.loader import load_pdf


docs = load_pdf(
    "data/uploads/company.pdf"
)


print("Total Pages:", len(docs))

# print(docs[0].page_content)

for i, doc in enumerate(docs):
    print("\n====================")
    print("Page Number:", i + 1)
    print("====================")
    print(doc.page_content[:500])