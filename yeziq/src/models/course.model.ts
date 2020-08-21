export interface Course {
    _id: string,
    name: string,
    author: string,
    targetLang: string,
    lessons: Array<Array<Array<string>>>,
    unknownWords: number,
    yeziqs: number
};