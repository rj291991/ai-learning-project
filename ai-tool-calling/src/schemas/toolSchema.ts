import { z } from "zod";

export const ToolSchema = z.discriminatedUnion("tool", [
    z.object({
        tool: z.literal("calculator"),
        expression: z.string(),
    }),

    z.object({
        tool: z.literal("randomNumber"),
        min: z.number(),
        max: z.number(),
    }),

    z.object({
        tool: z.literal("none"),
        response: z.string(),
    }),
]);

export type ToolResponse = z.infer<typeof ToolSchema>;