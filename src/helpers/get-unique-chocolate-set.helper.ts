import { CHOCOLATES } from "../constants";
import { NoUniqueCombinationLeftError } from "../errors/no-unique-combination-left.error";
import { isCombinationUsed } from "./used-combination.helper";

// Generator for all k-combinations in lex order
function* generateCombinations(arr: any, k: number, start = 0, combo = []): IterableIterator<any> {
    if (combo.length === k) {
        yield [...combo];
        return;
    }
    for (let i = start; i < arr.length; i++) {
        combo.push(arr[i] as never);
        yield* generateCombinations(arr, k, i + 1, combo);
        combo.pop();
    }
}

export async function getUniqueChocolateSet(userThemes: string[], k = 5) {
    let themed = CHOCOLATES.filter((choc) =>
        choc.themes.some((theme) => userThemes.includes(theme))
    );
    let nonThemed = CHOCOLATES.filter(
        (choc) => !choc.themes.some((theme) => userThemes.includes(theme))
    );

    while (themed.length < k && nonThemed.length > 0) {
        const choco = nonThemed.shift(); // removes first item
        if (choco) themed.push(choco);
    }

    if (themed.length < k) {
        throw new Error(`Not enough total chocolates to create a combination of ${k}`);
    }

    // 1. Try all themed combinations first
    for (const combo of generateCombinations(themed, k)) {
        const key = combo
            .map((c: any) => c.id)
            .sort()
            .join(",");
        if (!isCombinationUsed(key)) {
            return {
                uniqueSet: combo.map((c: any) => c.id),
                key,
            };
        }
    }

    // 2. If exhausted, expand pool by adding non-themed chocolates
    for (let extra = 1; extra <= nonThemed.length; extra++) {
        const expanded = [...themed, ...nonThemed.slice(0, extra)];
        for (const combo of generateCombinations(expanded, k)) {
            const key = combo
                .map((c: any) => c.id)
                .sort()
                .join(",");
            if (!isCombinationUsed(key)) {
                return {
                    uniqueSet: combo.map((c: any) => c.id),
                    key,
                };
            }
        }
    }

    // no more combination left
    throw new NoUniqueCombinationLeftError();
}