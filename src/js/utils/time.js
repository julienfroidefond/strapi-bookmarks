export const waitPromise = (duration, cb) =>
  new Promise(resolve => {
    const timeoutRef = setTimeout(() => {
      if (cb) cb(null);
      resolve();
    }, duration);
    if (cb) cb(timeoutRef);
  });

export default {};
