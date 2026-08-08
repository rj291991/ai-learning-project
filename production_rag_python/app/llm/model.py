from langchain_ollama import ChatOllama

def get_llm():
    """
    Initialize local Ollama LLM
    Model:
        qwen3

    Running through:
        Ollama server
    """
    llm = ChatOllama(
        model="qwen3",
        temperature=0.2,
    )
    return llm