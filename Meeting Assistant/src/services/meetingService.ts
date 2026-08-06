import client from "../config/aiClient.js";
import { prompts } from "../prompts/meetingPrompts.js";

async function meetingAssistant(transcript: string) {

    console.time("Total AI Time");

    // STEP 1
    console.time("Meeting Summary");

    const summaryResponse = await client.responses.create({
        model: "llama3.2:3b",
        input: prompts.summarizeMeeting(transcript)
    });

    console.timeEnd("Meeting Summary");

    const summary = summaryResponse.output_text;

    // STEP 2
    console.time("Action Items");

    const actionResponse = await client.responses.create({
        model: "llama3.2:3b",
        input: prompts.extractActionItems(summary)
    });

    console.timeEnd("Action Items");

    const actionItems = actionResponse.output_text;

    // STEP 3
    console.time("Follow-up Email");

    const emailResponse = await client.responses.create({
        model: "llama3.2:3b",
        input: prompts.generateFollowupEmail(
            summary,
            actionItems
        )
    });

    console.timeEnd("Follow-up Email");

    console.timeEnd("Total AI Time");

    return {

        summary,

        actionItems,

        followupEmail: emailResponse.output_text

    };

}

export default meetingAssistant;