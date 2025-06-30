import { usedCombinations } from "../stores/used-combination.store";

export const isCombinationUsed = (key: string) => {
    return usedCombinations.has(key);
}

export const markCombinationUsed = (key: string) => {
    usedCombinations.add(key);
}

export const clearUsedCombinations = () => {
    usedCombinations.clear();
}