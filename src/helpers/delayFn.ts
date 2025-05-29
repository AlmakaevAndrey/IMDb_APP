export const delayFn = async (delay: number = 1000): Promise<void> => {
  return await new Promise((res) => setTimeout(res, delay));
};
