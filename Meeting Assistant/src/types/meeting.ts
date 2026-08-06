export interface MeetingRequest {
    transcript: string;
}

export interface MeetingResponse {
    summary: string;
    actionItems: string;
    followupEmail: string;
}