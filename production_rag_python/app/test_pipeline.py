from ingestion.pipeline import create_vector_store


create_vector_store(
    pdf_path="data/uploads/company.pdf",
    save_path="vector_db"
)