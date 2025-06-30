import Joi from "joi";

export const createChocolateBoxValidator = Joi.object({
    mcqAnswers: Joi.array().length(5).items(Joi.string()),
    inputs: Joi.array().length(3).items(Joi.string()),
});