from langchain_community.document_loaders import PyPDFLoader
from langchain_text_splitters import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_ollama import OllamaEmbeddings


# Load PDF
loader = PyPDFLoader("data/company.pdf")
docs = loader.load()


# Split text
splitter = RecursiveCharacterTextSplitter(
    chunk_size=500,
    chunk_overlap=50
)

chunks = splitter.split_documents(docs)


# Embedding model
embeddings = OllamaEmbeddings(
    model="nomic-embed-text"
)


# Create Vector DB
db = FAISS.from_documents(
    chunks,
    embeddings
)


# Save DB
db.save_local("vector_store")


print("Vector DB Created Successfully!")