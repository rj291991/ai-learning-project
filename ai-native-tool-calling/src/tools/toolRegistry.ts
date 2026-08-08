import { calculate } from "./calculator.js";
import { randomNumber } from "./randomNumber.js";
import {
    CalculatorArgsSchema,
    RandomNumberArgsSchema
} from "../schemas/toolSchema.js";

export const toolRegistry = {
    calculator: (args: any) => {
        const parsed = CalculatorArgsSchema.parse(args);
        return calculate(parsed.expression);
    },
    randomNumber: (args: any) => {
        const parsed = RandomNumberArgsSchema.parse(args);
        return randomNumber(parsed.min, parsed.max)
    }
}