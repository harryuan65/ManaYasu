export const FakeAPI = async <T>(output: T, delay = 1000) => {
  return new Promise<T>((resolve, reject) => {
    setTimeout(() => {
      resolve(output);
    }, delay);
  });
};
