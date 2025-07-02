import ChocolateSetSchema from "../schemas/chocolate-set.schema";
import { clearUsedCombinations, markCombinationUsed } from "../helpers/used-combination.helper";
import { getUniqueChocolateSet } from "../helpers/get-unique-chocolate-set.helper";
import { getThemesFromMcqAnswer } from "../helpers/get-themes.helper";
import { isResetting, setResetting } from "../helpers/used-combination-reset-lock.helper";
import { createChocolateUniqueNames, createDescriptionFromEmotionsAndThemes, createTitleFromEmotionsAndThemes, getEmotionsFromInputs } from "./open-ai.service";
import { NoUniqueCombinationLeftError } from "../errors/no-unique-combination-left.error";
import { CHOCOLATES } from "../constants/constants"

export const createChocolateBoxService = async (mcqAnswers: string[], inputs: string[]) => {
    const sortedThemeNames: any = getThemesFromMcqAnswer(mcqAnswers);

    while (true) {
        try {
            const { uniqueSet, key } = await getUniqueChocolateSet(sortedThemeNames as string[]);
            await ChocolateSetSchema.create({ uniqueId: key });
            markCombinationUsed(key);

            const uniqueSetWithEmotions = CHOCOLATES.filter((choc) => uniqueSet.includes(choc.id));

            const emotions = await getEmotionsFromInputs(inputs);
            const [title, description, chocolates] = await Promise.all([
                createTitleFromEmotionsAndThemes(emotions, sortedThemeNames),
                createDescriptionFromEmotionsAndThemes(emotions, sortedThemeNames),
                createChocolateUniqueNames(uniqueSetWithEmotions, emotions)
            ])

            return { chocolates, themes: sortedThemeNames, title, description };
        } catch (error: any) {
            if (error.code === 11000) {
                continue;
            }

            if (error instanceof NoUniqueCombinationLeftError) {
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
                    console.log("Reset completed...")
                    setResetting(false);
                }
                continue;
            }

            throw new Error(error.message);
        }
    }
};