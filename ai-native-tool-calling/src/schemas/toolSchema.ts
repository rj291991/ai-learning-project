import { z } from "zod";

export const CalculatorArgsSchema = z.object({
    expression: z.string()
});

export const RandomNumberArgsSchema = z.object({
    min: z.coerce.number(),
    max: z.coerce.number()
});