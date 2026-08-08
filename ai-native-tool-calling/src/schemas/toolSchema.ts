import { z } from "zod";

export const CalculatorArgsSchema = z.object({
    expression: z.string()
});


export type CalculatorArgs = z.infer<typeof CalculatorArgsSchema>

export const RandomNumberArgsSchema = z.object({
    min: z.coerce.number(),
    max: z.coerce.number()
}).refine(
    ({ min, max }) => min <= max,
    {
        message: "min must be less than or equal to max"
    }
);

export type RandomNumberArgs = z.infer<typeof RandomNumberArgsSchema>