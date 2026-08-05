export const prompts = {
    basicSummary: (text) => `Summarize the following text.
    
    Text:
        """
        ${text}
        """`,
    contextPrompting: (text) => `You are an expert meeting assistant.
        Context:
        The following text is a meeting transcript.

        Task:
        Summarize only the important action items.

        Text:
        """
        ${text}
        """`,
    outputFormatting: (text) =>
        `You are an expert meeting assistant.
        Context:
        The following text is a meeting transcript.

        Task:
        Summarize only the important action items.

        Return ONLY valid JSON.

        {
            "summary": "",
            "actionItems": []
        }

        Text:
        """
        ${text}
        """`
}