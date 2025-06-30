import ChocolateSetSchema from "../schemas/chocolate-set.schema";

export const usedCombinations = new Set<string>();

export const loadUsedCombinationsFromDB = async () => {
    try {
        const allCombinations = await ChocolateSetSchema.find({}, { uniqueId: 1, _id: 0 }).lean();
        allCombinations.forEach(doc => {
            if (doc.uniqueId) usedCombinations.add(doc.uniqueId);
        });
        console.log(`Loaded ${usedCombinations.size} combinations from DB into memory`);
    } catch (err) {
        console.warn("No usedCombinations.json found — starting fresh.");
    }
};
