
export const useUtils = () => {

    const getRandomCount = (min = 4, max = 8) => Math.floor(Math.random() * (max - min + 1)) + min;

    return { getRandomCount }
};

