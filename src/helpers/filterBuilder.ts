export const and = (...args: any[]) => ({ "$and": args })

export const or = (...args: any[]) => ({ "$or": args })

export const choosePage = (value: number) => ({ "page": value })

export const isHard = (value: boolean|null) => ({ "userWord.optional.isHard": value })

export const isDeleted = (value: boolean|null) => ({ "userWord.optional.isDeleted": value })
