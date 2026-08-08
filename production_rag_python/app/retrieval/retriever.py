from langchain_community.vectorstores import FAISS
from ingestion.embedder import get_embedding_model



def create_retriever(vector_db_path):


    embeddings = get_embedding_model()


    vector_db = FAISS.load_local(
        vector_db_path,
        embeddings,
        allow_dangerous_deserialization=True
    )


    retriever = vector_db.as_retriever(
        search_type="mmr",
        search_kwargs={
            "k":20,
            "fetch_k":50
        }
    )


    return retriever