from prompts.template import create_prompt



context = """
Employee gets 18 earned leaves in a calendar year.
Casual leave maximum is 12 days.
"""


question = "What is the leave policy?"



prompt = create_prompt(
    context,
    question
)


print(prompt)