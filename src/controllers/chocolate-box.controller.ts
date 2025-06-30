import { NextFunction, Request, Response } from "express";
import { createChocolateBoxValidator } from "../validators/chocolate-box.validator";
import { createChocolateBoxService } from "../services/chocolate-box.service";

export const createChocolateBox = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const value = await createChocolateBoxValidator.validateAsync(req.body);
        const { mcqAnswers, inputs } = value;
        const result = await createChocolateBoxService()
        res.status(201).json({ data: result });
    } catch (error) {
        console.error('Error creating chocolate box:', error);
        next(error);
    }
}