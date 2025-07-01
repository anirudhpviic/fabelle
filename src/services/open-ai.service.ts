import OpenAI from 'openai';
import { CREATE_CHOCOLATE_UNIQUE_ID_SYSTEM_PROMPT, CREATE_CHOCOLATE_UNIQUE_ID_USER_PROMPT, CREATE_DESCRIPTION_SYSTEM_PROMPT, CREATE_DESCRIPTION_USER_PROMPT, CREATE_TITLE_SYSTEM_PROMPT, CREATE_TITLE_USER_PROMPT, GET_EMOTIONS_SYSTEM_PROMPT, GET_EMOTIONS_USER_PROMPT } from '../prompts';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getEmotionsFromInputs = async (inputs: string[]) => {
    const systemPrompt = GET_EMOTIONS_SYSTEM_PROMPT()
    const userPrompt = GET_EMOTIONS_USER_PROMPT(inputs)

    const emotions = await openai.chat.completions.create({
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
    })

    return emotions.choices[0]?.message?.content?.trim()
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
        temperature: 0.9, // creativity
        max_tokens: 20
    });

    const title = completion.choices[0]?.message?.content?.trim().replace(/^["']|["']$/g, '') || 'Sibling Bond';
    return title;
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
    });

    return completion.choices[0].message.content?.trim() || '';
}

export const createChocolateUniqueIds = async (chocolates: { id: string, themes: string[] }[], emotions: string[]) => {
    const systemPrompt = CREATE_CHOCOLATE_UNIQUE_ID_SYSTEM_PROMPT()
    const userPrompt = CREATE_CHOCOLATE_UNIQUE_ID_USER_PROMPT(chocolates, emotions)

    const completion = await openai.chat.completions.create({
        model: 'gpt-4.1-mini',
        messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: userPrompt }
        ],
        temperature: 0.8,
    });

    return JSON.parse(completion.choices[0].message.content || '[]');
}