import OpenAI from 'openai';
import { CREATE_CHOCOLATE_UNIQUE_ID_SYSTEM_PROMPT, CREATE_CHOCOLATE_UNIQUE_ID_USER_PROMPT, CREATE_DESCRIPTION_SYSTEM_PROMPT, CREATE_DESCRIPTION_USER_PROMPT, CREATE_TITLE_SYSTEM_PROMPT, CREATE_TITLE_USER_PROMPT, GET_EMOTIONS_SYSTEM_PROMPT, GET_EMOTIONS_USER_PROMPT } from '../prompts/prompts';
import { CreateChocolateUniqueNamesSchema, CreateDescriptionFromEmotionsAndThemes, CreateTitleFromEmotionsAndThemesSchema, GetEmotionsFromInputsSchema } from '../validators/open-ai-response.validator';
import { zodResponseFormat } from "openai/helpers/zod"

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getEmotionsFromInputs = async (inputs: string[]) => {
    const systemPrompt = GET_EMOTIONS_SYSTEM_PROMPT()
    const userPrompt = GET_EMOTIONS_USER_PROMPT(inputs)

    const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
            {
                role: 'system',
                content: systemPrompt
            },
            {
                role: 'user',
                content: userPrompt
            }
        ],
        temperature: 0.4,
        response_format: zodResponseFormat(GetEmotionsFromInputsSchema, "GetEmotionsFromInputsSchema")
    })

    return JSON.parse(completion.choices[0].message.content!).emotions;
}

export const createTitleFromEmotionsAndThemes = async (emotions: string[], themes: string[]) => {
    const systemPrompt = CREATE_TITLE_SYSTEM_PROMPT()
    const userPrompt = CREATE_TITLE_USER_PROMPT(emotions, themes)

    const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        temperature: 0.9,
        max_tokens: 20,
        response_format: zodResponseFormat(CreateTitleFromEmotionsAndThemesSchema, "CreateTitleFromEmotionsAndThemesSchema")
    });

    return JSON.parse(completion.choices[0]?.message?.content!).title
}

export const createDescriptionFromEmotionsAndThemes = async (emotions: string[], themes: string[]) => {
    const systemPrompt = CREATE_DESCRIPTION_SYSTEM_PROMPT()
    const userPrompt = CREATE_DESCRIPTION_USER_PROMPT(emotions, themes)

    const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        response_format: zodResponseFormat(CreateDescriptionFromEmotionsAndThemes, "CreateDescriptionFromEmotionsAndThemes")
    });

    return JSON.parse(completion.choices[0]?.message?.content!).description
}

export const createChocolateUniqueNames = async (chocolates: { id: string, themes: string[] }[], emotions: string[]) => {
    const systemPrompt = CREATE_CHOCOLATE_UNIQUE_ID_SYSTEM_PROMPT()
    const userPrompt = CREATE_CHOCOLATE_UNIQUE_ID_USER_PROMPT(chocolates, emotions)

    const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
        response_format: zodResponseFormat(CreateChocolateUniqueNamesSchema, "createChocolateUniqueNamesSchema")
    });

    return JSON.parse(completion.choices[0]?.message?.content!).chocolates
}