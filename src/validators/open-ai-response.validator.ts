import { z } from "zod";

export const GetEmotionsFromInputsSchema = z.object({
    emotions: z.array(z.string()).min(1),
})

export const CreateTitleFromEmotionsAndThemesSchema = z.object({
    title: z.string(),
})

export const CreateDescriptionFromEmotionsAndThemes = z.object({
    description: z.string(),
})

export const CreateChocolateUniqueNamesSchema = z.object({
    chocolates: z.array(z.object({
        id: z.string(), name: z.string(), uniqueName: z.string()
    })),
})