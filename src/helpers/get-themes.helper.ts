import { ALL_OPTIONS_WITH_THEMES, THEMES } from "../constants";

export const getThemesFromMcqAnswer = (mcqAnswers: string[]) => {
    const themeCounts: { [key: string]: number } = {}; mcqAnswers.forEach(selectedText => {
        const match = ALL_OPTIONS_WITH_THEMES.find(opt => opt.text === selectedText);
        if (match) {
            match.themes.forEach(theme => {
                themeCounts[theme] = (themeCounts[theme] || 0) + 1;
            });
        }
    });

    const sortedThemeIds = Object.entries(themeCounts).sort((a, b) => b[1] - a[1]).map(entry => entry[0]);
    const sortedThemeNames = sortedThemeIds.map(themeId => THEMES.find(t => t.id === themeId)?.name).filter(Boolean);
    return { sortedThemeIds, sortedThemeNames }
}