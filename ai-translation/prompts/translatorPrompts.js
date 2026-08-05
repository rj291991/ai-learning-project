export const prompts = {

    rolePrompt: (text, targetLanguage) => `You are an expert multilingual translator.
        Task:
        Translate the following text into ${targetLanguage}.

        Text:
        """
        ${text}
        """
        `,

    contextPrompt: (text, targetLanguage) => `
        You are an expert multilingual translator.

        Context:
        This sentence is from a patriotic speech.
        Preserve the original tone while translating.

        Task:
        Translate the following text into ${targetLanguage}.

        Text:
        """
        ${text}
        """
        `,

    outputPrompt: (text, targetLanguage) => `
        You are an expert multilingual translator.

        Context:
        This sentence is from a patriotic speech.
        Preserve the original tone while translating.

        Task:
        Translate the following text into ${targetLanguage}.

        Return ONLY valid JSON.

        {
            "translatedText":""
        }

        Text:
        """
        ${text}
        """
        `

};