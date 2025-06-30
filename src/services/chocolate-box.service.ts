import ChocolateSetSchema from "../schemas/chocolate-set.schema";
import { markCombinationUsed } from "../helpers/used-combination.helper";
import { getUniqueChocolateSet } from "../helpers/get-unique-chocolate-set.helper";
import { getThemesFromMcqAnswer } from "../helpers/get-themes.helper";

export const createChocolateBoxService = async (mcqAnswers: string[], inputs: string[]) => {
    const { sortedThemeIds, sortedThemeNames } = getThemesFromMcqAnswer(mcqAnswers);

    while (true) {
        try {
            const { uniqueSet, key } = await getUniqueChocolateSet(sortedThemeNames as string[]);
            await ChocolateSetSchema.create({ uniqueId: key });
            markCombinationUsed(key);
            return { uniqueSet }
        } catch (error: any) {
            if (error.code === 11000) {
                continue;
            }
            throw new Error(error.message);
        }
    }
};