
/**
 * When developing, usually I find myself in then need for some sleep in my code. to simulate async tasks
 *
 * ex: await sleep(3000);
 *
 * @param intervalMs milliseconds to sleep for
 */
export const sleep = async (intervalMs = 1000): Promise<void> => {
  return new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, intervalMs);
  })
};
