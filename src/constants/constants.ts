export const CHOCOLATES = [
    { id: "C1", name: "", themes: ["Mischief", "Nostalgia"] },
    { id: "C2", name: "Almond Rocher", themes: ["Protection", "Admiration"] },
    { id: "C3", name: "Dark Ganache", themes: ["Nostalgia", "Growth"] },
    { id: "C4", name: "Caramel Crisp", themes: ["Rivalry", "Sweetness"] },
    { id: "C5", name: "Nutty Nougat", themes: ["Mischief", "Rivalry"] },
    { id: "C6", name: "Milk Truffle", themes: ["Sweetness", "Dependence"] },
    { id: "C7", name: "Roasted Hazelnut", themes: ["Growth", "Protection"] },
    { id: "C8", name: "Classic Fudge", themes: ["Admiration", "Nostalgia"] },
    { id: "C9", name: "Cashew Praline", themes: ["Mischief", "Protection"] },
    { id: "C10", name: "White Chocolate Almond", themes: ["Sweetness", "Growth"] },
    { id: "C11", name: "Butterscotch Delight", themes: ["Nostalgia", "Sweetness"] },
    { id: "C12", name: "Coffee Mocha", themes: ["Admiration", "Mischief"] },
    { id: "C13", name: "Milky Hazelnut", themes: ["Dependence", "Growth"] },
    { id: "C14", name: "Bitter Dark", themes: ["Rivalry", "Protection"] },
    { id: "C15", name: "Peanut Butter Melt", themes: ["Mischief", "Dependence"] },
    { id: "C16", name: "Silky Caramel", themes: ["Admiration", "Sweetness"] },
    { id: "C17", name: "Crunchy Pistachio", themes: ["Growth", "Rivalry"] },
    { id: "C18", name: "Walnut Fudge", themes: ["Protection", "Nostalgia"] },
    { id: "C19", name: "Honey Almond", themes: ["Sweetness", "Admiration"] },
    { id: "C20", name: "Dark Roasted Cocoa", themes: ["Mischief", "Growth"] }
];

export const THEMES = [
    {
        id: "T1",
        name: "Mischief",
        description: "Playful antics, shared secrets, and lighthearted pranks."
    },
    {
        id: "T2",
        name: "Protection",
        description: "The feeling of looking out for each other, offering support, and safeguarding."
    },
    {
        id: "T3",
        name: "Nostalgia",
        description: "Fond memories of shared childhood experiences and past moments."
    },
    {
        id: "T4",
        name: "Rivalry",
        description: "Healthy competition, teasing, and a drive to outdo each other."
    },
    {
        id: "T5",
        name: "Dependence",
        description: "Relying on each other for emotional support, advice, or practical help."
    },
    {
        id: "T6",
        name: "Admiration",
        description: "Looking up to a sibling, respecting their achievements and qualities."
    },
    {
        id: "T7",
        name: "Sweetness",
        description: "Affectionate gestures, kindness, and expressions of love."
    },
    {
        id: "T8",
        name: "Growth",
        description: "Evolving together, supporting each other's personal development and life stages."
    }
];

export const ALL_OPTIONS_WITH_THEMES =
    [
        { text: "Endless teasing", themes: ["T1", "T4", "T7"] },
        { text: "Standing up in tough times", themes: ["T2", "T5", "T6"] },
        { text: "Old video game fights", themes: ["T1", "T3", "T4"] },
        { text: "That one special Rakhi", themes: ["T3", "T7", "T2", "T5"] },

        { text: "Light banter and teasing", themes: ["T1", "T4", "T7"] },
        { text: "Meaningful life talks", themes: ["T5", "T8", "T6"] },
        { text: "Reminiscing old times", themes: ["T3", "T7", "T5"] },
        { text: "Motivational pep talks", themes: ["T6", "T8", "T5"] },

        { text: "Summer vacations at grandma’s", themes: ["T3", "T7", "T1"] },
        { text: "Secret late-night snacks", themes: ["T1", "T3", "T7"] },
        { text: "Sibling rivalry during board games", themes: ["T4", "T1", "T3"] },
        { text: "Helping each other through exams", themes: ["T5", "T8", "T6"] },

        { text: "The prankster best friend", themes: ["T1", "T4", "T7"] },
        { text: "The brave superhero", themes: ["T2", "T6", "T5"] },
        { text: "The caring healer", themes: ["T5", "T7", "T6"] },
        { text: "The wise mentor", themes: ["T6", "T8", "T5"] },

        { text: "Celebrating our mischief with sweets", themes: ["T1", "T7", "T4"] },
        { text: "A time to promise lifelong protection", themes: ["T2", "T5", "T7"] },
        { text: "Reliving cherished traditions", themes: ["T3", "T7", "T5"] },
        { text: "Acknowledging how far we’ve come", themes: ["T6", "T8", "T5"] }
    ]


// export const QUESTIONS =
// {
//     "questions": [
//         {
//             "question": "What reminds you most of your sibling?",
//             "options": [
//                 {
//                     "text": "Endless teasing",
//                     "themes": ["T1", "T4", "T7"]
//                 },
//                 {
//                     "text": "Standing up in tough times",
//                     "themes": ["T2", "T5", "T6"]
//                 },
//                 {
//                     "text": "Old video game fights",
//                     "themes": ["T1", "T3", "T4"]
//                 },
//                 {
//                     "text": "That one special Rakhi",
//                     "themes": ["T3", "T7", "T2", "T5"]
//                 }
//             ]
//         },
//         {
//             "question": "What kind of conversations do you have most often?",
//             "options": [
//                 {
//                     "text": "Light banter and teasing",
//                     "themes": ["T1", "T4", "T7"]
//                 },
//                 {
//                     "text": "Meaningful life talks",
//                     "themes": ["T5", "T8", "T6"]
//                 },
//                 {
//                     "text": "Reminiscing old times",
//                     "themes": ["T3", "T7", "T5"]
//                 },
//                 {
//                     "text": "Motivational pep talks",
//                     "themes": ["T6", "T8", "T5"]
//                 }
//             ]
//         },
//         {
//             "question": "Your favorite shared memory together?",
//             "options": [
//                 {
//                     "text": "Summer vacations at grandma’s",
//                     "themes": ["T3", "T7", "T1"]
//                 },
//                 {
//                     "text": "Secret late-night snacks",
//                     "themes": ["T1", "T3", "T7"]
//                 },
//                 {
//                     "text": "Sibling rivalry during board games",
//                     "themes": ["T4", "T1", "T3"]
//                 },
//                 {
//                     "text": "Helping each other through exams",
//                     "themes": ["T5", "T8", "T6"]
//                 }
//             ]
//         },
//         {
//             "question": "If your sibling were a movie character, they’d be:",
//             "options": [
//                 {
//                     "text": "The prankster best friend",
//                     "themes": ["T1", "T4", "T7"]
//                 },
//                 {
//                     "text": "The brave superhero",
//                     "themes": ["T2", "T6", "T5"]
//                 },
//                 {
//                     "text": "The caring healer",
//                     "themes": ["T5", "T7", "T6"]
//                 },
//                 {
//                     "text": "The wise mentor",
//                     "themes": ["T6", "T8", "T5"]
//                 }
//             ]
//         },
//         {
//             "question": "What does Raksha Bandhan mean to you both?",
//             "options": [
//                 {
//                     "text": "Celebrating our mischief with sweets",
//                     "themes": ["T1", "T7", "T4"]
//                 },
//                 {
//                     "text": "A time to promise lifelong protection",
//                     "themes": ["T2", "T5", "T7"]
//                 },
//                 {
//                     "text": "Reliving cherished traditions",
//                     "themes": ["T3", "T7", "T5"]
//                 },
//                 {
//                     "text": "Acknowledging how far we’ve come",
//                     "themes": ["T6", "T8", "T5"]
//                 }
//             ]
//         }
//     ]
// }