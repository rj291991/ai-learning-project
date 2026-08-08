import { calculate } from "./calculator.js";
import { randomNumber } from "./randomNumber.js";
import {
    CalculatorArgsSchema,
    RandomNumberArgsSchema,
    type CalculatorArgs,
    type RandomNumberArgs
} from "../schemas/toolSchema.js";

export const toolRegistry = {
    calculator: (args: unknown) => {
        const parsed = CalculatorArgsSchema.parse(args);
        return calculate(parsed.expression);
    },
    randomNumber: (args: unknown) => {
        const parsed = RandomNumberArgsSchema.parse(args);
        return randomNumber(parsed.min, parsed.max)
    }
}