export const prompts = {

    summarizeMeeting(transcript: string): string {

        return `
You are an expert meeting assistant.

Context:
The following text is a meeting transcript.

Task:
Summarize the meeting in 5 concise bullet points.

Instructions:
- Include only important discussion points.
- Ignore greetings and small talk.
- Keep each bullet short.
- Do not invent information.

Meeting Transcript:
"""
${transcript}
"""
`;
    },

    extractActionItems(summary: string): string {

        return `
You are an expert meeting assistant.

Context:
The following is a meeting summary.

Task:
Extract all action items.

Return ONLY valid JSON.

Format:

[
    {
        "owner":"",
        "task":"",
        "deadline":""
    }
]

Meeting Summary:
"""
${summary}
"""`;
    },

    generateFollowupEmail(summary: string, actionItems: string): string {

        return `
You are an expert professional email writer.

Context:
The meeting has already been summarized and action items have been extracted.

Task:
Generate a professional follow-up email.

Meeting Summary:
"""
${summary}
"""

Action Items:
"""
${actionItems}
"""
`;
    }

};