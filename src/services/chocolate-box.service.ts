import ChocolateSetSchema from "../schemas/chocolate-set.schema";
import { clearUsedCombinations, markCombinationUsed } from "../helpers/used-combination.helper";
import { getUniqueChocolateSet } from "../helpers/get-unique-chocolate-set.helper";
import { getThemesFromMcqAnswer } from "../helpers/get-themes.helper";
import { isResetting, setResetting } from "../helpers/used-combination-reset-lock.helper";
import { createDescriptionFromEmotionsAndThemes, createTitleFromEmotionsAndThemes, getEmotionsFromInputs } from "./open-ai.service";

export const createChocolateBoxService = async (mcqAnswers: string[], inputs: string[]) => {
    const { sortedThemeIds, sortedThemeNames }: any = getThemesFromMcqAnswer(mcqAnswers);

    while (true) {
        try {
            // unique chocolates set
            const { uniqueSet, key } = await getUniqueChocolateSet(sortedThemeNames as string[]);
            await ChocolateSetSchema.create({ uniqueId: key });
            markCombinationUsed(key);

            // emotions
            const emotions: any = await getEmotionsFromInputs(inputs);
            const parsedEmotions = JSON.parse(emotions.replace(/```json\s*|```/g, '').trim());

            // title
            const title = await createTitleFromEmotionsAndThemes(parsedEmotions, sortedThemeNames);

            // description
            const description = await createDescriptionFromEmotionsAndThemes(parsedEmotions, sortedThemeNames);

            return { uniqueSet, themes: sortedThemeNames, emotions: parsedEmotions, title, description };
        } catch (error: any) {
            if (error.code === 11000) {
                continue;
            }

            if (error.message === 'No unique chocolate combinations left') {
                if (isResetting) {
                    // Another request is already resetting, wait a bit and retry
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    continue;
                }

                setResetting(true);
                try {
                    console.log('Resetting used combinations...');
                    await ChocolateSetSchema.deleteMany({});
                    clearUsedCombinations();
                } finally {
                    setResetting(false);
                }
                continue;
            }
            throw new Error(error.message);
        }
    }
};