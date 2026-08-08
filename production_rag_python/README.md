# Production RAG Project Journey Documentation

## Project Name

Production RAG System (Local Implementation)

---

# 1. Project Goal

Objective:

Build a production-style Retrieval Augmented Generation (RAG) system where users can ask questions from multiple company documents and get accurate answers using:

* Document ingestion pipeline
* Vector database
* Retrieval system
* Reranking
* LLM generation

Architecture:

```
User
 |
 ▼
FastAPI Backend
 |
 ▼
Query Processing
 |
 ▼
Retriever
 |
 ▼
Vector Database
 |
 ▼
Reranker
 |
 ▼
Context Builder
 |
 ▼
LLM
 |
 ▼
Response
```

---

# 2. Initial Folder Structure

Created production-oriented structure:

```
production_rag/

│
├── app/
│   │
│   ├── main.py
│   │
│   ├── ingestion/
│   │      ├── loader.py
│   │      ├── chunker.py
│   │      ├── embedder.py
│   │      └── pipeline.py
│   │
│   ├── retrieval/
│   │      ├── retriever.py
│   │      ├── query_rewriter.py
│   │      └── reranker.py
│   │
│   ├── llm/
│   │      └── model.py
│   │
│   └── prompts/
│          └── template.py
│
├── data/
│
├── vector_db/
│
└── requirements.txt
```

---

# Phase 1: Document Ingestion Pipeline

## Goal

Convert PDF documents into searchable vectors.

Flow:

```
PDF
 |
 ▼
Loader
 |
 ▼
Text Chunking
 |
 ▼
Embedding
 |
 ▼
Vector Database
```

---

# 3. PDF Loading

## File:

```
app/ingestion/loader.py
```

Technology:

```
PyPDFLoader
```

Work:

* PDF read karna
* Pages extract karna
* Metadata store karna

---

## Issue 1

Error:

```
ModuleNotFoundError:
No module named 'longchain_community'
```

Reason:

Package name wrong tha.

Wrong:

```
longchain_community
```

Correct:

```
langchain_community
```

Fix:

Import update kiya.

---

# 4. PDF Content Testing

Issue:

PDF load ho raha tha:

```
Total Pages: 10
```

Lekin content visible nahi tha.

Reason:

Loader pages return karta hai as Document objects.

Fix:

Page content check kiya:

```
doc.page_content
```

---

# 5. Text Chunking

## File:

```
chunker.py
```

Implementation:

RecursiveCharacterTextSplitter

Initial:

```
chunk_size=500
chunk_overlap=50
```

Purpose:

Large documents ko small searchable pieces me divide karna.

---

# 6. Embedding Generation

## File:

```
embedder.py
```

Model:

```
nomic-embed-text
```

Through:

```
Ollama
```

Purpose:

Text ko numerical vector me convert karna.

Example:

```
"leave policy"

        |
        ▼

[0.23,0.45,0.12....]
```

---

# 7. Vector Database Creation

Technology:

```
FAISS
```

Flow:

```
Chunks
 |
 ▼
Embedding
 |
 ▼
FAISS Index
```

Generated:

```
vector_db/

index.faiss
index.pkl
```

---

## Issue 2

Large PDF problem:

PDF:

```
208 pages
```

Output:

```
970 chunks
```

Error:

```
Ollama tokenize connection failed
```

Reason:

Large embedding request + Ollama resource issue.

Testing ke liye:

18 page PDF use kiya.

Result:

```
Loaded pages: 18
Created chunks:70

Vector DB created successfully
```

---

# Phase 2: Retrieval Pipeline

Goal:

User query ko vector search se relevant chunks tak lana.

Flow:

```
User Query

 |
 ▼

Query Rewrite

 |
 ▼

Retriever

 |
 ▼

Vector DB

 |
 ▼

Relevant Chunks
```

---

# 8. Retriever Implementation

## File:

```
retrieval/retriever.py
```

Technology:

```
FAISS Retriever
```

Purpose:

User query ke similar chunks find karna.

---

# 9. Query Rewrite

## File:

```
query_rewriter.py
```

Purpose:

Short query ko better search query me convert karna.

Example:

Input:

```
leave?
```

Initial output:

```
What does leave mean?
```

Problem:

LLM answer mode me chala gaya.

---

## Fix

Prompt improve kiya.

New output:

```
What is the employee leave policy, leave rules,
available leave types according to company documents?
```

Result:

Query Rewrite completed.

---

# 10. Reranker Implementation

## File:

```
retrieval/reranker.py
```

Purpose:

FAISS ke top chunks ko further rank karna.

Flow:

```
FAISS

20 chunks

 |
 ▼

Reranker

 |
 ▼

Top 5 chunks
```

---

# Initial Model

```
BAAI/bge-reranker-base
```

Problem:

Wrong ranking:

Example:

Query:

```
employee leave policy
```

Result:

```
Salary compliance
```

---

# Fix 1

Model upgrade:

Before:

```
bge-reranker-base
```

After:

```
bge-reranker-v2-m3
```

Benefit:

* Better ranking
* Better semantic understanding

---

# Fix 2

Threshold filtering added.

Before:

Every top chunk returned.

After:

```
score_threshold=0.15
```

Low relevance chunks removed.

---

# Fix 3

Fallback added.

Problem:

Threshold ke baad chunks kam ho sakte the.

Solution:

Agar required chunks nahi mile:

```
Return best ranked top_k chunks
```

---

# Retrieval Testing Result

Before:

```
Salary policy
Sexual harassment
Termination
```

After:

```
Leave policy
Earned leaves
Casual leave rules
```

Retrieval improved.

---

# Current Completed Components

## Completed:

```
Document Loader          ✅

Text Chunking            ✅

Embedding Generation     ✅

FAISS Vector DB          ✅

Retriever                ✅

Query Rewrite            ✅

Reranker                 ✅
```

---

# Current Architecture

```
User Query

   |
   ▼

Query Rewrite

   |
   ▼

FAISS Retriever

   |
   ▼

20 Candidate Chunks

   |
   ▼

BGE Reranker

   |
   ▼

Top Relevant Chunks
```

---

# Remaining Work

## Phase 3: Generation Pipeline

Remaining:

```
Context Builder
        |
        ▼
Prompt Template
        |
        ▼
Qwen3 / Llama3
        |
        ▼
Final Answer
```

---

## Phase 4: API Layer

Remaining:

FastAPI:

```
POST /ask

Request:

{
 question:"What is leave policy?"
}


Response:

{
 answer:"",
 sources:[]
}
```

---

# Final Production RAG Flow

```
Documents

    |
    ▼

Loader

    |
    ▼

Chunking

    |
    ▼

Embedding

    |
    ▼

Vector DB


-------------------


User Query

    |
    ▼

Query Rewrite

    |
    ▼

Retriever

    |
    ▼

Reranker

    |
    ▼

Context Builder

    |
    ▼

LLM

    |
    ▼

Answer
```

---

# Major Learnings

1. RAG sirf Vector DB nahi hota.
2. Retrieval quality answer quality decide karti hai.
3. Query rewriting improves search.
4. Reranking improves relevance.
5. Chunk quality is extremely important.
6. Production RAG requires logging and debugging at every stage.

---

# Current Project Status

```
Ingestion Layer:
100% Complete


Retrieval Layer:
100% Complete


Generation Layer:
Pending


API Layer:
Pending
```

Next Step:

Implement Context Builder and connect retrieved chunks with Qwen3 LLM.
