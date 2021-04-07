export const and = (...args: any[]) => ({ "$and": args });

export const or = (...args: any[]) => ({ "$or": args });

export const not = (el: object) => {
  const key = Object.keys(el)[0];
  // @ts-ignore
  return ({ [key]: { "$not": { "$lte": el[key] } } });
};

export const choosePage = (value: number) => ({ "page": value });

export const isStudied = (value: boolean | null) => ({ "userWord.optional.isStudied": value });

export const isHard = (value: boolean | null) => ({ "userWord.optional.isHard": value });

export const isDeleted = (value: boolean | null) => ({ "userWord.optional.isDeleted": value });

export const correct = (value: boolean | null) => ({ "userWord.optional.correct": value });

export const wrong = (value: boolean | null) => ({ "userWord.optional.wrong": value });

