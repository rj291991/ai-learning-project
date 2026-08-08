from llm.model import get_llm
from prompts.template import create_prompt

context = """
Employee gets 18 Earned Leaves in a calendar year.
Casual leave maximum is 12 days.
"""

question = "What is the employee leave policy?"

# Create Prompt

prompt = create_prompt(context,question)
print("\nPROMPT:\n")
print(prompt)

# Load LLM
llm = get_llm()

# Send prompt
response = llm.invoke(prompt)
print("\nANSWER:\n")
print(response.content)