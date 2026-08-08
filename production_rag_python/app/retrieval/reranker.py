from sentence_transformers import CrossEncoder


class Reranker:

    def __init__(self):

        # ==============================
        # PEHLE:
        # BAAI/bge-reranker-base use kar rahe the
        #
        # Issue:
        # - Small model tha
        # - Kuch queries me irrelevant chunks
        #   ko high score de raha tha
        #
        # AB:
        # bge-reranker-v2-m3 use kar rahe hain
        #
        # Benefit:
        # - Better relevance ranking
        # - Multilingual support
        # - Production RAG ke liye better
        # ==============================

        self.model = CrossEncoder(
            "BAAI/bge-reranker-v2-m3"
        )


    def rerank(
        self,
        query,
        documents,
        top_k=5,
        score_threshold=0.15
    ):

        """
        Rerank retrieved chunks.

        Flow:

        FAISS Retrieved Chunks
                |
                ▼
        Cross Encoder Reranker
                |
                ▼
        Best Relevant Chunks
        """


        # Agar koi document nahi mila
        # to empty list return karo

        if not documents:
            return []


        # ======================================
        # Query + Document pair create karna
        #
        # Example:
        #
        # Query:
        # "employee leave policy"
        #
        # Document:
        # "Employee gets 18 earned leaves..."
        #
        # Model dono ko compare karega
        # ======================================

        pairs = []


        for doc in documents:

            pairs.append(
                [
                    query,
                    doc.page_content
                ]
            )


        # ======================================
        # PEHLE:
        #
        # Model score generate karta tha
        # lekin hum sab chunks ko directly
        # top_k ke basis pe le rahe the
        #
        # AB:
        # Har chunk ka relevance score store
        # karenge
        # ======================================

        scores = self.model.predict(
            pairs
        )


        # ======================================
        # Score ke according descending order
        #
        # Example:
        #
        # Chunk A -> 0.85
        # Chunk B -> 0.60
        # Chunk C -> 0.20
        #
        # A pehle aayega
        # ======================================

        ranked_documents = sorted(
            zip(scores, documents),
            key=lambda x: x[0],
            reverse=True
        )


        filtered_documents = []


        for score, doc in ranked_documents:


            # ======================================
            # Score metadata me save kar rahe hain
            #
            # Isse debugging me pata chalega:
            # kaunsa chunk kitna relevant tha
            # ======================================

            doc.metadata["rerank_score"] = float(score)



            # ======================================
            # PEHLE:
            #
            # threshold nahi tha
            # Har top chunk return hota tha
            #
            # Problem:
            # Irrelevant chunks bhi aa sakte the
            #
            # AB:
            # Low score chunks remove karenge
            # ======================================

            if score >= score_threshold:

                filtered_documents.append(doc)



        # ======================================
        # PEHLE:
        #
        # Agar threshold ke baad kam chunks
        # milte to output kam ho jata
        #
        # AB:
        # Production safety fallback add kiya
        #
        # Agar relevant chunks < top_k hain
        # to best ranked chunks return karenge
        # ======================================

        if len(filtered_documents) < top_k:


            filtered_documents = [

                doc

                for score, doc in ranked_documents[:top_k]

            ]



        # Final top chunks return
        return filtered_documents[:top_k]