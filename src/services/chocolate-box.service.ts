import ChocolateSetSchema from "../schemas/chocolate-set.schema";
import { markCombinationUsed } from "../helpers/used-combination.helper";
import { getUniqueChocolateSet } from "../helpers/get-unique-chocolate-set.helper";

export const createChocolateBoxService = async () => {
    const userThemes = ["Nostalgia", "Mischief", "Sweetness"];

    while (true) {
        try {
            const { uniqueSet, key } = await getUniqueChocolateSet(userThemes);
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