export const useRandom = (length: number) => {
    const random = Math.random();
    const randomIndex = Math.round(0 - 0.5 + Math.random() * (length - 1));
    return { random, randomIndex }
}