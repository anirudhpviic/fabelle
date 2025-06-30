import { NextFunction, Request, Response } from "express";
import { createChocolateBoxValidator } from "../validators/chocolate-box.validator";

export const createChocolateBox = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = await createChocolateBoxValidator.validateAsync(req.body);
        const { mcqAnswers, inputs } = value;

        console.log(value);
    } catch (error) {
        console.error('Error creating chocolate box:', error);
        next(error);
    }
}