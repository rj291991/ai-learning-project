import { ZodError } from "zod";
import { toolRegistry } from "./toolRegistry.js";

export type ToolName = keyof typeof toolRegistry;

export function executeTool(
    toolName: ToolName,
    args: unknown
) {
    const tool = toolRegistry[toolName];

    if (!tool) {
        throw new Error(`Unknown tool: ${toolName}`);
    }

    try {
        return tool(args);

    } catch (error) {

        console.error(
            `Tool execution failed: ${toolName}`,
            error
        );

        if (error instanceof ZodError) {
            throw new Error(
                error.issues
                    .map(issue => issue.message)
                    .join(", ")
            );
        }

        if (error instanceof Error) {
            throw error;
        }

        throw new Error(
            `Failed to execute tool: ${toolName}`
        );
    }
}